import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid,
    Icon,
    Card,
    CardBody
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiEdit3,
    FiDollarSign,
    FiCamera,
    FiBarChart2,
    FiUsers
} from 'react-icons/fi'

const FeaturesSection = () => {
    const features = [
        {
            icon: FiCalendar,
            title: 'Planificación Inteligente',
            description: 'Organiza tu viaje día por día con estimaciones automáticas de costos y tiempos realistas.',
            color: 'sage.400'
        },
        {
            icon: FiEdit3,
            title: 'Diario de Experiencias',
            description: 'Registra tus vivencias reales vs lo planeado y captura cada momento especial.',
            color: 'vanilla.600'
        },
        {
            icon: FiDollarSign,
            title: 'Control de Gastos',
            description: 'Rastrea automáticamente tus gastos y recibe alertas cuando te desvíes del presupuesto.',
            color: 'sage.500'
        },
        {
            icon: FiCamera,
            title: 'Fotos Organizadas',
            description: 'Tus fotos se organizan automáticamente con geolocalización y cronología del viaje.',
            color: 'vanilla.700'
        },
        {
            icon: FiBarChart2,
            title: 'Plan vs Realidad',
            description: 'Compara lo que planificaste con lo que realmente viviste y aprende para futuros viajes.',
            color: 'sage.600'
        },
        {
            icon: FiUsers,
            title: 'Viajes en Grupo',
            description: 'Colabora con tus acompañantes, divide gastos y tomen decisiones juntos.',
            color: 'vanilla.800'
        }
    ]

    return (
        <Box py={20} bg="white">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center">
                        <Heading size="xl" color="gray.800">
                            Todo lo que necesitas en una sola app
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="2xl">
                            Desde la planificación inicial hasta los recuerdos finales,
                            Voyaj te acompaña en cada paso de tu aventura.
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {features.map((feature, index) => (
                            <Card key={index} variant="outline" _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }} transition="all 0.3s">
                                <CardBody>
                                    <VStack spacing={4} align="start">
                                        <Icon
                                            as={feature.icon}
                                            boxSize={12}
                                            color={feature.color}
                                            p={2}
                                            bg={`${feature.color.split('.')[0]}.50`}
                                            borderRadius="lg"
                                        />
                                        <VStack spacing={2} align="start">
                                            <Heading size="md" color="gray.800">
                                                {feature.title}
                                            </Heading>
                                            <Text color="gray.600" lineHeight="tall">
                                                {feature.description}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    )
}

export default FeaturesSection