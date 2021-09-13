import { HighlightStyle } from '@codemirror/highlight'
import { Extension } from '@codemirror/state'

export interface ThemeDefinition {
  editor: {
    base: Extension
    highlight: HighlightStyle
  }

  app: Record<string, string>
}
