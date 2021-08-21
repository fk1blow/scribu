import styled from '@emotion/styled'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook';

const StyledTitleBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* account for traffic lights width */
  padding: 0 80px;
  height: 38px;
  background: #fffbf2c9;
  border-bottom: 1px solid #E8E8E8;
  font-size: 14px;
  color: #767676;
`

const TitleBar: React.FC = () => {
useHotkeys('ctrl+p, cmd+p', () => console.log('command us!'));

  return (
    <StyledTitleBar>Scribu / Scribu MVP</StyledTitleBar>
  )
}

export default TitleBar
