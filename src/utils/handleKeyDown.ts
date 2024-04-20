import { MutableRefObject, RefObject } from 'react'
import { clearEntry, createNewEntry, submitEntry } from '@utils'

export const handleKeyDown =
  (
    drawerBtnRef: MutableRefObject<HTMLButtonElement | null>,
    themeBtnRef: MutableRefObject<HTMLButtonElement | null>,
    searchRef: RefObject<HTMLInputElement>,
    onOpen: () => void
  ) =>
  ({ ctrlKey, key: secondKey }: KeyboardEvent) => {
    if (!ctrlKey) return

    switch (secondKey) {
      case 'd':
        drawerBtnRef.current?.click()
        break
      case 'f':
        onOpen()
        setTimeout(() => searchRef.current?.focus(), 100)
        break
      case 'n':
        createNewEntry()
        break
      case 't':
        themeBtnRef.current?.click()
        break
      case 's':
        submitEntry()
        break
      case 'x':
        clearEntry()
    }
  }
