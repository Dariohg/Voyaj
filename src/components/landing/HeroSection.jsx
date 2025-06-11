import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    Stack,
    Badge
} from '@chakra-ui/react'
import { FiTrendingUp } from 'react-icons/fi'

const HeroSection = ({ onShowRegister }) => {
    return (
        <Box bgGradient="linear(to-br, sage.50, vanilla.100)" py={{ base: 12, md: 20 }}>
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <Stack spacing={{ base: 6, md: 8 }} align="center" textAlign="center">
                    <VStack spacing={{ base: 4, md: 6 }}>
                        <Heading
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                            fontWeight="extrabold"
                            color="gray.800"
                            lineHeight="shorter"
                            maxW="5xl"
                            px={{ base: 2, md: 0 }}
                        >
                            Planifica, Vive y{' '}
                            <Text as="span" color="sage.400">Recuerda</Text>
                            <br />
                            tus viajes perfectos
                        </Heading>
                        <Text
                            fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                            color="gray.600"
                            maxW={{ base: "90%", md: "2xl" }}
                            lineHeight="tall"
                            px={{ base: 4, md: 0 }}
                        >
                            La única app que necesitas para planificar tu viaje, controlar gastos durante el mismo,
                            y conservar todos tus recuerdos organizados para siempre.
                        </Text>
                    </VStack>
                    <VStack spacing={4}>
                        <Button
                            variant="primary"
                            size={{ base: "md", md: "lg" }}
                            rightIcon={<FiTrendingUp />}
                            onClick={onShowRegister}
                            w={{ base: "full", sm: "auto" }}
                            maxW="300px"
                        >
                            Comenzar mi primer viaje
                        </Button>
                        <Text fontSize="sm" color="gray.500" textAlign="center" px={4}>
                            ✨ Gratis durante tu primer viaje • Sin tarjeta de crédito
                        </Text>
                    </VStack>
                </Stack>
            </Container>
        </Box>
    )
}

export default HeroSection