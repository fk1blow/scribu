import { ViewPlugin, EditorView, ViewUpdate } from "@codemirror/view"

const docSizePlugin = ViewPlugin.fromClass(
  class {
    dom: HTMLElement

    constructor(view: EditorView) {
      this.dom = view.dom.appendChild(document.createElement("div"))
      this.dom.style.cssText =
        "position: absolute; inset-block-start: 2px; inset-inline-end: 5px"
      this.dom.textContent = view.state.doc.length.toString()
      // console.log("view: ", view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged)
        this.dom.textContent = update.state.doc.length.toString()
    }

    destroy() {
      this.dom.remove()
    }
  }
)

export default docSizePlugin
