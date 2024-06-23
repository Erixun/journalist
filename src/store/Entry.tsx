
export type BaseEntry = {
  text: string;
};

export type Entry = BaseEntry & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};
