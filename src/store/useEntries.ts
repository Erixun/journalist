import { EntryStore } from './EntryStore'
import { create } from 'zustand'

export const useEntries = create<EntryStore>((set, get) => ({
  currentEntry: undefined,
  entries: [],
  addEntry: (entry) => set({ entries: [...get().entries, entry] }),
  getEntry: (id) => get().entries.find((entry) => entry.id === id),
  updateEntry: (entry) =>
    set({
      entries: get().entries.map((e) => (e.id === entry.id ? entry : e)),
    }),
  deleteEntry: (id) =>
    set({ entries: get().entries.filter((e) => e.id !== id) }),
  setEntries: (entries) => set({ entries }),
  setCurrentEntry: (currentEntry) => set({ currentEntry }),
  clearEntries: () => set({ entries: [] }),
}))
