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
        <Box py={{ base: 12, md: 20 }} bg="white">
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <VStack spacing={{ base: 10, md: 16 }}>
                    <VStack spacing={4} textAlign="center" maxW="3xl">
                        <Heading
                            size={{ base: "lg", md: "xl" }}
                            color="gray.800"
                            px={{ base: 4, md: 0 }}
                        >
                            Todo lo que necesitas en una sola app
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="2xl"
                            px={{ base: 4, md: 0 }}
                            lineHeight="tall"
                        >
                            Desde la planificación inicial hasta los recuerdos finales,
                            Voyaj te acompaña en cada paso de tu aventura.
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={{ base: 6, md: 8 }}
                        w="full"
                    >
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                variant="outline"
                                _hover={{
                                    transform: { base: "none", md: "translateY(-4px)" },
                                    shadow: "xl"
                                }}
                                transition="all 0.3s"
                                h="full"
                            >
                                <CardBody p={{ base: 4, md: 6 }}>
                                    <VStack spacing={4} align="start" h="full">
                                        <Icon
                                            as={feature.icon}
                                            boxSize={{ base: 10, md: 12 }}
                                            color={feature.color}
                                            p={2}
                                            bg={`${feature.color.split('.')[0]}.50`}
                                            borderRadius="lg"
                                        />
                                        <VStack spacing={2} align="start" flex={1}>
                                            <Heading
                                                size={{ base: "sm", md: "md" }}
                                                color="gray.800"
                                                lineHeight="short"
                                            >
                                                {feature.title}
                                            </Heading>
                                            <Text
                                                color="gray.600"
                                                lineHeight="tall"
                                                fontSize={{ base: "sm", md: "md" }}
                                            >
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