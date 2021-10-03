import * as React from 'react'
import { BlockInfo, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { Extension, Compartment, EditorSelection } from '@codemirror/state'
import { LanguageSupport, syntaxTree } from '@codemirror/language'
import docSizePlugin from '../plugins/document-size'
import { tags, styleTags, Tag } from '@codemirror/highlight'
import { HighlightStyle, tags as t } from '@codemirror/highlight'
import { theme as lightTheme } from '../../theme/light'
import { theme as grayTheme } from '../../theme/gray'
import { testKeymap } from '../plugins/test-keybindings'
import { GutterMarker } from '@codemirror/gutter'
import headingsGutter from '../plugins/heading-gutters'

import * as codemirror from '../../codemirror'
import { redo, undo } from '@codemirror/history'

type Bundle = typeof import('../../codemirror')

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
  React.MutableRefObject<HTMLDivElement>,
] {
  const targetEl = React.useRef<HTMLDivElement | null>()
  const [editor, setEditor] = React.useState<Editor | null>(null)

  const themeCompartment = new Compartment()
  const highlightCompartment = new Compartment()

  React.useEffect(() => {
    if (!targetEl) {
      return
    }

    let didCancel = false

    let view: null | EditorView

    function createEditor() {
      if (!targetEl || didCancel) {
        return
      }

      view = new codemirror.view.EditorView({
        parent: targetEl.current,
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

  return [editor, targetEl]
}

export function getTheme(
  codemirror: Bundle,
  kind: 'light' | 'dark' | 'gray',
): Theme {
  if (kind === 'dark') {
    return {
      base: codemirror.themeOneDark.oneDarkTheme,
      highlight: codemirror.themeOneDark.oneDarkHighlightStyle,
    }
  } else if (kind === 'light') {
    return lightTheme.editor
  }

  return grayTheme.editor
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
  let languageSupport: null | LanguageSupport = null

  const md = await import('@codemirror/lang-markdown')

  const HighlightDelim = { resolve: 'InlineCode', mark: 'InlineFence' }
  const tags = {
    fence: Tag.define(t.null), // define custom tag, that can be picked up by the style configuration
    // fence: Tag.define(), // define custom tag, that can be picked up by the style configuration
  }

  const MarkInlineFence = {
    defineNodes: ['InlineFence', 'InlineFenceMark'],
    parseInline: [
      {
        name: 'InlineFence',
        parse(cx, next, pos) {
          if (next == 96 /* '`' */)
            return cx.addDelimiter(HighlightDelim, pos, pos + 1, true, true)
          return -1
        },
        before: 'InlineCode',
      },
    ],
    props: [
      styleTags({
        InlineFence: tags.fence,
      }),
    ],
  }

  const UnderlinedHeadings = {
    defineNodes: ['InlineFence'],
    parseInline: [
      {
        name: 'UnderlinedHeading',
        parse(cx, next, pos) {
          console.log('pos: ', pos)
          console.log('next: ', next)
          // if (next == 45)
          //   return cx.addDelimiter(HighlightDelim, pos, pos + 1, true, true)
          // return -1
          return 1
        },
        after: 'Entity',
        // before: 'InlineCode',
      },
    ],
    props: [
      styleTags({
        InlineFence: Tag.define(t.heading2),
      }),
    ],
  }

  const strikethroughTags = {
    strikethrough: Tag.define(),
  }

  const StrikethroughDelim = {
    resolve: 'Strikethrough',
    mark: 'StrikethroughMark',
  }

  const Strikethrough = {
    defineNodes: ['Strikethrough', 'StrikethroughMark'],
    parseInline: [
      {
        name: 'Strikethrough',
        parse(cx, next, pos) {
          if (next != 126 /* '~' */ || cx.char(pos + 1) != 126) {
            return -1
          }
          return cx.addDelimiter(StrikethroughDelim, pos, pos + 2, true, true)
        },
        after: 'Emphasis',
      },
    ],
    props: [
      styleTags({
        StrikethroughMark: t.processingInstruction,
        'Strikethrough/...': strikethroughTags.strikethrough,
      }),
    ],
  }

  languageSupport = md.markdown({
    codeLanguages: codemirror.languageData.languages.filter(
      (d) => d.name !== 'Markdown',
    ),
    // extensions: [MarkInlineFence],
    extensions: [Strikethrough, MarkInlineFence],
    // extensions: [UnderlinedHeadings],
    // extensions: [],
  })

  const extensions = [
    // docSizePlugin,
    // codemirror.gutter.gutter(headingsGutter),
    // codemirror.gutter.lineNumbers(),
    // codemirror.fold.foldGutter(),
    EditorView.lineWrapping,
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
      // ...codemirror.history.historyKeymap,
      { key: 'Mod-Shift-z', run: redo, preventDefault: true },
      { key: 'Mod-z', run: undo, preventDefault: true },
      // ...codemirror.fold.foldKeymap,
      ...codemirror.comment.commentKeymap,
      ...codemirror.autocomplete.completionKeymap,
      ...codemirror.lint.lintKeymap,
    ]),
  ]

  return extensions
}
