import styled from '@emotion/styled'
import React, { FC, useCallback, useMemo } from 'react'
import { Highlight } from './Highlight'

const components = {
  ATXHeading1: styled.a`
    font-size: 22px;
  `,

  ATXHeading2: styled.a`
    font-size: 20px;
  `,

  ATXHeading3: styled.a`
    font-size: 18px;
  `,

  ATXHeading4: styled.a`
    font-size: 16px;
  `,

  ATXHeading5: styled.a`
    font-size: 14px;
  `,

  ATXHeading6: styled.a`
    font-size: 12px;
  `,
}

const StyledAnchor = styled.a`
  font-size: 14px;
  /* font-weight: 600; */
  color: ${({ theme }) => theme.app.foregroundColor};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

interface Props {
  item: Highlight
  onSelect: (payload: { from: number; to: number }) => void
}

const HeadingHighlight: FC<Props> = ({ item, onSelect }) => {
  const itemValue = useMemo(() => {
    const size = parseInt(item.type.slice(10, item.type.length || 0))
    return size > 0 ? item.value.slice(size, item.value.length) : item.value
  }, [item])

  const ItemComponent = useMemo(() => {
    return components[item.type]
  }, [item])

  const onClick = useCallback(() => {
    if (!item) return
    const { from, to } = item
    onSelect({ from, to })
  }, [item])

  // return <ItemComponent href="#">{itemValue}</ItemComponent>
  return (
    <StyledAnchor href="#" onClick={onClick}>
      {itemValue}
    </StyledAnchor>
  )
}

export default HeadingHighlight
