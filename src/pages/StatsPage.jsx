import {
    Container,
    VStack,
    Heading,
    Text,
    Icon,
    Button
} from '@chakra-ui/react'
import { FiBarChart2, FiArrowLeft } from 'react-icons/fi'

const StatsPage = ({ onNavigate, onLogout, user }) => {
    return (
        <Container maxW="7xl" py={12}>
            <VStack spacing={8} textAlign="center">
                <Icon as={FiBarChart2} boxSize={20} color="sage.300" />

                <VStack spacing={4}>
                    <Heading size="xl" color="gray.800">
                        Estadísticas de Viajes
                    </Heading>
                    <Text fontSize="lg" color="gray.600" maxW="md">
                        Analiza tus patrones de viaje, gastos promedio,
                        destinos favoritos y mucho más con gráficos interactivos.
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

export default StatsPage