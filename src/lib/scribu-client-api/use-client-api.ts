import { HttpAdapter } from './adapters/http-adapter'
import { IndexedDbAdapter } from './adapters/indexeddb-adapter'
import { ScribuApi } from './types/ScribuApi'

export enum ScribuApiAdapter {
  Http = 'http',
  IndexedDb = 'IndexedDb',
}

export const useScribuApi = (type?: ScribuApiAdapter): ScribuApi => {
  switch (type) {
    case ScribuApiAdapter.Http:
      return HttpAdapter
    default:
      return IndexedDbAdapter
  }
}
