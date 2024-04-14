import { executeQuery } from '@utils'
import { useEntries } from '@store'
import { v4 as uuidv4 } from 'uuid'

export const submitEntry = () => {
  const { currentEntry, addEntry, updateEntry, setCurrentEntry } =
    useEntries.getState()
  if (!currentEntry) throw new Error('Entry is undefined')
  const entryText = currentEntry?.text.trim()
  if (entryText) {
    const entryToSet = {
      ...currentEntry,
      text: entryText,
    }

    const isFreshEntry = !currentEntry.id
    if (isFreshEntry) {
      entryToSet.id = uuidv4()
      entryToSet.createdAt = new Date()
      executeQuery(
        'INSERT INTO entries (id, text, createdAt) VALUES (?, ?, ?)',
        [entryToSet.id, entryToSet.text, entryToSet.createdAt.toISOString()]
      )
      addEntry(entryToSet)
    } else {
      entryToSet.updatedAt = new Date()
      executeQuery('UPDATE entries SET text = ?, updatedAt = ? WHERE id = ?', [
        entryToSet.text,
        entryToSet.updatedAt?.toISOString(),
        entryToSet.id!,
      ])
      updateEntry(entryToSet)
    }
    setCurrentEntry(entryToSet)
  }
}
