import styled from '@emotion/styled'
import Fuse from 'fuse.js'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAppDispatch } from '../../../store/hooks'
import { RunnableCommand } from '../types/RunnableCommand'
import CommanderInput from './CommanderInput'
import ResultList from './ResultList/ResultList'

const StyledCommander = styled.div`
  position: absolute;
  z-index: 99;
  top: 3px;
  left: calc(50% - 200px);
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: ${(props) => props.theme.commander.backgroundColor};
`

const commands: RunnableCommand[] = [
  {
    title: 'Open File',
    shortcut: 'cmd+shift+o',
    asCommander: 'openFile',
  },
  {
    title: 'New File',
    shortcut: 'cmd+shift+n',
  },
  {
    title: 'Rename File',
    shortcut: 'cmd+shift+r',
  },
  {
    title: 'Open Directory',
    shortcut: '',
  },
  {
    title: 'Aaa',
    shortcut: '',
  },
  {
    title: 'Bbb',
    shortcut: '',
  },
  {
    title: 'Ccc',
    shortcut: '',
  },
  {
    title: 'Ddd',
    shortcut: '',
  },
]

const Commander: FunctionComponent<unknown> = (_props) => {
  const dispatch = useAppDispatch()

  const [show, isShowing] = useState(false)

  const [fuseInstance, setFuseInstance] =
    useState<Fuse<RunnableCommand> | null>(null)

  const [showsResultList, setShowsResultList] = useState(false)

  const [pathInputValue, setPathInputValue] = useState('')

  const [inputResults, setInputResults] = useState<
    Fuse.FuseResult<RunnableCommand>[]
  >([])

  const onShouldCloseCommander = useCallback(() => {
    isShowing(false)
    setPathInputValue('')
  }, [])

  useHotkeys('ctrl+shift+p', (e) => {
    e.preventDefault()
    isShowing(true)
  })

  useHotkeys(
    'esc',
    (e) => {
      isShowing(false)
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    },

    { enableOnTags: ['INPUT'] },
  )

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

  useEffect(() => {
    const results = fuseInstance?.search(pathInputValue) || []
    if (pathInputValue.trim().length === 0) {
      setInputResults(
        commands.map((cmd, idx) => ({ item: cmd, refIndex: idx })),
      )
    } else {
      setInputResults(results)
    }
  }, [pathInputValue])

  const onOpenDirs = useCallback(async () => {
    // let fileHandle
    // window.showDirectoryPicker().then((xoo) => {
    //   console.log('xoo: ', xoo)
    // })
    const dirHandle = await window.showDirectoryPicker()

    console.log('dirHandle: ', dirHandle)

    for await (const entry of dirHandle.values()) {
      // console.log(entry.kind, entry.name)
      const xoo = (await entry.getFile(entry.name)) as File
      const textContent = await xoo.text()
      console.log('textContent: ', textContent)
    }
  }, [])

  return (
    <>
      {show && (
        <StyledCommander>
          <CommanderInput
            value={pathInputValue}
            onChange={setPathInputValue}
            onShouldClose={onShouldCloseCommander}
          />
          <ResultList results={inputResults} onChoose={() => {}} />
        </StyledCommander>
      )}
    </>
  )
}

export default Commander
