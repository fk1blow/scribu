import React from 'react'
import useCodemirror, { getTheme } from '../../../../useCodemirror'
import { EditorState } from '@codemirror/state'

interface EditorProps {
  document: string
  onUpdate: (doc: string) => void
}

const Editor = ({ document, onUpdate }: EditorProps) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const themeRef = React.useRef(theme)

  React.useEffect(() => {
    themeRef.current = theme
  }, [theme])

  const [editor, editorRef] = useCodemirror()

  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})

  React.useEffect(() => {
    if (!editor) {
      return
    }

    editor.setTheme(getTheme(editor.codemirror, theme))
  }, [editor, theme])

  // bootstrap codemirror
  React.useEffect(() => {
    if (!editor) return

    const state = fileStateMapRef.current[document]

    const theme = getTheme(editor.codemirror, themeRef.current)

    if (state) {
      // We've loaded this file before
      editor.view.setState(state)

      // TODO: only do this if the state's theme doesn't match the current one
      editor.setTheme(theme)

      return
    }

    // Create the editor state object for this file

    let didCancel = false

    editor.loadExentions({ filename: document, theme }).then((extensions) => {
      if (didCancel) return

      const { codemirror } = editor

      // Keep our state in sync with the editor's state. This listener is called
      // after view.setState and on any future updates
      const updateListener = codemirror.view.EditorView.updateListener.of(
        (update) => {
          // fileStateMapRef.current[filename] = update.state
          onUpdate(update.state.doc.toString())
        },
      )

      const state = codemirror.state.EditorState.create({
        doc: document,
        extensions: [extensions, updateListener],
      })

      editor.view.setState(state)
    })

    return () => {
      didCancel = true
    }
  }, [editor, document])

  return (
    <div
      className="codemirror-container"
      ref={editorRef}
      style={{ minHeight: '100vh', background: '#FFFBF2' }}
    />
  )
}

// const Splash = () => {
//   // const { signalAppReady, listenToMain } = useElectron()

//   // useEffect(() => {
//   //   listenToMain(
//   //     'workspace-ready',
//   //     (_evt, data: { document: string; workspace: Workspace.Application }) => {
//   //       console.log('data.fileCurrent: ', data)
//   //     },
//   //   )

//   //   signalAppReady()
//   // }, [])

//   return <Editor />
// }

export default Editor
