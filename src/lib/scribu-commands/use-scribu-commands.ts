import { dialog, fs, path } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import {
  currentFileSelector,
  workspaceSelector,
} from '../../features/editor/store/selectors'
import { replaceCurrentFile } from '../../features/editor/store/workspace-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Workspace } from '../scribu-client-api/types/ScribuApi'

export const useScribuCommands = () => {
  const dispatch = useAppDispatch()
  const workspace = useAppSelector(workspaceSelector)

  useEffect(() => {
    // TODO refactor into adapter
    if (!window['__TAURI__']) return

    listen('tauri://window/reload', () => window.location.reload())

    //
    listen('tauri://file-drop', (evt: { event: string, payload: string[]}) => {
      if (evt.payload.length === 1)
        dispatch(replaceCurrentFile(evt.payload[0]))
    })

    listen('tauri://file/open', () => {
      dialog
        .open({ multiple: false })
        .then((path: string) => dispatch(replaceCurrentFile(path)))
    })
  }, [])
}
