import { ViewPlugin, EditorView, ViewUpdate } from "@codemirror/view"

const docSizePlugin = ViewPlugin.fromClass(
  class {
    dom: HTMLElement

    constructor(view: EditorView) {
      this.dom = view.dom.appendChild(document.createElement("div"))
      this.dom.style.cssText =
        "position: absolute; top; 12px; right: 32px; font-size: 14px; opacity: .5;"
      this.dom.textContent = view.state.doc.length.toString()
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
