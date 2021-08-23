import { ElectronApi } from "../../main/ElectronApi";

export function useElectron(): Readonly<ElectronApi> {
  return (<any>window).electron
}
