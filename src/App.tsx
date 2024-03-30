import { ArrowForwardIcon, TimeIcon } from '@chakra-ui/icons';
import './App.css';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  Heading as ChakraHeading,
  Textarea as ChakraTextarea,
  Flex,
  IconButton,
  Box,
} from '@chakra-ui/react';

const { Button, Heading, Textarea } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Heading,
    Textarea,
    Button,
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <header>
        {/* DONE:
        
        */}
        {/* TODO: 
            Add logo
            Add button to display history
            Add dark mode toggle
        */}
        <IconButton
          icon={<TimeIcon />}
          aria-label={'Toggle dark mode'}
          variant={'ghost'}
        />
      </header>
      <Flex as="main" flexDir={'column'} gap={3}>
        <ChakraHeading as="h1">Journalist</ChakraHeading>
        <p>Write to learn and record</p>
        <Box
          border={'1px solid'}
          _focusWithin={{ borderColor: 'blue' }}
          borderRadius={6}
          borderWidth={2}
        >
          <ChakraTextarea
            placeholder="The day has been..."
            resize={'none'}
            borderWidth={3}
            size={'lg'}
            minWidth={400}
            borderColor="transparent"
            focusBorderColor="transparent"
            _hover={{ borderColor: 'transparent' }}
            onChange={({ target }) => {
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <Flex justifyContent={'flex-end'}>
            <IconButton
              alignSelf={'end'}
              variant="ghost"
              border={'none'}
              _hover={{ bg: 'transparent', transform: 'translateX(-2px)' }}
              _focus={{
                outline: 'none',
                bg: 'transparent',
                transform: 'scale(1.2)',
              }}
              _active={{
                transform: 'scale(1.2) translateX(-2px)',
                color: 'red',
              }}
              transition={'all 0.2s'}
              icon={<ArrowForwardIcon />}
              aria-label={'Submit'}
            />
          </Flex>
        </Box>
      </Flex>
      <footer></footer>
    </ChakraBaseProvider>
  );
}

export default App;
