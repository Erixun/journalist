import { Container, Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon, TimeIcon } from '@chakra-ui/icons'
import { Tooltip } from '@components'
import { MouseEventHandler, RefObject } from 'react'

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

  const handleToggleTheme: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    console.log(event)
    const isMouseClick = event.type === 'click' && event.detail === 1
    if (isMouseClick) themeBtnRef.current?.blur()
    toggleColorMode()
  }
  return (
    <Flex as="header" justifyContent={'center'}>
      <Container maxW="full" textAlign={'right'} padding={1}>
        <Tooltip label="View history (Ctrl + D)">
          <IconButton
            size={'lg'}
            alignSelf={'start'}
            aria-label={'Toggle dark mode'}
            icon={<TimeIcon />}
            onClick={toggleDrawer}
            ref={drawerBtnRef}
            variant={'ghost'}
          />
        </Tooltip>
        <Tooltip label="Toggle theme (Ctrl + M)">
          <IconButton
            size={'lg'}
            aria-label={'Toggle dark mode'}
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={handleToggleTheme}
            variant={'ghost'}
            ref={themeBtnRef}
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
