import styled from '@emotion/styled';
import React from 'react';

const StyledStatusBar = styled.div`
  height: 48px;
  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0; */
  background: #fffbf2c9;
`

const StatusBar: React.FC = () => {
  return (<StyledStatusBar>status bar</StyledStatusBar>)
}

export default StatusBar
