import { StoredEntry } from '@/utils/getEntries'
import { Flex, Text } from '@chakra-ui/react'

export const EntryNote = ({
  currentEntry,
}: {
  currentEntry?: Partial<StoredEntry>
}) => {
  const { createdAt, updatedAt } = currentEntry || {}
  return (
    <Flex mt={-1} justifyContent={'space-between'} px={1}>
      <Text
        visibility={createdAt ? 'visible' : 'hidden'}
        fontSize={'xs'}
        color="gray.500"
      >
        Recorded{' '}
        {new Date(createdAt ?? '').toLocaleString(undefined, {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
        })}
      </Text>
      <Text
        visibility={updatedAt ? 'visible' : 'hidden'}
        fontSize={'xs'}
        color="gray.500"
      >
        Updated{' '}
        {new Date(updatedAt ?? '').toLocaleString(undefined, {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
        })}
      </Text>
    </Flex>
  )
}
