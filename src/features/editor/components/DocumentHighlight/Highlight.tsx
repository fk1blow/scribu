import { HighlightTypes } from './HighlightTypes'

export interface Highlight {
  from: number
  to: number
  type: HighlightTypes
  value: string
}
