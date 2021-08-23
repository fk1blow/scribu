import styled from '@emotion/styled'
import { PathInput, ResultList } from '@features/commander'
import { RunnableCommand } from '@features/commander/types/RunnableCommand'
import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'

const commands: RunnableCommand[] = [
  {
    title: 'New File',
    shortcut: 'cmd+n',
  },
  {
    title: 'New Project',
    shortcut: 'cmd+shift+n',
  },
  {
    title: 'Rename Project',
    shortcut: 'cmd+shift+r',
  },
  {
    title: 'Rename File',
    shortcut: 'cmd+r',
  },
]

const StyledDiv = styled.div`
  width: 550px;
`

interface Props {
  // ...
}

const Commander: React.FC<Props> = ({}: Props) => {
  const [fuseInstance, setFuseInstance] =
    useState<Fuse<RunnableCommand> | null>(null)

  const [pathInputValue, setPathInputValue] = useState('')

  const [inputResults, setInputResults] = useState<
    Fuse.FuseResult<RunnableCommand>[]
  >([])

  const [showsResultList, setShowsResultList] = useState(false)

  useEffect(() => {
    const options = {
      // isCaseSensitive: false,
      includeScore: true,
      // shouldSort: true,
      includeMatches: true,
      findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.9,
      //distance: 80,
      useExtendedSearch: true,
      ignoreLocation: true,
      // ignoreFieldNorm: true,
      keys: ['title', 'shortcut'],
    }

    const fuse = new Fuse(commands, options)
    setFuseInstance(fuse)
  }, [])

  useEffect(
    () => setInputResults(fuseInstance?.search(pathInputValue) || []),
    [pathInputValue],
  )

  useEffect(
    () => setShowsResultList(pathInputValue.length > 0),
    [pathInputValue],
  )

  return (
    <StyledDiv>
      <PathInput value={pathInputValue} onChange={setPathInputValue} />
      {showsResultList && <ResultList results={inputResults} />}
    </StyledDiv>
  )
}

export default Commander
