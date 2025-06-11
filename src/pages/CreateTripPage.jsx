import {
    Box,
    Container,
    VStack,
    Heading,
    Text,
    Icon,
    Button
} from '@chakra-ui/react'
import { FiPlus, FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'

const CreateTripPage = ({ onNavigate, onLogout, user }) => {
    return (
        <Box minH="100vh" bg="gray.50">
            <Navbar
                user={user}
                onNavigate={onNavigate}
                onLogout={onLogout}
                currentRoute="/create-trip"
            />

            <Container maxW="7xl" py={12}>
                <VStack spacing={8} textAlign="center">
                    <Icon as={FiPlus} boxSize={20} color="sage.300" />

                    <VStack spacing={4}>
                        <Heading size="xl" color="gray.800">
                            Crear Nuevo Viaje
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="md">
                            Esta página está en desarrollo. Pronto podrás planificar
                            tus viajes paso a paso con nuestra herramienta inteligente.
                        </Text>
                    </VStack>

                    <VStack spacing={4}>
                        <Text fontSize="sm" color="gray.500">
                            🚧 Página en construcción 🚧
                        </Text>
                        <Button
                            leftIcon={<FiArrowLeft />}
                            variant="outline"
                            onClick={() => onNavigate('/dashboard')}
                        >
                            Volver al Dashboard
                        </Button>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default CreateTripPage