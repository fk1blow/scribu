import styled from '@emotion/styled'
import React, { FC, useCallback, useEffect, useMemo } from 'react'
import HeadingHighlight from './HeadingHighlight'
import { Highlight } from './Highlight'
import { HighlightTypes } from './HighlightTypes'
import HorizontalRuleHighlight from './HorizontalRuleHighlight'

const StyledDocumentHighlights = styled.aside`
  padding-left: 32px;
  padding-right: 32px;
  border-right: 1px solid #dfd8c9;
  margin-right: 6px;
  width: 300px;
  max-width: 300px;
  overflow: hidden;
  opacity: 0.4;
  transition: opacity 0.1s linear;

  :hover {
    opacity: 1;
  }

  nav {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    & > * {
      margin-bottom: 12px;
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

  const getHighlightType = useCallback(
    (highlight: Highlight, key: any) => {
      // switch(highlight) {
      //   case HighlightTypes.
      // }
      if (highlight.type.includes('ATXHeading')) {
        return (
          <HeadingHighlight
            onSelect={onItemSelect}
            item={highlight}
            key={key}
          />
        )
      } else {
        return (
          <HorizontalRuleHighlight
            onSelect={onItemSelect}
            item={highlight}
            key={key}
          />
        )
      }
    },
    [items],
  )

  return (
    <StyledDocumentHighlights>
      <nav>
        {items.map((item, idx) =>
          // <HeadingHighlight onSelect={onItemSelect} item={item} key={idx} />
          getHighlightType(item, idx),
        )}
      </nav>
    </StyledDocumentHighlights>
  )
}

export default DocumentHighlights
