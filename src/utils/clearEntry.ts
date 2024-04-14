import { useEntries } from '@store';

export const clearEntry = () => {
  const { currentEntry, setCurrentEntry } = useEntries.getState();
  setCurrentEntry({ ...currentEntry, text: '' });
};
