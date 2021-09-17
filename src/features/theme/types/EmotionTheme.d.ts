import '@emotion/react'
import { HighlightStyle } from '@codemirror/highlight'
import { Extension } from '@codemirror/state'
import { ThemeDefinition } from './ThemeDefinition'

declare module '@emotion/react' {
  export interface Theme extends ThemeDefinition {}
}
