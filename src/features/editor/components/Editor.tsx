import { redo } from '@codemirror/history'
import { EditorSelection, EditorState, SelectionRange } from '@codemirror/state'
import { ViewUpdate } from '@codemirror/view'
import styled from '@emotion/styled'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useWindowSize } from '@react-hook/window-size/throttled'
import useCodemirror, { getTheme } from '../hooks/useCodemirror'
import { syntaxTree } from '@codemirror/language'
import { Tree } from '@lezer/common'
import { Highlight } from './DocumentHighlight/Highlight'
import { MarkdownDocument } from '@features/documents/store/documents-slice'

const getDocumentHighlights = (state: EditorState) => {
  const tree = syntaxTree(state)

  let highlights: any = []
  let cursor = tree.cursor()
  do {
    if (
      ['ATXHeading', 'HorizontalRule'].some((item) =>
        cursor.name.includes(item),
      )
    ) {
      highlights.push({
        from: cursor.from,
        to: cursor.to,
        type: cursor.name,
        value: state.sliceDoc(cursor.from, cursor.to),
      })
    }
  } while (cursor.next())

  return highlights
}

const EditorWrapper = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: stretch;
  width: 100vw;
  height: 100%;
  overflow: hidden;

  .cm-scroller {
    flex: 1 1;
  }

  .cm-content {
    max-width: 900px;
    margin: 0 auto;
    /*
      fixes a bug in cm that scroll the content when there is overflow
      and the user selects some text(or simply clicks on the editor)
      that resides on the bottom of the editor
     */
    padding: 0;
  }

  .cm-editor {
    height: 100%;
  }

  .codemirror-container {
    flex-grow: 1;
  }
`

interface Props {
  document: MarkdownDocument
  onContentsUpdate: (doc: string) => void
  onSelectionUpdate: (payload: { from: number; to: number }) => void
  onScrollPositionUpdate: (pos: number) => void
  onHighlightsChange: (highlights: Highlight[]) => void
}

const Editor = (
  {
    onContentsUpdate,
    onSelectionUpdate,
    onScrollPositionUpdate,
    document,
    onHighlightsChange,
  }: Props,
  ref,
) => {
  const [editor, editorRef] = useCodemirror()
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'gray'>('light')
  const themeRef = React.useRef(theme)
  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})
  const windowSize = useWindowSize({ fps: 10 })
  const [afterInit, setAfterInit] = useState(false)

  useEffect(() => {
    if (!editor) return
    editor.view.dispatch({ selection: editor.view.state.selection })
  }, windowSize)

  useEffect(() => {
    if (!editorRef || !editor) return
  }, [editorRef, editor])

  useHotkeys(
    'ctrl+shift+Z',
    () => {
      console.log('ctrl+shift+Z')
      if (editor) {
        let x = redo(editor.view)
        console.log('x: ', x)
      }
    },
    [editor],
  )

  React.useEffect(() => {
    if (!editor) {
      return
    }

    editor.setTheme(getTheme(editor.codemirror, theme))
  }, [editor, theme])

  // bootstrap codemirror
  useEffect(() => {
    if (!editor) return

    const theme = getTheme(editor.codemirror, themeRef.current)

    // const state = fileStateMapRef.current[document.contents]

    // if (state) {
    //   // We've loaded this file before
    //   editor.view.setState(state)

    //   // TODO: only do this if the state's theme doesn't match the current one
    //   editor.setTheme(theme)

    //   return
    // }

    // Create the editor state object for this file

    let didCancel = false

    editor
      .loadExentions({ filename: document.filepath, theme })
      .then((extensions) => {
        if (didCancel) return

        const { codemirror } = editor

        codemirror.history

        // Keep our state in sync with the editor's state. This listener is called
        // after view.setState and on any future updates
        const updateListener = codemirror.view.EditorView.updateListener.of(
          (update: ViewUpdate) => {
            if (update.selectionSet) {
              const range = update.state.selection.ranges[0]
              // only if the cursor's position has changed
              // if (range && range.from !== document.selection.from) {
              //   onCursorUpdate(range.from)
              // }
              onSelectionUpdate({ from: range.from, to: range.to })

              // console.log('range: ', range)
            }

            if (update.docChanged) {
              onContentsUpdate(update.state.doc.toString())
              const highlights = getDocumentHighlights(update.state)
              if (highlights.length) onHighlightsChange(highlights)
            }
          },
        )

        const scrollListener = codemirror.view.EditorView.domEventHandlers({
          scroll(evt, _view) {
            const targetEl = evt.target as HTMLElement
            // console.log('targetEl?.scrollTop: ', targetEl?.scrollTop)
            const scrollDistance =
              window.document.querySelectorAll('.cm-scroller')[0].scrollTop
            const foo = scrollDistance - 193

            console.log('scrollDistance: ', scrollDistance)

            // if (targetEl && targetEl?.scrollTop !== document.scroll) {
            if (scrollDistance !== document.scroll) {
              // onScrollPositionUpdate(foo)
            }
          },
        })

        const initialState = codemirror.state.EditorState.create({
          doc: document.contents,
          extensions: [extensions, updateListener, scrollListener],
          // extensions: [extensions, updateListener],
          selection: EditorSelection.create([
            EditorSelection.range(
              document.selection.from,
              document.selection.to,
            ),
            // EditorSelection.cursor(document.selection.from),
            // EditorSelection.cursor(document.selection.to),
          ]),
        })

        editor.view.setState(initialState)

        const highlights = getDocumentHighlights(editor.view.state)
        if (highlights.length) onHighlightsChange(highlights)

        // editor.view.scrollPosIntoView(document.selection.from)
        // editor.view.scrollDOM.scrollTop = 803
        // editor.view.focus()

        // setTimeout(() => {
        // editor.view.scrollDOM.scrollTo(0, 2950)
        // editor.view.viewport
        // editor.view.scrollDOM.scrollTop = 1273
        // editor.view.scrollPosIntoView(document.selection.from)
        // editor.view.scrollDOM.scrollTop = 1273
        // console.log('scrolling to: ', document.scroll)

        // editor.view.scrollPosIntoView(document.selection.from)
        // editor.view.scrollDOM.scrollTop = document.scroll
        // editor.view.focus()

        // editor.view.focus()
        // editor.view.scrollPosIntoView(820)
        // const targetEl = window.document.querySelectorAll('.cm-scroller')[0]

        // if (targetEl) {
        //   targetEl.scrollTop = 851
        // }
        // editor.view.scrollPosIntoView(document.selection.from)
        // editor.view.scrollDOM.scrollTo(0, 950)
        // editor.view.scrollDOM.scrollTop = document.scroll
        // }, 1000)

        // moved to the initialState
        // put a cursor on the document and focus the view
        console.log('document.selection.from: ', document.selection.from)
        const selection = EditorSelection.create([
          // EditorSelection.range(1, 6),
          EditorSelection.cursor(document.selection.from),
        ])
        editor.view.dispatch({ selection })

        setTimeout(() => {
          editor.view.scrollPosIntoView(document.selection.from)
          editor.view.scrollDOM.scrollTo(0, 460)
        }, 100)

        // TODO should persist the scroll position as well
        // then try to scroll to that position
        editor.view.focus()
        console.log('onEditorInitialized')
        // setTimeout(() => onEditorInitialized(), 1000)
      })

    return () => {
      didCancel = true
    }
  }, [editor])

  useImperativeHandle(
    ref,
    () => ({
      scrollToHighlight(to: number) {
        editor.view.scrollPosIntoView(to)
      },

      updateScrollDom(x) {
        console.log('should scroll to: ', x)
        // console.log('editor.view.scrollDOM.offsetHeight: ', editor.view.scrollDOM.offsetHeight)
        // editor.view.scrollDOM.scrollTop = x
        // setAfterInit(true)

        // need to defer the scrolling handler until after the initial scroll top muie
      },
    }),
    [editor],
  )

  return (
    <EditorWrapper>
      <div className="codemirror-container" ref={editorRef} />
    </EditorWrapper>
  )
}

export default forwardRef(Editor)
