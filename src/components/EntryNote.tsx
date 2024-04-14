import { Flex, Text } from '@chakra-ui/react';
import { Entry } from '@store';


export const EntryNote = ({ currentEntry }: { currentEntry?: Entry; }) => {
  return (
    <Flex mt={-1} justifyContent={'space-between'} px={1}>
      <Text
        visibility={currentEntry?.createdAt ? 'visible' : 'hidden'}
        fontSize={'xs'}
        color="gray.500"
      >
        Recorded{' '}
        {currentEntry?.createdAt?.toLocaleString(undefined, {
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
        {currentEntry?.updatedAt?.toLocaleString(undefined, {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
        })}
      </Text>
    </Flex>
  );
};
