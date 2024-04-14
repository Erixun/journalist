import { Container, Flex, IconButton } from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import { Tooltip } from '@components'

export const AppHeader = ({
  isOpen,
  onOpen,
  onClose,
  drawerBtnRef,
}: AppHeaderProps) => {
  const toggleDrawer = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }
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
      </Container>
    </Flex>
  )
}

type AppHeaderProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  drawerBtnRef: React.RefObject<HTMLButtonElement>
}
