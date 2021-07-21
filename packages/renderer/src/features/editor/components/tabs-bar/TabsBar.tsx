import styled from '@emotion/styled';
import React from 'react';

const StyledTabsBar = styled.div`
  height: 48px;
  /* position: fixed; */
  /* top: 0;
  left: 0;
  right: 0; */
  background: #fffbf2c9;
`

const TabsBar: React.FC = () => {
  return (<StyledTabsBar>tabs bar</StyledTabsBar>)
}

export default TabsBar
