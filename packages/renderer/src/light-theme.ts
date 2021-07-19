import {
  HighlightStyle,
  tags as t,
  classHighlightStyle,
  Tag,
  defaultHighlightStyle,
} from "@codemirror/highlight"
import * as view from "@codemirror/view"

const tags = t

const monospaceFontFamily = "PT Mono"

const otherTags = {
  fence: Tag.define(t.null), // define custom tag, that can be picked up by the style configuration
}

export const lightTheme = {
  base: view.EditorView.theme({
    "&": {
      backgroundColor: "#FFFBF2",
    },
  }),

  // highlight: classHighlightStyle,
  // highlight: defaultHighlightStyle,
  highlight: HighlightStyle.define([
    {
      tag: t.heading,
      fontFamily: "iA Writer Duospace",
      fontWeight: "600",
      color: "#0f0f0f",
    },
    { tag: tags.meta, class: "cmt-meta" },
    { tag: otherTags.fence, color: 'red', class: "cmt-fence" },
    { tag: t.content, fontFamily: "iA Writer Duospace" },
    { tag: t.emphasis, fontStyle: "italic", fontFamily: "iA Writer Duospace" },
    { tag: t.strong, fontWeight: "bold", fontFamily: "iA Writer Duospace" },
    // { tag: t.annotation, fontWeight: "bold" },
    // { tag: t.literal, fontFamily: "iA Writer Duospace" },
    // { tag: t.monospace, fontFamily: monospaceFontFamily },
    // { tag: t.keyword, fontFamily: monospaceFontFamily },
    // { tag: t.variableName, fontFamily: monospaceFontFamily },
    // { tag: t.punctuation, fontFamily: monospaceFontFamily },
  ]),
}
