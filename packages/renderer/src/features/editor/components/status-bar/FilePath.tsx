import styled from '@emotion/styled'
import React from 'react'

interface Props {
  workspace: Workspace.Application
}

const StyledFilePath = styled.div`
  font-size: 0.75rem;
  color: #444337;
`

const Label = styled.span`
  user-select: none;
  font-weight: bold;
`

const FilePath: React.FC<Props> = ({ workspace }: Props) => {
  return (
    <StyledFilePath>
      <Label>path: </Label>
      {workspace.fileCurrent.path}
    </StyledFilePath>
  )
}

export default FilePath
