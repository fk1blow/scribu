export const longText = `# restructure stores and multi window

one thing that shouldn't be done is to store the document text in redux, b/c it is redundant - __codemirorr editor's view already does it__!

1. redux persist document length
2. workspace cursor position
3. workspace window position & size

## how to do it?

working with the current file shouldn't be done through the workspace-slice alone

## can i split the workspace?

can i split the workspace into many slices, where each slice does its own thing?

also, need to prepare for multiple workspaces(new windows and such)

--------------------

### roles (within an workspace)

* document
* currentFile
* window

the document handles things related to text, cursor/selection, its length

currentFile deals with file handling(open, save, write)

window is about app window's size, position, etc

### responsabilities list

- document text(or length)
- document cursor/selection ranges
- dealing with file persistance
- window size and position
- handling the workspace for the current window
- workspace id/name for distinguishing between (multiple) windows/tabs

### document/file related stuff

(actually, the *document* abstraction should refer to the )

this handles workspace's file handling operation(read/write, save as, open, dnd, etc)

it also taps into the more generic/top workspace slice, and extracts stuff from it

### window position and size

handles the size of the window, the position, persisting these into the workspace

### collaborations

inside the sub slices, when you need to update the workspace, delegate these tasks to
the workspace-slice.

^              ^
|   __THIS__   |
|              |

`
