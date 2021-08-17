// export function useElectron(): Readonly<ElectronApi> {
export function useElectron(): Readonly<any> {
  return (<any>window).electron;
}
