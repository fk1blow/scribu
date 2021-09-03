import { TauriAdapter } from "./adapters/tauri-adapter"
import { HttpAdapter } from "./adapters/http-adapter"
import { ScribuApi } from "./types/ScribuApi"

// TODO is there a better way?
const adapterForEnvironment = () =>
  "__TAURI__" in window ? TauriAdapter : HttpAdapter

export enum ScribuApiAdapter {
  Tauri = "tauri",
  Http = "http",
}

export const useScribuApi = (type?: ScribuApiAdapter): ScribuApi => {
  switch (type) {
    case ScribuApiAdapter.Http:
      return HttpAdapter
    case ScribuApiAdapter.Tauri:
      return TauriAdapter
    default:
      return adapterForEnvironment()
  }
}
