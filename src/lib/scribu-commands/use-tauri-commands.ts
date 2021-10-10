import { dialog } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import {
  createNewDocument,
  openDocument,
  saveAsNewDocument,
} from '../../features/editor/store/workspace-slice'
import { useAppDispatch } from '../../store/hooks'

export const useTauriCommands = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!window['__TAURI__']) return

    listen('tauri://window/reload', () => window.location.reload())

    // cannot be implemented from tauri, not yet!
    // TODO keep an eye on tauri docs/releases
    // listen('tauri://window/zoomin', () => console.log('zoom in??'))
    // listen('tauri://window/zoomout', () => console.log('zoom out??'))

    // TODO expand to multiple tabs, when this feat becomes available
    listen('tauri://file-drop', (evt: { event: string; payload: string[] }) => {
      if (evt.payload.length === 1) dispatch(openDocument(evt.payload[0]))
    })

    listen('tauri://file/open', () => {
      dialog.open({ multiple: false }).then((filePath: string) => {
        // filePath may be null if the user cancels the operation
        if (filePath) dispatch(openDocument(filePath))
      })
    })

    listen('tauri://file/new', (_evt) => {
      dispatch(createNewDocument())
    })

    listen('tauri://commander/show', (_evt) => {
      window.document.dispatchEvent(
        new KeyboardEvent('keydown', {
          keyCode: 80,
          metaKey: true,
          shiftKey: true,
        }),
      )
    })

    listen('tauri://file/save-as', (_evt) => {
      dialog.save().then((filePath: string) => {
        // filePath may be null if the user cancels the operation
        if (filePath) dispatch(saveAsNewDocument({ path: filePath }))
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
