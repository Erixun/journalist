import { Container, Flex } from '@chakra-ui/react'

export const AppFooter = () => {
  return (
    <Flex as="footer" justifyContent={'center'} paddingBlockEnd={4}>
      <Container maxW="md">
        <p>© 2023 Journalist</p>
      </Container>
    </Flex>
  )
}
