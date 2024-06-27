import { CLEAR, COLOR_MODE, DRAWER, NEW_ENTRY, SAVE, SEARCH } from './constant'

const VALID_KEYS = [DRAWER, SEARCH, NEW_ENTRY, COLOR_MODE, SAVE, CLEAR] as const
export type ValidKey = (typeof VALID_KEYS)[number]
export const VALID_KEY_SET = new Set<string>(VALID_KEYS)

export const isValid = (key: string): key is ValidKey => VALID_KEY_SET.has(key)
