export type Entry = {
  id?: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type EntryDb = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
};
