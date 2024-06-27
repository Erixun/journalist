import { create } from 'zustand'
import { StoredEntry } from '../utils/getEntries'
import { set as idbSet } from 'idb-keyval'

export const useEntries = create<EntryStore>((set, get) => ({
  currentEntry: undefined,
  entries: [],
  addEntry: async (entry) => {
    const appendedEntries = [...get().entries, entry]
    await idbSet('entries', appendedEntries)
    set({ entries: appendedEntries })
    set({currentEntry: entry})
  },
  getEntry: (id) => get().entries.find((entry) => entry.id === id),
  updateEntry: async (entry) => {
    const updatedEntries = get().entries.map((e) =>
      e.id === entry.id ? entry : e
    )
    await idbSet('entries', updatedEntries)
    set({
      entries: updatedEntries,
    })
    set({currentEntry: entry})
  },
  deleteEntry: (id) => {
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

type EntryStore = {
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
