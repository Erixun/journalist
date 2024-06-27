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
  useColorModeValue,
} from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import { styleBtnClearEntries, styleBtnDeleteEntry } from './styles'
import { useEntries } from '@store'
import { deleteDbEntry } from '@utils'
import { Tooltip } from '@components'
import { set } from 'idb-keyval'
import { StoredEntry } from '@/utils/getEntries'

export const AppDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
  searchRef,
}: AppDrawerProps) => {
  const [search, setSearch] = useState<string>('')
  const { entries, setCurrentEntry, currentEntry, setEntries, clearEntries } =
    useEntries()

  const [hasSearchTooltipDisabled, setHasSearchTooltipDisabled] = useState(true)

  const handleDelete = (entryId?: string) => {
    if (!entryId) return console.error('entryId is not defined')

    const filteredEntries = entries.filter((entry) => entry.id !== entryId)

    set('entries', filteredEntries)
    setEntries(filteredEntries)

    deleteDbEntry(entryId)
    if (currentEntry?.id === entryId) {
      setCurrentEntry({ text: '' })
    }
  }

  const entryHoverBg = useColorModeValue('gray.200', 'gray.600')

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
      <DrawerContent borderRight="1px solid" maxW={'min(70vw, 300px)'}>
        <DrawerCloseButton size="sm" mt={1} zIndex={123} />
        <DrawerHeader
          fontSize={'lg'}
          paddingBlockStart={'8px'}
          paddingBlockEnd={0}
          paddingInline={'0 5px'}
        >
          <Tooltip label="(Ctrl + E)" placement="bottom-start">
            <Button
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
          <Stack as="ul" gap={1}>
            {entries
              .sort(byMostRecent)
              .filter(byQuery(search))
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
                    display={'block'}
                    textAlign={'left'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    px={4}
                    py={2}
                    paddingInlineEnd={'30px'}
                    m={0}
                    mx={-1}
                    _hover={{
                      bg: entryHoverBg,
                      cursor: 'pointer',
                      zIndex: 1,
                      border: 'none',
                    }}
                    _focusVisible={{
                      bg: entryHoverBg,
                      cursor: 'pointer',
                      zIndex: 1,
                    }}
                    variant={'ghost'}
                    onClick={() => {
                      setCurrentEntry(entry)
                      onClose()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Delete') {
                        handleDelete(entry.id)
                      }
                    }}
                  >
                    {entry.text
                      .substring(0, 55)
                      .concat(entry.text.length > 55 ? '...' : '')}
                  </Button>
                  <IconButton
                    {...styleBtnDeleteEntry}
                    aria-label="Delete entry"
                    icon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(entry.id)
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
              clearEntries()
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



export const byMostRecent = (a: StoredEntry, b: StoredEntry) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

export const byQuery = (search: string) => (entry: StoredEntry) =>
  entry.text.toLowerCase().includes(search.toLowerCase())


//TODO: export const toEntryCard = (entry: StoredEntry, index: number) => 
  

type AppDrawerProps = {
  isOpen: boolean
  onClose: () => void
  finalFocusRef: RefObject<HTMLTextAreaElement>
  searchRef: RefObject<HTMLInputElement>
}
