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

export const editorTheme = {
  base: view.EditorView.theme({
    '&': {
      backgroundColor: '#a1a1a1',
      color: '#1A1A1A',
    },
  }),

  highlight: HighlightStyle.define([
    {
      tag: t.heading,
      fontFamily: 'iAWriterDuospace-Regular',
      fontWeight: '600',
      color: '#0f0f0f',
    },
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
  ]),
}

export const theme = {
  editor: {
    ...editorTheme,
  },

  app: {
    backgroundColor: '#a1a1a1',
    color: '#1A1A1A',
  },
}
