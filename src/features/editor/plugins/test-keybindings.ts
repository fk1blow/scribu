import { syntaxTree } from "@codemirror/language"
import {
  EditorState,
  SelectionRange,
  EditorSelection,
  Transaction,
} from "@codemirror/state"
import { Command, Direction, EditorView, KeyBinding } from "@codemirror/view"

type CommandTarget = { state: EditorState; dispatch: (tr: Transaction) => void }

function setSel(
  state: EditorState,
  selection: EditorSelection | { anchor: number; head?: number }
) {
  return state.update({
    selection,
    scrollIntoView: true,
    annotations: Transaction.userEvent.of("keyboardselection"),
  })
}

function updateSel(
  sel: EditorSelection,
  by: (range: SelectionRange) => SelectionRange
) {
  return EditorSelection.create(sel.ranges.map(by), sel.mainIndex)
}

function moveSel(
  { state, dispatch }: CommandTarget,
  how: (range: SelectionRange) => SelectionRange
): boolean {
  let selection = updateSel(state.selection, how)
  if (selection.eq(state.selection)) return false
  dispatch(setSel(state, selection))
  return true
}

function moveThroughHeadings(
  state: EditorState,
  selection: SelectionRange,
  forward: boolean
) {
  const range = selection.head + (forward ? 2 : -1)
  let node = syntaxTree(state).resolve(range, -1)
  // console.log('range: ', range)
  // console.log('selection.head: ', selection.head)
  // let tree = syntaxTree(state).resolve(selection.head)
  // console.log('tree: ', tree.childAfter)
  // console.log('node.children: ', node.getChildren('HeaderMark'))

  // console.log('state: ', state.doc.lineAt(selection.from))
  // console.log('state.doc: ', state.doc)

  // console.log('selection: ', selection.from, selection.to, selection.head)
  // console.log('node from-to: ', node.from, node.to)
  // console.log("node.type.name: ", node.type.name)
  // const p = node.prevSibling
  // const n = node.nextSibling
  // console.log('p: ', p?.type.name)
  // console.log('n: ', n?.type.name)

  let start = selection.from,
    end = selection.to

  if (forward) {
    if (node.type.name === "HeaderMark") {
      start = node.to + 1
      end = node.to + 1
    }
  } else {
    if (node.type.name === "HeaderMark") {
      start = node.from - 1
      end = node.from
    }
  }

  return EditorSelection.cursor(start, end)
}

export const cursorLeftPastHeaderMark: Command = (view) =>
  moveSel(view, (range): SelectionRange => {
    const x = moveThroughHeadings(
      view.state,
      range,
      view.textDirection != Direction.LTR
    )
    return x
    // return EditorSelection.cursor(range.from, range.to)
  })

export const cursorRightPastHeaderMark: Command = (view) =>
  moveSel(view, (range): SelectionRange => {
    const x = moveThroughHeadings(
      view.state,
      range,
      view.textDirection == Direction.LTR
    )

    return x
    // return EditorSelection.cursor(range.from, range.to)
  })

function rangeEnd(range: SelectionRange, forward: boolean) {
  return EditorSelection.cursor(forward ? range.to : range.from)
}

function cursorByGroup(view: EditorView, forward: boolean) {
  return moveSel(view, (range) => {
    const rangePastHeadings = moveThroughHeadings(view.state, range, forward)
    const cursorRange = range.empty
      ? view.moveByGroup(rangePastHeadings, forward)
      : rangeEnd(range, forward)

    return cursorRange
  })
}

export const cursorGroupLeft: Command = (view) => {
  return cursorByGroup(view, view.textDirection != Direction.LTR)
}

export const cursorGroupRight: Command = (view) => {
  return cursorByGroup(view, view.textDirection == Direction.LTR)
}

export const testKeymap: readonly KeyBinding[] = [
  { mac: "ArrowLeft", run: cursorLeftPastHeaderMark },
  { mac: "ArrowRight", run: cursorRightPastHeaderMark },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight },
]
