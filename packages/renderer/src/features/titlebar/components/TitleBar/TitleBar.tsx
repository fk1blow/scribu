import styled from '@emotion/styled'
import React from 'react'

interface Props {
  workspace: Workspace.Application | null
}

const StyledTitleBar = styled.div`
  height: 48px;
  background: #fffbf2c9;
`

const TitleBar: React.FC<Props> = ({ workspace }: props) => {
  return (
    <StyledTitleBar>iz me TitleBar</StyledTitleBar>
  )
}

export default TitleBar
