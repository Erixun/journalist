import { Entry } from './Entry';


export type EntryStore = {
  currentEntry?: Entry;
  entries: Entry[];
  addEntry: (entry: Entry) => void;
  getEntry: (id: string) => Entry | undefined;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => void;
  setEntries: (entries: Entry[]) => void;
  setCurrentEntry: (currentEntry: Entry | undefined) => void;
  clearEntries: () => void;
};
