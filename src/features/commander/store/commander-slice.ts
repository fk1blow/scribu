import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useScribuApi } from '../../../lib/scribu-client-api'
import { RootState } from '../../../store'

export type RunCommandsMap = 'openFile'
type RunCommandFn = () => Promise<any>

const initialState = {}

export const openFile = async () => {
 // const [fileHandle] = await window.showOpenFilePicker({ multiple: false })
//	console.log('fileHandle: ', fileHandle)
//	const file = await fileHandle.getFile()
//	console.log('file: ', file)

  return Promise.resolve({})
}

export const commandsMap: Record<RunCommandsMap, RunCommandFn> = {
  openFile: openFile,
}

export const runCommand = createAsyncThunk<any, { name: RunCommandsMap }>(
  'commander/runAsCommander',
  async (command) => {
    console.log('command: ', command)
    commandsMap[command.name]?.()

    return Promise.resolve({})
  },
)

export const commanderSlice = createSlice({
  name: 'commander',

  initialState,

  reducers: {
    // getWorkspace: (state, action: PayloadAction<Workspace>) => {
    //   state.currentFile = action.payload.currentFile
    // },
  },

  extraReducers: (builder) => {
    // builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
    //   //
    // })
  },
})

export default commanderSlice.reducer
