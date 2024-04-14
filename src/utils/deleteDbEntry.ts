import { executeQuery } from '@utils'
import { useEntries } from '@store'

export function deleteDbEntry(id: string) {
  executeQuery('DELETE FROM entries WHERE id = ?', [id]).then(() => {
    useEntries.getState().deleteEntry(id)
  })
}
