import styled from '@emotion/styled'
import React, { FC, useEffect, useMemo } from 'react'
import HeadingHighlight from './HeadingHighlight'
import { Highlight } from './Highlight'
import { HighlightTypes } from './HighlightTypes'

const StyledDocumentHighlights = styled.aside`
  padding-left: 32px;
  padding-right: 32px;
  border-right: 1px solid #dfd8c9;
  margin-right: 6px;
  min-width: 200px;
  max-width: 300px;
  overflow: hidden;
  opacity: 0.6;

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
  const headingItems = useMemo(
    () => items.filter((item) => HighlightTypes[item.type]),
    [items],
  )

  return (
    <StyledDocumentHighlights>
      <nav>
        {headingItems.map((item, idx) => (
          <HeadingHighlight onSelect={onItemSelect} item={item} key={idx} />
        ))}
      </nav>
    </StyledDocumentHighlights>
  )
}

export default DocumentHighlights
