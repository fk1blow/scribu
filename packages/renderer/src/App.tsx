import * as React from "react";
import useCodemirror, { getTheme } from "./useCodemirror";
import { languages } from "./languages";
import { EditorState } from "@codemirror/state";

function Editor() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const themeRef = React.useRef(theme);

  React.useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const [language, setLanguage] = React.useState(() => languages[0]);

  const [editor, editorRef] = useCodemirror();

  const fileStateMapRef = React.useRef<Record<string, EditorState>>({});

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setTheme(getTheme(editor.codemirror, theme));
  }, [editor, theme]);

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    const state = fileStateMapRef.current[language.filename];

    const theme = getTheme(editor.codemirror, themeRef.current);

    if (state) {
      // We've loaded this file before

      editor.view.setState(state);

      // TODO: only do this if the state's theme doesn't match the current one
      editor.setTheme(theme);

      return;
    }

    // Create the editor state object for this file

    let didCancel = false;

    editor
      .loadExentions({ filename: language.filename, theme })
      .then((extensions) => {
        if (didCancel) {
          return;
        }

        const { codemirror } = editor;

        // Keep our state in sync with the editor's state. This listener is called
        // after view.setState and on any future updates
        const updateListener = codemirror.view.EditorView.updateListener.of(
          (update) => {
            fileStateMapRef.current[language.filename] = update.state;
          }
        );

        const state = codemirror.state.EditorState.create({
          doc: language.text,
          extensions: [extensions, updateListener],
        });

        editor.view.setState(state);
      });

    return () => {
      didCancel = true;
    };
  }, [editor, language]);

  return (
    <div>
      <header>
        <select
          value={language.name}
          onChange={(e) => {
            const next = languages.find(
              (l) => l.name === e.currentTarget.value
            );
            if (next) {
              setLanguage(next);
            }
          }}
        >
          {languages.map((l) => (
            <option key={l.name} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
        <label>
          Dark
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) =>
              setTheme(e.currentTarget.checked ? "dark" : "light")
            }
          />
        </label>
      </header>
      <div className="codemirror-container" ref={editorRef} />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Editor />
    </div>
  );
}
