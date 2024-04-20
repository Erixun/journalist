import { Container, Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon, TimeIcon } from '@chakra-ui/icons'
import { Tooltip } from '@components'
import { RefObject } from 'react'

export const AppHeader = ({
  isOpen,
  onOpen,
  onClose,
  drawerBtnRef,
  themeBtnRef,
}: AppHeaderProps) => {
  const toggleDrawer = () => {
    if (isOpen) onClose()
    else onOpen()
  }

  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <Flex as="header" justifyContent={'center'}>
      <Container maxW="full" textAlign={'right'} padding={1}>
        <Tooltip label="View history (Ctrl + D)">
          <IconButton
            alignSelf={'start'}
            aria-label={'Toggle dark mode'}
            icon={<TimeIcon />}
            onClick={toggleDrawer}
            ref={drawerBtnRef}
            variant={'ghost'}
          />
        </Tooltip>
        <Tooltip label="Toggle theme (Ctrl + T)">
          <IconButton
            aria-label={'Toggle dark mode'}
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant={'ghost'}
            ref={themeBtnRef}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 't') {
                toggleColorMode()
              }
            }}
          />
        </Tooltip>
      </Container>
    </Flex>
  )
}

type AppHeaderProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  drawerBtnRef: RefObject<HTMLButtonElement>
  themeBtnRef: RefObject<HTMLButtonElement>
}
