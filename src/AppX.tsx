import {
  AddIcon,
  ArrowForwardIcon,
  DeleteIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons'
import './App.css'
import {
  Heading,
  Textarea,
  Flex,
  IconButton,
  Box,
  Container,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  ChakraProvider,
  Button,
  Card,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useEntries } from './store/entries'
import { AppHeader } from './app/AppHeader'
import { AppFooter } from './app/AppFooter'
import { adjustHeight } from './utils/adjustHeight'
import { v4 as uuidv4 } from 'uuid'
import { set } from 'idb-keyval'
import { getEntries } from './utils/getEntries'

function App() {
  const {
    currentEntry,
    setCurrentEntry,
    addEntry,
    updateEntry,
    setEntries,
    entries,
  } = useEntries()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    getEntries().then(setEntries)
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current)
    }
  }, [currentEntry])

  return (
    <ChakraProvider>
      <AppHeader onOpen={onOpen} />
      <AppDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={textareaRef}
      />
      <Container
        as="main"
        maxW={'full'}
        paddingInline={3}
        flexGrow={1}
        centerContent
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Flex flexDir={'column'} gap={3} pb={'5dvw'} maxW={'full'}>
          <Heading as="h1">Journalist</Heading>
          <p>Write to learn and record</p>
          <Box
            border={'1px solid'}
            borderRadius={6}
            borderWidth={2}
            overflow={'hidden'}
          >
            <Textarea
              ref={textareaRef}
              placeholder="The day has been..."
              resize={'none'}
              overflow={'hidden'}
              borderWidth={3}
              size={'lg'}
              width={400}
              maxH={'60dvh'}
              borderColor="transparent"
              focusBorderColor="transparent"
              _hover={{ borderColor: 'transparent' }}
              value={currentEntry?.text}
              onChange={({ target }) => {
                setCurrentEntry({ ...currentEntry, text: target.value })
              }}
            />
            <Flex justifyContent={'flex-end'} height={10}>
              {currentEntry?.text && (
                <>
                  <IconButton
                    variant="ghost"
                    border={'none'}
                    color={'gray.500'}
                    _hover={{
                      bg: 'transparent',
                      transform: 'translateX(-2px)',
                    }}
                    _focus={{ outline: 'none' }}
                    _active={{ color: 'white', bg: 'black' }}
                    rounded={'none'}
                    icon={<SmallCloseIcon />}
                    aria-label={'Clear entry'}
                    onClick={() => {
                      setCurrentEntry({ ...currentEntry, text: '' })
                    }}
                  />
                  <IconButton
                    alignSelf={'end'}
                    variant="ghost"
                    border={'none'}
                    _hover={{
                      bg: 'transparent',
                      transform: 'translateX(-2px)',
                    }}
                    _focus={{
                      outline: 'none',
                      bg: 'transparent',
                      transform: 'scale(1.2)',
                    }}
                    _active={{
                      transform: 'scale(1.2) translate(-2px)',
                      color: 'white',
                      bg: 'black',
                    }}
                    rounded={'none'}
                    borderTopStartRadius={6}
                    transition={'all 0.1s'}
                    icon={<ArrowForwardIcon />}
                    aria-label={'Submit'}
                    onClick={async () => {
                      console.log(currentEntry)
                      if (!currentEntry) throw new Error('Entry is undefined')
                      const entryText = currentEntry.text?.trim()
                      if (entryText) {

                        const isFreshEntry = !currentEntry.id
                        if (isFreshEntry) {
                          const entryToSet = {
                            id: uuidv4(),
                            text: entryText,
                            createdAt: new Date().toISOString(),
                          }

                          addEntry(entryToSet)
                          setCurrentEntry(entryToSet)
                          set('entries', [...entries, entryToSet])
                        } else {
                          const entryToSet = {
                            id: currentEntry.id!,
                            text: entryText,
                            createdAt: currentEntry.createdAt!,
                            updatedAt: new Date().toISOString(),
                          }
                          set(
                            'entries',
                            entries.map((entry) => {
                              if (entry.id === entryToSet.id) return entryToSet
                              else return entry
                            })
                          )
                          updateEntry(entryToSet)
                          setCurrentEntry(entryToSet)
                        }
                      }
                    }}
                  />
                </>
              )}
            </Flex>
          </Box>
          {/* TODO: EntryNote */}
          <Flex mt={-1} justifyContent={'space-between'} px={1}>
            <Text
              visibility={currentEntry?.createdAt ? 'visible' : 'hidden'}
              fontSize={'xs'}
              color="gray.500"
            >
              Recorded{' '}
              {new Date(currentEntry?.createdAt ?? '')?.toLocaleString(undefined, {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                day: 'numeric',
                month: 'numeric',
              })}
            </Text>
            <Text
              visibility={currentEntry?.updatedAt ? 'visible' : 'hidden'}
              fontSize={'xs'}
              color="gray.500"
            >
              Updated{' '}
              {new Date(currentEntry?.updatedAt ?? '')?.toLocaleString(undefined, {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                day: 'numeric',
                month: 'numeric',
              })}
            </Text>
          </Flex>
        </Flex>
      </Container>
      <AppFooter />
    </ChakraProvider>
  )
}

export default App

export const AppDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
}: {
  isOpen: boolean
  onClose: () => void
  finalFocusRef: RefObject<HTMLTextAreaElement>
}) => {
  const [search, setSearch] = useState<string>('')
  const { entries, clearEntries, setCurrentEntry, currentEntry, deleteEntry } =
    useEntries()
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
          <Button
            color={'black'}
            opacity={0.7}
            size={'sm'}
            variant={'ghost'}
            _hover={{
              bg: 'transparent',
              opacity: 1,
              transform: 'translateX(2px)',
            }}
            transition={'all 0.2s'}
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
        </DrawerHeader>

        <DrawerBody p={0}>
          <Input
            placeholder="Search entries..."
            type="search"
            border={'none'}
            _focus={{ outline: 'none', bg: 'blackAlpha.300' }}
            _focusVisible={{ outline: 'none' }}
            rounded={0}
            value={search}
            onChange={({ target }) => {
              setSearch(target.value)
            }}
          />
          <Stack as="ul" gap={0}>
            {entries
              .sort((a, b) => new Date(b.createdAt)?.getTime() - new Date(a.createdAt)?.getTime())
              .filter((entry) =>
                entry.text.toLowerCase().includes(search.toLowerCase())
              )
              .map((entry, index) => (
                <Card
                  position={'relative'}
                  tabIndex={0}
                  as="li"
                  variant={'unstyled'}
                  fontSize={'sm'}
                  key={index}
                  px={4}
                  py={2}
                  m={0}
                  flexDir={'column'}
                  _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentEntry(entry)
                    onClose()
                  }}
                >
                  {entry.text
                    .substring(0, 55)
                    .concat(entry.text.length > 55 ? '...' : '')}
                  <IconButton
                    bg={'transparent'}
                    opacity={0.5}
                    border={'none'}
                    _hover={{ opacity: 1, transform: 'translateX(-2px)' }}
                    size={'sm'}
                    pos={'absolute'}
                    right={1}
                    top={1}
                    icon={<DeleteIcon />}
                    aria-label="Delete entry"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (entry.id) deleteEntry(entry.id)
                      if (currentEntry?.id === entry.id) {
                        setCurrentEntry({ text: '' })
                      }
                    }}
                  />
                </Card>
              ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter justifyContent={'center'} p={0}>
          <Button
            color={'black'}
            opacity={0.7}
            justifyContent={'flex-start'}
            width={'full'}
            variant="ghost"
            rounded={0}
            border={'none'}
            _hover={{
              bg: 'transparent',
              opacity: 1,
              transform: 'translateX(2px)',
            }}
            _focus={{ outline: 'none' }}
            leftIcon={<DeleteIcon />}
            px={3}
            pb={2}
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
