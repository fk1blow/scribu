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

export const useTauriCommands = () => {
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

    // TODO refactor by trying to keep only the call to `dispatch`
    listen('tauri://file/new', (_evt) => {
      dispatch(createNewFile())
    })

    listen('tauri://file/save-as', (_evt) => {
      dialog.save().then((path: string) => {
        // console.log('path: ', path)
        dispatch(saveAsNewFile({ path }))
      })
    })

    listen('tauri://edit/redo', () => {
      // console.log('tauri redo')
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
