
import { useEntries } from '@store'
import { v4 as uuidv4 } from 'uuid'

export const submitEntry = () => {
  const { currentEntry, addEntry, updateEntry, setCurrentEntry } =
    useEntries.getState()
  if (!currentEntry) throw new Error('Entry is undefined')
  const entryText = currentEntry.text?.trim()
  if (entryText) {
    const entryToSet = {
      ...currentEntry,
      text: entryText,
    }

    const isFreshEntry = !currentEntry.id
    if (isFreshEntry) {
      entryToSet.id = uuidv4()
      entryToSet.createdAt = new Date()
      addEntry(entryToSet)
    } else {
      entryToSet.updatedAt = new Date()
      updateEntry(entryToSet)
    }
    setCurrentEntry(entryToSet)
  }
}
