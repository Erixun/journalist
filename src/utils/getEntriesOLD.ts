import { EntryDb } from '@store'
import { executeQuery } from '@utils'

export async function getEntries() {
  const results = await executeQuery<EntryDb[]>('SELECT * FROM entries')
  return results.map((entry) => ({
    id: entry.id,
    text: entry.text,
    createdAt: new Date(entry.createdAt),
    updatedAt: entry.updatedAt ? new Date(entry.updatedAt) : undefined,
  }))
}
