import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import { styleBtnClearEntries, styleBtnDeleteEntry } from './styles'
import { useEntries } from '@store'
import { clearDbEntries, deleteDbEntry } from '@utils'
import { Tooltip } from '@components'

export const AppDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
  searchRef,
}: AppDrawerProps) => {
  const [search, setSearch] = useState<string>('')
  const { entries, setCurrentEntry, currentEntry } = useEntries()

  const [hasSearchTooltipDisabled, setHasSearchTooltipDisabled] = useState(true)

  return (
    <Drawer
      variant="secondary"
      size={'xs'}
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent borderRight="1px solid" maxW={200}>
        <DrawerCloseButton size="sm" mt={2} zIndex={123} />
        <DrawerHeader
          fontSize={'lg'}
          paddingBlockStart={'12px'}
          paddingBlockEnd={0}
          paddingInline={'0 5px'}
        >
          <Tooltip label="(Ctrl + N)" placement="bottom-start">
            <Button
              color={'black'}
              opacity={0.7}
              size={'sm'}
              variant={'ghost'}
              outline={'none'}
              boxShadow={'none'}
              transition={'all 0.3s'}
              _hover={{
                bg: 'transparent',
                opacity: 1,
                transform: 'translateX(2px)',
              }}
              _focusVisible={{
                boxShadow: 'none',
                outline: '2px solid',
              }}
              justifyContent={'flex-start'}
              gap={1}
              px={3}
              paddingInlineEnd={10}
              rounded={0}
              border={'none'}
              leftIcon={<AddIcon />}
              onClick={() => {
                setCurrentEntry({ text: '' })
                onClose()
              }}
            >
              New Entry
            </Button>
          </Tooltip>
        </DrawerHeader>

        <DrawerBody p={0} overflow={'hidden'}>
          <Tooltip
            label="(Ctrl + F)"
            placement="bottom"
            isDisabled={hasSearchTooltipDisabled}
          >
            <Input
              placeholder="Search entries..."
              ref={searchRef}
              id="search"
              type="search"
              border={'none'}
              _focus={{ outline: 'none', bg: 'blackAlpha.300' }}
              _focusVisible={{ outline: 'none' }}
              rounded={0}
              value={search}
              onFocus={() => {
                setHasSearchTooltipDisabled(true)
              }}
              onBlur={() => {
                setHasSearchTooltipDisabled(false)
              }}
              onChange={({ target }) => {
                setSearch(target.value)
              }}
            />
          </Tooltip>
          <Stack as="ul" gap={0}>
            {entries
              .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
              .filter((entry) =>
                entry.text.toLowerCase().includes(search.toLowerCase())
              )
              .map((entry, index) => (
                <Card
                  position={'relative'}
                  as="li"
                  variant={'unstyled'}
                  fontSize={'sm'}
                  key={index}
                  flexDir={'column'}
                >
                  <Button
                    justifyContent={'flex-start'}
                    borderRadius={'none'}
                    outlineOffset={0}
                    border={'none'}
                    px={4}
                    py={2}
                    m={0}
                    mx={-1}
                    _hover={{
                      bg: 'gray.200',
                      cursor: 'pointer',
                      zIndex: 1,
                      border: 'none',
                    }}
                    _focusVisible={{
                      bg: 'gray.200',
                      cursor: 'pointer',
                      zIndex: 1,
                    }}
                    variant={'ghost'}
                    onClick={() => {
                      setCurrentEntry(entry)
                      onClose()
                    }}
                  >
                    {entry.text
                      .substring(0, 55)
                      .concat(entry.text.length > 55 ? '...' : '')}
                  </Button>
                  <IconButton
                    {...styleBtnDeleteEntry}
                    // bg={'transparent'}
                    // zIndex={2}
                    // opacity={0.5}
                    // border={'none'}
                    // _hover={{ opacity: 1, transform: 'translateX(-2px)' }}
                    // _focusVisible={{
                    //   opacity: 1,
                    //   transform: 'translateX(-2px)',
                    // }}
                    // size={'sm'}
                    // pos={'absolute'}
                    // right={1}
                    // top={1}
                    aria-label="Delete entry"
                    icon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (entry.id) deleteDbEntry(entry.id)
                      if (currentEntry?.id === entry.id) {
                        setCurrentEntry({ text: '' })
                      }
                    }}
                  />
                </Card>
              ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter
          justifyContent={'center'}
          p={0}
          overflowX={'hidden'}
          overflowY={'visible'}
        >
          <Button
            {...styleBtnClearEntries}
            leftIcon={<DeleteIcon />}
            onClick={() => {
              clearDbEntries()
              if (currentEntry?.id) setCurrentEntry({ text: '' })
            }}
          >
            Clear entries
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

type AppDrawerProps = {
  isOpen: boolean
  onClose: () => void
  finalFocusRef: RefObject<HTMLTextAreaElement>
  searchRef: RefObject<HTMLInputElement>
}
