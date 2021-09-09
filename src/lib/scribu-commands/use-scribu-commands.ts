import { dialog, fs, path } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import {
  currentFileSelector,
  workspaceSelector,
} from '../../features/editor/store/selectors'
import { createNewFile, replaceCurrentFile } from '../../features/editor/store/workspace-slice'
import { useAppDispatch } from '../../store/hooks'

export const useScribuCommands = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // TODO refactor into adapter
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
      invoke('create_new_temp_file').then((path: string) => {
        // console.log('path: ', path)
        dispatch(createNewFile(path))
      })
    })
  }, [])
}
