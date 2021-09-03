import React, { useCallback, useState } from "react"
import { debounce } from "lodash"
import styled from "@emotion/styled"
import Editor from "./features/editor/components/Editor"
import "./assets/styles/fonts.scss"

const StyledApp = styled.div`
  height: 100vh;
  background-color: #a1a1a1;
`

function App() {
  const [document, setDocument] = useState("")
  const [workspace, setWorkspace] = useState<any>(null)
  const [editorKeyRef, setEditorKeyRef] = useState("pristine")

  const onUpdateDocument = useCallback(
    debounce((content) => {
      //   if (!workspace?.fileCurrent.path.length) return
      //   writeToCurrentFile(content)
    }, 500),
    [workspace]
  )

  return (
    <StyledApp>
      <Editor
        key={editorKeyRef}
        document={document}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      />
    </StyledApp>
  )
}

export default App
