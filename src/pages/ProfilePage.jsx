import {
    Container,
    VStack,
    Heading,
    Text,
    Icon,
    Button
} from '@chakra-ui/react'
import { FiUser, FiArrowLeft } from 'react-icons/fi'

const ProfilePage = ({ onNavigate, onLogout, user }) => {
    return (
        <Container maxW="7xl" py={12}>
            <VStack spacing={8} textAlign="center">
                <Icon as={FiUser} boxSize={20} color="sage.300" />

                <VStack spacing={4}>
                    <Heading size="xl" color="gray.800">
                        Mi Perfil
                    </Heading>
                    <Text fontSize="lg" color="gray.600" maxW="md">
                        Gestiona tu información personal, preferencias de viaje,
                        configuración de privacidad y plan de suscripción.
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
    )
}

export default ProfilePage