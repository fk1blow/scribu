import styled from '@emotion/styled'
import React, { FC, useEffect, useMemo } from 'react'
import HeadingHighlight from './HeadingHighlight'
import { Highlight } from './Highlight'
import { HighlightTypes } from './HighlightTypes'

const StyledDocumentHighlights = styled.aside`
  padding-left: 32px;
  min-width: 200px;
  max-width: 300px;
  overflow: hidden;
  opacity: .6;

  :hover {
    opacity: 1;
  }

  nav {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    a:not(:first-of-type) {
      margin-top: 12px;
    }
  }
`

const HighlightItem = styled.a`
  text-decoration: none;
  color: inherit;

  :hover {
    text-decoration: underline;
  }
`

interface Props {
  items: Highlight[]
  onItemSelect: (payload: { from: number; to: number }) => void
}

const DocumentHighlights: FC<Props> = ({ items, onItemSelect }) => {
  const headingItems = useMemo(() => {
    return items.filter((item) => HighlightTypes[item.type])
    // .map((item) => {
    //   const size = item.type.slice(10, item.type.length).length
    //   console.log('size: ', size)
    //   return item.
    // })
  }, [items])

  return (
    <StyledDocumentHighlights>
      <nav>
        {headingItems.map((item, idx) => (
          <HeadingHighlight onSelect={onItemSelect} item={item} key={idx} />
        ))}
        {/* <HighlightItem href="#">heading 1</HighlightItem>
        <HighlightItem href="#">heading 1</HighlightItem> */}
      </nav>
    </StyledDocumentHighlights>
  )
}

export default DocumentHighlights
