import { TimeIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton, Container
} from '@chakra-ui/react';


export const AppHeader = ({ onOpen }: { onOpen: () => void; }) => {
  return (
    <Flex as="header" justifyContent={'center'}>
      <Container maxW="full" textAlign={'right'} padding={1}>
        <IconButton
          icon={<TimeIcon />}
          aria-label={'Toggle dark mode'}
          variant={'ghost'}
          onClick={onOpen}
          alignSelf={'start'} />
      </Container>
    </Flex>
  );
};
