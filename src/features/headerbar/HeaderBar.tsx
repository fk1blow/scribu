import styled from '@emotion/styled'
import React from 'react'

const StyledHeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  min-height: 2rem;
  font-size: 0.75rem;
`

interface Props {
  // ...
}

const HeaderBar: React.FC<Props> = ({}: Props) => {
  return <StyledHeaderBar />
}

export default HeaderBar
