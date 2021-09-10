import {
  HighlightStyle,
  tags as t,
  classHighlightStyle,
  Tag,
  defaultHighlightStyle,
} from '@codemirror/highlight'
import * as view from '@codemirror/view'

const tags = t

const otherTags = {
  fence: Tag.define(t.null), // define custom tag, that can be picked up by the style configuration
}

export const lightTheme = {
  base: view.EditorView.theme({
    '&': {
      backgroundColor: '#f1eadb',
      color: '#46443e'
    },
  }),

  // highlight: classHighlightStyle,
  // highlight: defaultHighlightStyle,
  highlight: HighlightStyle.define([
    {
      tag: t.heading,
      fontFamily: 'Encode Sans',
      fontWeight: '700',
      color: '#0f0f0f',
    },
    {
      tag: otherTags.fence,
      color: 'red',
      class: 'cmt-fence',
      fontFamily: 'Encode Sans',
    },
    { tag: t.content, fontFamily: 'Encode Sans', fontWeight: '500' },
    {
      tag: t.emphasis,
      fontStyle: 'italic',
      fontFamily: 'Encode Sans',
      fontWeight: '500',
    },
    {
      tag: t.strong,
      fontFamily: 'Encode Sans',
      fontWeight: '500',
    },
    { tag: t.annotation, fontWeight: 'bold' },
    { tag: t.literal, fontFamily: 'Encode Sans' },
    { tag: t.monospace, fontFamily: 'Andada Pro' },
    // { tag: t.meta, fontFamily: 'iAWriterMonoS-Regular', color: 'red' },
    // { tag: t.fence, fontFamily: monospaceFontFamily, fontSize: '30px' },
    // { tag: t.keyword, fontFamily: monospaceFontFamily },
    // { tag: t.variableName, fontFamily: monospaceFontFamily },
    // { tag: t.punctuation, fontFamily: monospaceFontFamily },
  ]),
}
