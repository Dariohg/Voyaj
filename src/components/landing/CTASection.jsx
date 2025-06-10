import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

const CTASection = ({ onShowRegister }) => {
    return (
        <Box py={20} bgGradient="linear(to-r, sage.400, sage.500)">
            <Container maxW="7xl">
                <VStack spacing={8} textAlign="center">
                    <VStack spacing={4}>
                        <Heading size="xl" color="white">
                            ¿Listo para tu próxima aventura?
                        </Heading>
                        <Text fontSize="lg" color="sage.100" maxW="2xl">
                            Únete a miles de viajeros que ya están creando recuerdos increíbles con Voyaj.
                            Tu primer viaje es completamente gratis.
                        </Text>
                    </VStack>

                    <VStack spacing={4}>
                        <Button
                            size="lg"
                            bg="white"
                            color="sage.500"
                            _hover={{ bg: 'vanilla.100', transform: 'translateY(-2px)', shadow: 'lg' }}
                            _active={{ transform: 'translateY(0)' }}
                            rightIcon={<FiCheck />}
                            onClick={onShowRegister}
                            borderRadius="full"
                            px={8}
                            py={6}
                            fontWeight="semibold"
                            transition="all 0.3s"
                        >
                            Empezar ahora gratis
                        </Button>
                        <Text fontSize="sm" color="sage.200">
                            No necesitas tarjeta de crédito • Configuración en 2 minutos
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default CTASection