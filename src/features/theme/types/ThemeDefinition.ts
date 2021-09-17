import { HighlightStyle } from '@codemirror/highlight'
import { Extension } from '@codemirror/state'

interface ButtonThemeDefinition {
  backgroundColor: string
  foregroundColor: string
  hover: {
    backgroundColor: string
    foregroundColor: string
  }
  active: {
    backgroundColor: string
    foregroundColor: string
  }
  focus: {
    backgroundColor: string
    foregroundColor: string
  }
}

export interface ThemeDefinition {
  editor: {
    base: Extension
    highlight: HighlightStyle
  }

  app: {
    backgroundColor: string
    foregroundColor: string
  }

  commander: {
    backgroundColor: string
    foregroundColor: string
    borderColor: string
    highlightColor: string
  }

  button: {
    primary?: ButtonThemeDefinition
    secondary?: ButtonThemeDefinition
  }
}
