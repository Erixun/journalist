import { executeQuery } from './executeQuery'
import { useEntries } from '@store'

export function clearDbEntries() {
  executeQuery('DELETE FROM entries').then(() => {
    useEntries.getState().clearEntries()
  })
}
