import { useEntries } from '@store'
import { v4 as uuidv4 } from 'uuid'
import { StoredEntry } from './getEntries'
import { FormEvent, FormEventHandler } from 'react'

export const submitEntry: FormEventHandler = (ev: FormEvent) => {
  ev.preventDefault()
  const {
    currentEntry: entry,
    addEntry,
    updateEntry,
    setCurrentEntry,
  } = useEntries.getState()
  if (!entry) throw new Error('Entry is undefined')
  const entryText = entry.text?.trim()
  if (!entryText) return setCurrentEntry({ text: '' })

  if (isFresh(entry)) {
    addEntry({
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      text: entryText,
    })
  } else if (isStored(entry)) {
    updateEntry({
      ...entry,
      updatedAt: new Date().toISOString(),
      text: entryText,
    })
  }
}

const isFresh = (entry: Partial<StoredEntry>): entry is FreshEntry =>
  entry.id === undefined && entry.createdAt === undefined

const isStored = (entry: Partial<StoredEntry>): entry is StoredEntry =>
  entry.id !== undefined && entry.createdAt !== undefined

type FreshEntry = {
  text: string
}
