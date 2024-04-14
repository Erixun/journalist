import { styleFocus } from './styleFocus'

export const styleBtnClearEntries = {
  opacity: 0.7,
  justifyContent: 'flex-start',
  width: 'full',
  variant: 'ghost',
  rounded: 0,
  border: 'none',
  outlineOffset: 0,
  transition: 'all 0.2s',
  _hover: {
    opacity: 1,
    paddingInlineStart: 3.5,
  },
  ...styleFocus,
}
