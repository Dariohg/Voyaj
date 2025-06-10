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
        <Box bgGradient="linear(to-br, sage.50, vanilla.100)" py={20}>
            <Container maxW="7xl">
                <Stack spacing={8} align="center" textAlign="center">
                    <VStack spacing={6}>
                        <Heading
                            fontSize={{ base: '4xl', md: '6xl' }}
                            fontWeight="extrabold"
                            color="gray.800"
                            lineHeight="shorter"
                        >
                            Planifica, Vive y
                            <Text as="span" color="sage.400"> Recuerda</Text>
                            <br />
                            tus viajes perfectos
                        </Heading>
                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color="gray.600"
                            maxW="2xl"
                            lineHeight="tall"
                        >
                            La única app que necesitas para planificar tu viaje, controlar gastos durante el mismo,
                            y conservar todos tus recuerdos organizados para siempre.
                        </Text>
                    </VStack>
                    <VStack spacing={4}>
                        <Button
                            variant="primary"
                            size="lg"
                            rightIcon={<FiTrendingUp />}
                            onClick={onShowRegister}
                        >
                            Comenzar mi primer viaje
                        </Button>
                        <Text fontSize="sm" color="gray.500">
                            ✨ Gratis durante tu primer viaje • Sin tarjeta de crédito
                        </Text>
                    </VStack>
                </Stack>
            </Container>
        </Box>
    )
}

export default HeroSection