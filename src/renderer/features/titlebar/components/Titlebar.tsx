import styled from '@emotion/styled'
import { Commander } from '@features/commander'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const StyledTitleBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* account for traffic lights width */
  padding: 0 80px;
  height: 38px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  color: #767676;
`

const TitleBar: React.FC = () => {
  useHotkeys('cmd+shift+r', () => console.log('escape us!'))

  return (
    <StyledTitleBar>
      <Commander />
    </StyledTitleBar>
  )
}

export default TitleBar
