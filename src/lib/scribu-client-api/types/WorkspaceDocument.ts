export interface WorkspaceDocument {
  id: string
  filepath: string
  selection: { from: number; to: number }
  scroll: number
}
