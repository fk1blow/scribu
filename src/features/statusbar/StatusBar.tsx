import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useAppSelector } from '../../store/hooks'
import { lastNotification } from '../editor/store/selectors'

const StyledStatusBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  min-height: 1.5rem;
  font-size: 0.75rem;

  /* hardcoded */
  /* TODO go through a theme */
  color: #1a1a1a75;
`

interface Props {}

const StatusBar: React.FC<Props> = ({}: Props) => {
  const notification = useAppSelector(lastNotification)

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

  const onFoo = useCallback(() => {
    setTimeout(() => {
      onOpenDirs()
    }, 1000)
  }, [])

  return (
    <StyledStatusBar>
      {notification.type}
      {/* <button onClick={onFoo}>open dir</button> */}
    </StyledStatusBar>
  )
}

export default StatusBar
