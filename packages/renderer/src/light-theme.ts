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
      backgroundColor: '#FFFBF2',
    },
  }),

  // highlight: classHighlightStyle,
  // highlight: defaultHighlightStyle,
  highlight: HighlightStyle.define([
    {
      tag: t.heading,
      fontFamily: 'iAWriterDuospace-Regular',
      fontWeight: '600',
      color: '#0f0f0f',
    },
    { tag: t.strikethrough, fontStyle: 'italic', color: 'red', textDecoration: 'line-through' },
    {
      tag: t.heading1,
      class: 'cmt-heading-1',
    },
    {
      tag: t.heading2,
      class: 'cmt-heading-2',
    },
    // { tag: tags.meta, class: "cmt-meta", fontFamily: "iAWriterDuospace-Italic" },
    {
      tag: otherTags.fence,
      color: 'red',
      class: 'cmt-fence',
      fontFamily: 'iAWriterDuospace-Bold',
    },
    { tag: t.content, fontFamily: 'iAWriterDuospace-Regular' },
    {
      tag: t.emphasis,
      fontStyle: 'italic',
      fontFamily: 'iAWriterDuospace-Italic',
    },
    {
      tag: t.strong,
      fontWeight: 'bold',
      fontFamily: 'iAWriterDuospace-BoldItalic',
    },
    { tag: t.annotation, fontWeight: 'bold' },
    { tag: t.literal, fontFamily: 'iA Writer Duospace' },
    { tag: t.monospace, fontFamily: 'iAWriterMonoS-Regular' },
    // { tag: t.meta, fontFamily: 'iAWriterMonoS-Regular', color: 'red' },
    // { tag: t.fence, fontFamily: monospaceFontFamily, fontSize: '30px' },
    // { tag: t.keyword, fontFamily: monospaceFontFamily },
    // { tag: t.variableName, fontFamily: monospaceFontFamily },
    // { tag: t.punctuation, fontFamily: monospaceFontFamily },
  ]),
}
