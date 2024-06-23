import { create } from 'zustand'
import { StoredEntry } from '../utils/getEntries'
import { set as idbSet } from 'idb-keyval'

export const useEntries = create<EntryStore>((set, get) => ({
  currentEntry: undefined,
  entries: [],
  addEntry: (entry) => {
    const appendedEntries = [...get().entries, entry]
    set({ entries: appendedEntries })
    idbSet('entries', appendedEntries)
  },
  getEntry: (id) => get().entries.find((entry) => entry.id === id),
  updateEntry: (entry) => {
    const updatedEntries = get().entries.map((e) =>
      e.id === entry.id ? entry : e
    )
    set({
      entries: updatedEntries,
    })
    idbSet('entries', updatedEntries)
  },
  deleteEntry: (id) =>
  {
    const filteredEntries = get().entries.filter((e) => e.id !== id)
    set({ entries: filteredEntries })
    idbSet('entries', filteredEntries)
  },
  setEntries: (entries) => set({ entries }),
  setCurrentEntry: (currentEntry) => set({ currentEntry }),
  clearEntries: () => {
    set({ entries: [] })
    idbSet('entries', [])
  },
}))

export type EntryStore = {
  currentEntry?: Partial<StoredEntry>
  entries: StoredEntry[]
  addEntry: (entry: StoredEntry) => void
  getEntry: (id: string) => StoredEntry | undefined
  updateEntry: (entry: StoredEntry) => void
  deleteEntry: (id: string) => void
  setEntries: (entries: StoredEntry[]) => void
  setCurrentEntry: (currentEntry: Partial<StoredEntry> | undefined) => void
  clearEntries: () => void
}
