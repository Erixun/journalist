import './App.css'
import { ArrowForwardIcon, SmallCloseIcon } from '@chakra-ui/icons'
import {
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  Flex,
  Heading,
  IconButton,
  Textarea,
  ThemeConfig,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useEntries } from '@store'
import { AppDrawer, AppFooter, AppHeader } from '@app'
import {
  adjustHeight,
  clearEntry,
  getEntries,
  handleKeyDown,
  submitEntry,
} from '@utils'
import { EntryNote, Tooltip } from '@components'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export function App() {
  const { currentEntry, setCurrentEntry, setEntries } = useEntries()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerBtnRef = useRef<HTMLButtonElement | null>(null)
  const themeBtnRef = useRef<HTMLButtonElement | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const keyDownHandler = handleKeyDown(
    drawerBtnRef,
    themeBtnRef,
    searchRef,
    onOpen
  )

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    getEntries().then(setEntries)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current)
    }
  }, [currentEntry])

  return (
    <ChakraProvider theme={theme}>
      <AppHeader
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        drawerBtnRef={drawerBtnRef}
        themeBtnRef={themeBtnRef}
      />
      <AppDrawer
        searchRef={searchRef}
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
          <em style={{opacity: 0.8, marginTop: -8, marginBottom: 5}}>Record, learn and inform</em>
          <Box
            as={'form'}
            onSubmit={submitEntry}
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
              width={'clamp(300px, 50vw, 500px)'}
              minH={'15vh'}
              maxH={'50vh'}
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
                  <Tooltip label="Clear entry (Ctrl + X)">
                    <IconButton
                      variant="ghost"
                      border={'none'}
                      color={'gray.500'}
                      outlineOffset={0}
                      _hover={{
                        bg: 'transparent',
                        transform: 'translateX(-2px) scale(1.1)',
                      }}
                      _focus={{
                        outline: '2px solid black',
                      }}
                      _focusVisible={{ outline: '2px solid black' }}
                      _active={{ color: 'white', bg: 'black' }}
                      rounded={'none'}
                      icon={<SmallCloseIcon boxSize={6} />}
                      aria-label={'Clear entry'}
                      onClick={clearEntry}
                    />
                  </Tooltip>
                  <Tooltip label="Save entry (Ctrl + S)">
                    <IconButton
                      alignSelf={'end'}
                      variant="ghost"
                      border={'none'}
                      outlineOffset={0}
                      bg={'transparent'}
                      _hover={{
                        transform: 'translateX(-2px) scale(1.1)',
                      }}
                      _focus={{
                        outline: '2px solid',
                      }}
                      _focusVisible={{
                        outline: '2px solid',
                      }}
                      _active={{
                        outlineColor: 'transparent',
                        color: 'white',
                        bg: 'black',
                      }}
                      rounded={'none'}
                      transition={'all 0.1s'}
                      icon={<ArrowForwardIcon boxSize={6} />}
                      aria-label={'Submit'}
                      type="submit"
                      // onClick={submitEntry}
                    />
                  </Tooltip>
                </>
              )}
            </Flex>
          </Box>
          <EntryNote currentEntry={currentEntry} />
        </Flex>
      </Container>
      <AppFooter />
    </ChakraProvider>
  )
}

export default App
