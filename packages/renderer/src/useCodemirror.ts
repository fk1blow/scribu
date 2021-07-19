import * as React from "react"
import { BlockInfo, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { Extension, Compartment, EditorSelection } from "@codemirror/state"
import { LanguageSupport, syntaxTree } from "@codemirror/language"
import docSizePlugin from "./docSizePlugin"
import { tags, styleTags, Tag } from "@codemirror/highlight"
import { HighlightStyle, tags as t } from "@codemirror/highlight"
import {MarkdownConfig} from "lezer-markdown"
import { lightTheme } from "./light-theme"
import { testKeymap } from "./test-keybindings"
import { GutterMarker } from "@codemirror/gutter"
import headingsGutter from "./headings-gutter"

type Bundle = typeof import("./codemirror")

interface Theme {
  base: Extension
  highlight: Extension
}

interface Editor {
  view: EditorView
  codemirror: Bundle
  setTheme: (theme: Theme) => void
  loadExentions: (options: {
    filename: string
    theme: Theme
  }) => Promise<Extension>
}

export default function useCodemirror(): [
  null | Editor,
  (div: null | HTMLDivElement) => void
] {
  const [targetEl, setTargetEl] = React.useState<HTMLDivElement | null>(null)
  const [editor, setEditor] = React.useState<Editor | null>(null)

  const themeCompartment = new Compartment()
  const highlightCompartment = new Compartment()

  React.useEffect(() => {
    if (!targetEl) {
      return
    }

    let didCancel = false

    let view: null | EditorView

    async function createEditor() {
      const codemirror = await import("./codemirror")

      if (!targetEl || didCancel) {
        return
      }

      view = new codemirror.view.EditorView({
        parent: targetEl,
      })

      setEditor({
        view,
        codemirror,
        setTheme: (theme: Theme) => {
          view?.dispatch({
            effects: [
              themeCompartment.reconfigure(theme.base),
              highlightCompartment.reconfigure(theme.highlight),
            ],
          })
        },
        loadExentions: (options: { filename: string; theme: Theme }) =>
          loadExentions({
            codemirror,
            filename: options.filename,
            theme: options.theme,
            themeCompartment,
            highlightCompartment,
          }),
      })
    }

    createEditor()

    return () => {
      didCancel = true

      if (view) {
        view.destroy()
        view = null
      }
    }
  }, [targetEl])

  return [editor, setTargetEl]
}

export function getTheme(codemirror: Bundle, kind: "light" | "dark"): Theme {
  if (kind === "dark") {
    return {
      base: codemirror.themeOneDark.oneDarkTheme,
      highlight: codemirror.themeOneDark.oneDarkHighlightStyle,
    }
  }

  return lightTheme
}

async function loadExentions({
  filename,
  codemirror,
  theme,
  themeCompartment,
  highlightCompartment,
}: {
  filename: string
  theme: Theme
  codemirror: Bundle
  themeCompartment: Compartment
  highlightCompartment: Compartment
}): Promise<Extension> {
  const languageDescription = filename
    ? codemirror.language.LanguageDescription.matchFilename(
        codemirror.languageData.languages,
        filename
      )
    : null
  // console.log("languageDescription: ", languageDescription)

  let languageSupport: null | LanguageSupport = null

  if (languageDescription?.name === "Markdown") {
    const md = await import("@codemirror/lang-markdown")

    const HighlightDelim = { resolve: "InlineFence", mark: "InlineFence" }
    const tags = {
      // fence: Tag.define(t.null), // define custom tag, that can be picked up by the style configuration
      fence: Tag.define(), // define custom tag, that can be picked up by the style configuration
    };

    const MarkInlineFence: MarkdownConfig = {
      defineNodes: ["InlineFence", "InlineFenceMark"],
      parseInline: [{
        name: "InlineFence",
        parse(cx, next, pos) {
          if (next == 96 /* '`' */) return cx.addDelimiter(HighlightDelim, pos, pos + 1, true, true)
          return -1
        },
        // before: "InlineCode"
        before: "InlineCode"
      }],
      props: [
        styleTags({
          InlineFence: tags.fence
        })
      ]
    }

    languageSupport = md.markdown({
      codeLanguages: codemirror.languageData.languages.filter(
        (d) => d.name !== "Markdown"
      ),
      extensions: [MarkInlineFence],
      // extensions: [],
    })
  } else if (languageDescription) {
    languageSupport = await languageDescription.load()
  }


  const extensions = [
    docSizePlugin,
    // codemirror.gutter.gutter(headingsGutter),
    // codemirror.gutter.lineNumbers(),
    // codemirror.fold.foldGutter(),
    codemirror.view.highlightSpecialChars(),
    codemirror.history.history(),
    codemirror.view.drawSelection(),
    codemirror.state.EditorState.allowMultipleSelections.of(true),
    codemirror.language.indentOnInput(),
    codemirror.matchbrackets.bracketMatching(),
    codemirror.closebrackets.closeBrackets(),
    codemirror.autocomplete.autocompletion(),
    codemirror.rectangularSelection.rectangularSelection(),
    // codemirror.view.highlightActiveLine(),
    codemirror.search.highlightSelectionMatches(),
    ...(languageSupport ? [languageSupport] : []),
    themeCompartment.of(theme.base),
    highlightCompartment.of(theme.highlight),

    codemirror.view.keymap.of([
      // ...testKeymap,
      ...codemirror.commands.defaultKeymap,
      ...codemirror.closebrackets.closeBracketsKeymap,
      ...codemirror.search.searchKeymap,
      ...codemirror.history.historyKeymap,
      ...codemirror.fold.foldKeymap,
      ...codemirror.comment.commentKeymap,
      ...codemirror.autocomplete.completionKeymap,
      ...codemirror.lint.lintKeymap,
    ]),
  ]

  return extensions
}
