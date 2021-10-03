import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import Fuse from 'fuse.js'
import { RunnableCommand } from '../../types/RunnableCommand'
import ResultListButton from './ResultListButton'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAppDispatch } from '../../../../store/hooks'
import {
  commandsMap,
  runCommand,
  RunCommandsMap,
} from '../../store/commander-slice'
import CommandName from './CommandName'
import CommandShortcut from './CommandShortcut'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  results: Fuse.FuseResult<RunnableCommand>[]
  onChoose: () => void
}

const ResultList: React.FC<Props> = ({ results, onChoose }: Props) => {
  const dispatch = useAppDispatch()
  const [selectedRowIdx, setSelectedRowIdx] = useState(0)

  useHotkeys(
    'down',
    () => {
      if (selectedRowIdx < results.length - 1) {
        setSelectedRowIdx(selectedRowIdx + 1)
      }
    },
    { enableOnTags: ['INPUT'] },
  )

  useHotkeys(
    'up',
    () => {
      if (selectedRowIdx > 0) {
        setSelectedRowIdx(selectedRowIdx - 1)
      }
    },
    { enableOnTags: ['INPUT'] },
  )

  useHotkeys(
    'enter',
    () => {
      const cmdName = results[selectedRowIdx]['item'][
        'asCommander'
      ] as RunCommandsMap

      console.log('cmdName: ', cmdName)

      // if (cmdName) dispatch(runCommand({ name: cmdName }))
    },
    { enableOnTags: ['INPUT'] },
  )

  return (
    <StyledDiv>
      {results.map((resultItem, idx) => (
        <ResultListButton
          key={resultItem.refIndex}
          selected={selectedRowIdx === idx}
          onClick={onChoose}
        >
          <CommandName>{resultItem.item.title}</CommandName>
          <CommandShortcut>{resultItem.item.shortcut && resultItem.item.shortcut}</CommandShortcut>
        </ResultListButton>
      ))}
    </StyledDiv>
  )
}

export default ResultList
