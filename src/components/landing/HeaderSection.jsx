import {
    Box,
    Container,
    Heading,
    Button,
    HStack,
    Flex,
    Icon
} from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'

const HeaderSection = ({ onShowLogin, onShowRegister }) => {
    return (
        <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={100}>
            <Container maxW="7xl" py={4}>
                <Flex justify="space-between" align="center">
                    <HStack>
                        <Icon as={FiMapPin} boxSize={8} color="sage.400" />
                        <Heading size="lg" color="sage.400" fontWeight="bold">
                            Voyaj
                        </Heading>
                    </HStack>
                    <HStack spacing={4}>
                        <Button
                            variant="ghost"
                            color="gray.600"
                            onClick={onShowLogin}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onShowRegister}
                        >
                            Crear Cuenta
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}

export default HeaderSection