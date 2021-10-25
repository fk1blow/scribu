refactoring for workspaces
--------------------------

# file/document opening

* drag n drop
* file open(ctrl+o)

should be considered simply as `document opening`, in both tauri and web apis

### impl

this just modifies the current file path of the current workspace, pointing
to a new document(file)

# file save as/ file new

this needs to create a new file and then change the current file path of
the current workspace, pointing to a new document

### impl

creates a new file `named as` and then modifies the current file path of the
current workspace, pointing to a new document;
**the document contents will be the same as the current file's**

file new is the same, passing a new name and an empty content

### unify tauri://file/new and tauri://file/save-as

under the file/new tauri command, move the `filepath_available` from inside the
tauri-adapter, directly inside the use-tauri-command hook, then reuse the
same `ScribuApi` interface to resolve both commands

--------------------------------------------------------------------------------

when i want to rename a document...

or just interpret the commands coming from tauri?


**save as** should be handled by the **document slice**

**new file** is the same as **save as**, tho it has empty doc contents

- file drop (opens in new tab)
- file open dialog (opens in new tab)
- new file (opens in new tab)
- save as (remains in the same tab)

what do these "operations" have in common?
these are file operations, or documents operations

## file drop

1. tauri file drop command intercepted
2. document slice creates a workspace update; adds another entry to `openedDocuments`
3. workspace persists the change and refreshes the current workspace
4. the Tabs(w/e) pick up and opens another tab(what order?)
