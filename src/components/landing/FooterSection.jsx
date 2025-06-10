import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon
} from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'

const FooterSection = () => {
    return (
        <Box bg="gray.900" py={12}>
            <Container maxW="7xl">
                <VStack spacing={8}>
                    <HStack>
                        <Icon as={FiMapPin} boxSize={6} color="sage.400" />
                        <Heading size="md" color="white">
                            Voyaj
                        </Heading>
                    </HStack>
                    <Text color="gray.400" textAlign="center">
                        © 2024 Voyaj. Hecho con ❤️ para viajeros apasionados.
                    </Text>
                </VStack>
            </Container>
        </Box>
    )
}

export default FooterSection