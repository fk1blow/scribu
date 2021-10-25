about what
----------

from `tauri commands`, i don't really want to dispatch actions directly to the
workspace, b/c it's not the role of the workspace to handle such things.

define a distinct store slice that handles tauri commands, then dispatch actions
to the workspace(mainly the need to update the current Workspace)

## distinct store or just...

## collaboration

instead of delegating such tasks to a store(any store), i could have a hook for
different stuff: one for tauri commands - when inside a tauri window, one for
window commands - when not embedded inside a tauri window
