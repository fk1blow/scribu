import { redo } from '@codemirror/history'
import { EditorState } from '@codemirror/state'
import { ViewUpdate } from '@codemirror/view'
import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useCodemirror, { getTheme } from '../hooks/useCodemirror'
import CustomScroll from 'react-custom-scroll'

const EditorWrapper = styled.div`
  /* display: flex; */
  /* height: 100%; */
  /* flex: 1 1; */

  .cm-scroller {
    flex: 1 1;
    /* height: 100%; */
  }

  .cm-content {
    max-width: 900px;
    margin: 0 auto;
  }}

  .cm-editor {
    /* height: 100%; */
  }

  .codemirror-container {
    /* height: 1000px; */
  }
`

interface Props {
  workspace: any
  document: string
  onUpdate: (doc: string) => void
}

const Editor: React.FC<Props> = ({ onUpdate, document, workspace }: Props) => {
  const [editor, editorRef] = useCodemirror()
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'gray'>('light')
  const themeRef = React.useRef(theme)

  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})

  useEffect(() => {
    if (!editorRef || !editor) return

    console.log('editor: ', editor)
    console.log('editorRef: ', editorRef)
    // console.log('targetEl: ', targetEl)
    foo()
  }, [editorRef, editor])

  const foo = useCallback(() => {
    console.log('editor.view: ', editor.view.scrollDOM)
    // works
    redo(editor.view)
    // console.log('editor: ', editor)
    // console.log('editorRef: ', editorRef)
  }, [editorRef, editor])

  useHotkeys(
    'ctrl+shift+z',
    () => {
      foo()
    },
    [editor],
  )

  React.useEffect(() => {
    if (!editor) {
      return
    }

    console.log('theme: ', theme)

    editor.setTheme(getTheme(editor.codemirror, theme))
  }, [editor, theme])

  // bootstrap codemirror
  useEffect(() => {
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
        (update: ViewUpdate) => {
          if (update.docChanged) {
            onUpdate(update.state.doc.toString())
          }
        },
      )

      const initialState = codemirror.state.EditorState.create({
        doc: document,
        extensions: [extensions, updateListener],
      })

      editor.view.setState(initialState)
    })

    return () => {
      didCancel = true
    }
  }, [editor])

  return (
    <EditorWrapper>
      {/* <div style={{ display: 'flex', flex: 1, minHeight: '0px' }}>
        <div style={{ flex: 1, overflow: 'auto', justifyContent: 'stretch' }}> */}
          <CustomScroll>
            <div
              className="codemirror-container"
              ref={editorRef}
              style={{ height: '100%' }}
            />
          </CustomScroll>
        {/* </div>
      </div> */}
    </EditorWrapper>
  )
}

export default Editor
