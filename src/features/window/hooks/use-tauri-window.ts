import { appWindow, getCurrent } from '@tauri-apps/api/window'

const useTauriWindow = () => {
  const workspaceId = getCurrent().label
  return [workspaceId]
}

export default useTauriWindow
