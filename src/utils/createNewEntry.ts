import { useEntries } from '@store'

export const createNewEntry = () => {
  useEntries.setState({ currentEntry: { text: '' } })
}
