import styled from '@emotion/styled'
import React, { FC } from 'react'
import { Highlight } from './Highlight'

const StyledHorizontalRule = styled.div`
  height: 1px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) calc(50% - 1px),
    rgb(223, 216, 201) calc(50%),
    rgba(0, 0, 0, 0) calc(50% + 1px)
  );
`

interface Props {
  item: Highlight
  onSelect: (payload: { from: number; to: number }) => void
}

const HorizontalRuleHighlight: FC<Props> = ({ item }) => {
  return <StyledHorizontalRule />
}

export default HorizontalRuleHighlight
