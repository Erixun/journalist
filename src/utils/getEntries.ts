import { get } from 'idb-keyval';


export const getEntries = async () => {
  const results = await get<StoredEntry[]>('entries') || [];

  console.log('results', results)
  return results.map((entry: StoredEntry) => ({
    id: entry.id,
    text: entry.text,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt ? entry.updatedAt : undefined,
  }));
};

export type StoredEntry = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
};