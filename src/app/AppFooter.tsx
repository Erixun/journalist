import { Container, Flex } from '@chakra-ui/react'

export const AppFooter = () => {
  return (
    <Flex as="footer" justifyContent={'center'} paddingBlock={1}>
      <Container maxW="md">
        <p>© 2021 Journalist</p>
      </Container>
    </Flex>
  )
}
