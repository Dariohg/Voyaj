import {
    Box,
    Container,
    VStack,
    Heading,
    Text,
    Icon,
    Button
} from '@chakra-ui/react'
import { FiCalendar, FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'

const MyTripsPage = ({ onNavigate, onLogout, user }) => {
    return (
        <Box minH="100vh" bg="gray.50">
            <Navbar
                user={user}
                onNavigate={onNavigate}
                onLogout={onLogout}
                currentRoute="/my-trips"
            />

            <Container maxW="7xl" py={12}>
                <VStack spacing={8} textAlign="center">
                    <Icon as={FiCalendar} boxSize={20} color="sage.300" />

                    <VStack spacing={4}>
                        <Heading size="xl" color="gray.800">
                            Mis Viajes
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="md">
                            Aquí podrás ver todos tus viajes organizados por fecha,
                            estado y destino. Edita, elimina o duplica tus itinerarios.
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

export default MyTripsPage