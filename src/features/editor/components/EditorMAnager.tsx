import React, { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import Editor from './Editor'
import styled from '@emotion/styled'

const StyledEditorManager = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
  min-height: 0px;
  /* overflow: hidden; */
  justify-content: stretch;
  width: 100%;
`

interface Props {
  // ...
}

const EditorManager: React.FC<Props> = ({}: Props) => {
  const [document, setDocument] = useState('')
  const [workspace, setWorkspace] = useState<any>(null)
  const [editorKeyRef, setEditorKeyRef] = useState('pristine')

  const onUpdateDocument = useCallback(
    debounce((content) => {
      //   if (!workspace?.fileCurrent.path.length) return
      //   writeToCurrentFile(content)
    }, 500),
    [workspace],
  )

  return (
    <StyledEditorManager>
      <Editor
        key={editorKeyRef}
        document={document}
        workspace={workspace}
        onUpdate={onUpdateDocument}
      />
    </StyledEditorManager>
  )
}

export default EditorManager
