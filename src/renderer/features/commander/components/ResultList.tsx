import React from 'react'
import styled from '@emotion/styled'
import Fuse from 'fuse.js'

import { RunnableCommand } from '@features/commander/types/RunnableCommand'

const StyledDiv = styled.div`
  position: absolute;
  top: 39px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`

const StyledList = styled.ul`
  width: 60%;
  padding: 1rem;
  margin: 0;
  list-style-type: none;
  background: #ececec;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`

interface Props {
  results: Fuse.FuseResult<RunnableCommand>[]
}

const ResultList: React.FC<Props> = ({ results }: Props) => {
  return (
    <StyledDiv>
      <StyledList>
        {results.map((resultItem) => (
          <li key={resultItem.refIndex}>
            {resultItem.item.title} - {resultItem.item.shortcut}
            {/* {JSON.stringify(resultItem)} */}
          </li>
        ))}
      </StyledList>
    </StyledDiv>
  )
}

export default ResultList
