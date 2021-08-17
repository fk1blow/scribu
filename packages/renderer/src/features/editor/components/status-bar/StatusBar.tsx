import styled from '@emotion/styled'
import React from 'react'
import FilePath from './FilePath'

const StyledStatusBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px 0 32px;
  height: 48px;
  background: #fffbf2c9;
`

interface Props {
  // workspace: Workspace.Application
  workspace: any
}

const StatusBar: React.FC<Props> = ({ workspace }: Props) => {
  return <StyledStatusBar>
    <FilePath workspace={workspace} />
  </StyledStatusBar>
}

export default StatusBar
