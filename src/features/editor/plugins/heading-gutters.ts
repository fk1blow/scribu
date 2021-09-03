import { GutterMarker } from "@codemirror/gutter"
import { syntaxTree } from "@codemirror/language"
import { EditorSelection } from "@codemirror/state"
import { BlockInfo, EditorView } from "@codemirror/view"

const nodeTypeNameMap = (name: string) => {
  const types: Record<string, string> = {
    ATXHeading1: "h1",
    ATXHeading2: "h2",
    ATXHeading3: "h3",
    ATXHeading4: "h4",
    ATXHeading5: "h5",
    ATXHeading6: "h6",
  }
  return name in types ? types[name] : ""
}

class NumberMarker extends GutterMarker {
  constructor(readonly number: string) {
    super()
  }

  eq(other: NumberMarker) {
    return this.number == other.number
  }

  toDOM(_view: EditorView) {
    return document.createTextNode(this.number)
  }
}

const headingsGutter = {
  class: "xrx",
  lineMarker: (view: EditorView, line: BlockInfo) => {
    const range = EditorSelection.cursor(line.from, line.to).head
    const node = syntaxTree(view.state).resolve(range)
    let lineValue = ""

    const xrx = view.state.doc.iter(1)
    console.log('xrx: ', xrx.next().value)

    console.log('range: ', range)
    console.log('node: ', node)

    // search the next node to find the heading size
    if (node.type.name === "HeaderMark") {
      const parent = node.parent
      if (parent) {
        lineValue = nodeTypeNameMap(parent.type.name)
      }
    }
    return new NumberMarker(lineValue.toString())
  },
}

export default headingsGutter
