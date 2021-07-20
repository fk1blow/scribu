import React, { useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useElectron } from '/@/lib/use-electron/use-electron'

const Splash = () => {
  const { getWorkspace } = useElectron()

  useHotkeys('cmd+s', (evt) => {
    if (!evt.repeat) {
      console.log('save file')
    }
  })

  useEffect(() => {
    getWorkspace().then((r) => {
      console.log('r: ', r)

      // writeToCurrentFile('mama are flori')

      // return getWorkspace()
    })
    // .then((r) => {
    //   console.log('r: ', r)
    // })
  }, [])

  return <div>splash</div>
}

export default Splash
