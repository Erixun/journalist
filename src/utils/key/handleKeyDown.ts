import { MutableRefObject, RefObject } from 'react'
import { clearEntry, createNewEntry, submitEntry } from '@utils'
import * as key from './constant'
import { isValid } from './isValid'

export const handleKeyDown =
  (
    drawerBtnRef: MutableRefObject<HTMLButtonElement | null>,
    themeBtnRef: MutableRefObject<HTMLButtonElement | null>,
    searchRef: RefObject<HTMLInputElement>,
    onOpen: () => void
  ) =>
  (event: KeyboardEvent) => {
    const { ctrlKey, key: secondKey } = event
    if (!ctrlKey) return
    if (isValid(secondKey)) {
      event.preventDefault()

      switch (secondKey) {
        case key.DRAWER:
          drawerBtnRef.current?.click()
          break
        case key.SEARCH:
          onOpen()
          setTimeout(() => searchRef.current?.focus(), 100)
          break
        case key.NEW_ENTRY:
          createNewEntry()
          break
        case key.COLOR_MODE:
          themeBtnRef.current?.click()
          break
        case key.SAVE:
          submitEntry()
          break
        case key.CLEAR:
          clearEntry()
      }
    }
  }
