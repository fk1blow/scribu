import {
  HighlightStyle,
  tags as t,
  classHighlightStyle,
  Tag,
  defaultHighlightStyle,
} from '@codemirror/highlight'
import * as view from '@codemirror/view'
import { ThemeDefinition } from './types/ThemeDefinition'

const tags = t

const otherTags = {
  fence: Tag.define(t.null), // define custom tag, that can be picked up by the style configuration
}

const regularFont = 'iAWriterDuospace-Regular'
const boldFont = 'iAWriterDuospace-Bold'
const italicFont = 'iAWriterDuospace-Italic'
const boldItalicFont = 'iAWriterDuospace-BoldItalic'
const monospaceFont = 'iAWriterMonoS-Regular'

export const editorTheme = {
  base: view.EditorView.theme({
    '&': {
      // backgroundColor: '#f1eadb',
      // backgroundColor: 'transparent',
      // color: '#3e3e3e'
      fontFamily: regularFont
    },
  }),

  highlight: HighlightStyle.define([
    {
      tag: t.heading,
      fontFamily: boldFont,
      color: '#424242',
    },
    {
      tag: otherTags.fence,
      class: 'cmt-fence',
      fontFamily: regularFont,
    },
    { tag: t.content, fontFamily: regularFont, fontWeight: '500' },
    {
      tag: t.emphasis,
      fontFamily: italicFont,
    },
    {
      tag: t.strong,
      fontFamily: boldFont,
    },
    { tag: t.annotation, fontWeight: 'bold' },
    { tag: t.literal, fontFamily: regularFont },
    { tag: t.monospace, fontFamily: monospaceFont },
  ]),
}

export const theme: ThemeDefinition = {
  editor: {
    ...editorTheme,
  },

  app: {
    backgroundColor: '#f1eadb',
    foregroundColor: '#46443e',
  },

  commander: {
    backgroundColor: '#dfdacd',
    foregroundColor: '#46443e',
    borderColor: '#46443e',
    highlightColor: '#d0cbbe'
  },

  button: {},
}
