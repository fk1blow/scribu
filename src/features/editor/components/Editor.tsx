import { redo } from '@codemirror/history'
import { EditorState } from '@codemirror/state'
import { ViewUpdate } from '@codemirror/view'
import styled from '@emotion/styled'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useWindowSize } from '@react-hook/window-size/throttled'
import useCodemirror, { getTheme } from '../hooks/useCodemirror'
import { syntaxTree } from '@codemirror/language'
import { Tree } from '@lezer/common'
import { Highlight } from './DocumentHighlight/Highlight'

const getDocumentHighlights = (state: EditorState) => {
  const tree = syntaxTree(state)

  let headings: any = []
  let cursor = tree.cursor()
  do {
    if (cursor.name.includes('ATXHeading')) {
      headings.push({
        from: cursor.from,
        to: cursor.to,
        type: cursor.name,
        value: state.sliceDoc(cursor.from, cursor.to),
      })
    }
  } while (cursor.next())

  return { headings }
}

const EditorWrapper = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: stretch;
  width: 100vw;
  height: 100%;
  overflow: hidden;

  .cm-scroller {
    flex: 1 1;
  }

  .cm-content {
    max-width: 900px;
    margin: 0 auto;
    /*
      fixes a bug in cm that scroll the content when there is overflow
      and the user selects some text(or simply clicks on the editor)
      that resides on the bottom of the editor
     */
    padding: 0;
  }

  .cm-editor {
    height: 100%;
  }

  .codemirror-container {
    flex-grow: 1;
  }
`

interface Props {
  document: string
  onUpdate: (doc: string) => void
  onHighlightsChange: (highlights: Highlight[]) => void
}

const Editor = ({ onUpdate, document, onHighlightsChange }: Props, ref) => {
  const [editor, editorRef] = useCodemirror()
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'gray'>('light')
  const themeRef = React.useRef(theme)
  const fileStateMapRef = React.useRef<Record<string, EditorState>>({})
  const windowSize = useWindowSize({ fps: 10 })

  useEffect(() => {
    if (!editor) return
    editor.view.dispatch({ selection: editor.view.state.selection })
  }, windowSize)

  useEffect(() => {
    if (!editorRef || !editor) return
  }, [editorRef, editor])

  useHotkeys(
    'ctrl+shift+Z',
    () => {
      console.log('ctrl+shift+Z')
      if (editor) {
        let x = redo(editor.view)
        console.log('x: ', x)
      }
    },
    [editor],
  )

  React.useEffect(() => {
    if (!editor) {
      return
    }

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

      codemirror.history

      // Keep our state in sync with the editor's state. This listener is called
      // after view.setState and on any future updates
      const updateListener = codemirror.view.EditorView.updateListener.of(
        (update: ViewUpdate) => {
          if (update.docChanged) {
            onUpdate(update.state.doc.toString())

            const { headings } = getDocumentHighlights(update.state)
            if (headings.length) onHighlightsChange(headings)
          }
        },
      )

      const initialState = codemirror.state.EditorState.create({
        doc: document,
        extensions: [extensions, updateListener],
      })

      editor.view.setState(initialState)

      const { headings } = getDocumentHighlights(editor.view.state)
      if (headings.length) onHighlightsChange(headings)
    })

    return () => {
      didCancel = true
    }
  }, [editor])

  useImperativeHandle(ref, () => ({
    scroll(to: number) {
      editor.view.scrollPosIntoView(to)
    },
  }))

  return (
    <EditorWrapper>
      <div className="codemirror-container" ref={editorRef} />
    </EditorWrapper>
  )
}

export default forwardRef(Editor)
