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
        <Box py={{ base: 12, md: 20 }} bgGradient="linear(to-r, sage.400, sage.500)">
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
                    <VStack spacing={4} maxW="3xl">
                        <Heading
                            size={{ base: "lg", md: "xl" }}
                            color="white"
                            px={{ base: 4, md: 0 }}
                        >
                            ¿Listo para tu próxima aventura?
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="sage.100"
                            maxW="2xl"
                            px={{ base: 4, md: 0 }}
                            lineHeight="tall"
                        >
                            Únete a miles de viajeros que ya están creando recuerdos increíbles con Voyaj.
                            Tu primer viaje es completamente gratis.
                        </Text>
                    </VStack>

                    <VStack spacing={4}>
                        <Button
                            size={{ base: "md", md: "lg" }}
                            bg="white"
                            color="sage.500"
                            _hover={{
                                bg: 'vanilla.100',
                                transform: { base: 'none', md: 'translateY(-2px)' },
                                shadow: 'lg'
                            }}
                            _active={{ transform: 'translateY(0)' }}
                            rightIcon={<FiCheck />}
                            onClick={onShowRegister}
                            borderRadius="full"
                            px={{ base: 6, md: 8 }}
                            py={{ base: 4, md: 6 }}
                            fontWeight="semibold"
                            transition="all 0.3s"
                            w={{ base: "full", sm: "auto" }}
                            maxW="300px"
                        >
                            Empezar ahora gratis
                        </Button>
                        <Text
                            fontSize="sm"
                            color="sage.200"
                            textAlign="center"
                            px={4}
                        >
                            No necesitas tarjeta de crédito • Configuración en 2 minutos
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default CTASection