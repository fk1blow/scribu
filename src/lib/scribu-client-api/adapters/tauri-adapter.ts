import { invoke } from "@tauri-apps/api"
import { ScribuApi, Workspace } from "../types/ScribuApi"

export const TauriAdapter: ScribuApi = {
  prepareWorkspace: () => invoke<Workspace>("prepare_workspace"),
}
