import { dialog, path } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import {
  createNewFile,
  replaceCurrentFile,
  saveAsNewFile,
} from '../../features/editor/store/workspace-slice'
import { useAppDispatch } from '../../store/hooks'

export const useScribuCommands = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!window['__TAURI__']) return

    listen('tauri://window/reload', () => window.location.reload())

    // TODO expand to multiple tabs, when this feat becomes available
    listen('tauri://file-drop', (evt: { event: string; payload: string[] }) => {
      if (evt.payload.length === 1) dispatch(replaceCurrentFile(evt.payload[0]))
    })

    listen('tauri://file/open', () => {
      dialog
        .open({ multiple: false })
        .then((path: string) => dispatch(replaceCurrentFile(path)))
    })

    listen('tauri://file/new', (_evt) => {
      console.log('tauri://file/new')

      path
        .documentDir()
        .then((docsPath) => path.join(docsPath, 'scribu'))
        .then((inPath) => {
          invoke('create_new_file', { inPath }).then((path: string) => {
            dispatch(createNewFile(path))
          })
        })
        .catch(console.error)
    })

    listen('tauri://file/save-as', (_evt) => {
      dialog.save().then((path: string) => {
        // console.log('path: ', path)
        dispatch(saveAsNewFile({ path }))
      })
    })

    listen('tauri://edit/redo', () => {
      window.document.dispatchEvent(
        new KeyboardEvent('keydown', {
          keyCode: 90,
          ctrlKey: true,
          shiftKey: true,
        }),
      )
    })
  }, [])
}
