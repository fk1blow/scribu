import { dialog } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import {
  createNewDocument,
  saveAsNewDocument,
} from '../../features/editor/store/workspace-slice'
import {
  selectors as workspaceSelectors,
  actions as workspaceActions,
} from '@features/editor'
import { actions as documentActions } from '@features/document'
import { useAppDispatch, useAppSelector } from '@store/hooks'

export const useTauriCommands = () => {
  const dispatch = useAppDispatch()
  const workspaceId = useAppSelector(
    workspaceSelectors.currentWorkspaceIdSelector,
  )
  // const currentCurrentFile = useAppSelector(
  //   workspaceSelectors.currentFileSelector,
  // )
  const currentWorkspace = useAppSelector(workspaceSelectors.currentWorkspace)

  useEffect(() => {
    if (!window['__TAURI__']) return

    listen('tauri://window/reload', () => window.location.reload())

    // cannot be implemented from tauri, not yet!
    // TODO keep an eye on tauri docs/releases
    // listen('tauri://window/zoomin', () => console.log('zoom in??'))
    // listen('tauri://window/zoomout', () => console.log('zoom out??'))


    // TODO expand to multiple tabs, when this feat becomes available
    // TODOO this should open up a new tab inside current workspace
    listen('tauri://file-drop', (evt: { event: string; payload: string[] }) => {
      // TODO refactor/rename
      // if (evt.payload.length === 1) dispatch(openDocument(evt.payload[0]))

        console.log('should open dragged file/s: ', evt.payload)

      // TODO implement when tabs rdy
      // if (evt.payload.length === 1) {
      //   dispatch(
      //     workspaceActions.changeCurrentFilePath({
      //       path: evt.payload[0],
      //     }),
      //   )
      // }
    })

    // TODOO this should open up a new tab inside current workspace
    listen('tauri://file/open', () => {
      dialog.open({ multiple: false }).then((filepath: string) => {
        // filePath may be null if the user cancels the operation
        // if (filePath) dispatch(openDocument(filePath))
        if (filepath) console.log('filepath: ', filepath)

        console.log('should open chosen file: ', filepath)

        // TODO implement when tabs rdy
        // dispatch(
        //   workspaceActions.changeCurrentFilePath({
        //     path: filepath,
        //   }),

        //   // documentActions.openDocument({
        //   //   workspaceId,
        //   //   filepath: currentCurrentFile.path,
        //   // }),
        // )
      })
    })

    // TODO implement with tabs
    listen('tauri://file/new', (_evt) => {
      // TODO reimplement
      // dispatch(createNewDocument())
    })

    listen('tauri://file/save-as', (_evt) => {
      // TODO reimplement
      // dialog.save().then((filePath: string) => {
      //   // filePath may be null if the user cancels the operation
      //   if (filePath) dispatch(saveAsNewDocument({ path: filePath }))
      // })
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

    listen('tauri://resize', (evt) => {
      // console.log('tauri://resize, evt: ', evt)
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
  }, [])
}
