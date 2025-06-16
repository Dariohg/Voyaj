import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Card,
    CardBody,
    SimpleGrid,
    Badge,
    Progress,
    Stat,
    StatLabel,
    StatNumber,
    Box,
    Avatar,
    Button
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiMapPin,
    FiCamera,
    FiStar,
    FiClock,
    FiFlag,
    FiTrendingUp
} from 'react-icons/fi'

const TripsTab = ({ trips, stats }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'green'
            case 'upcoming': return 'blue'
            case 'completed': return 'gray'
            default: return 'gray'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'En Curso'
            case 'upcoming': return 'Próximo'
            case 'completed': return 'Completado'
            default: return 'Desconocido'
        }
    }

    const renderStars = (rating) => {
        if (!rating) return null
        return (
            <HStack spacing={1}>
                {[...Array(5)].map((_, i) => (
                    <Icon
                        key={i}
                        as={FiStar}
                        boxSize={3}
                        color={i < rating ? "yellow.400" : "gray.300"}
                        fill={i < rating ? "yellow.400" : "transparent"}
                    />
                ))}
            </HStack>
        )
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Resumen de viajes */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={4} align="start">
                        <Heading size="md" color="gray.800">Resumen de Viajes</Heading>

                        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
                            <Stat>
                                <StatLabel color="gray.600" fontSize="sm">Completados</StatLabel>
                                <StatNumber color="green.500" fontSize="2xl">{stats.completedTrips}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color="gray.600" fontSize="sm">Activos</StatLabel>
                                <StatNumber color="blue.500" fontSize="2xl">{stats.activeTrips}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color="gray.600" fontSize="sm">Próximos</StatLabel>
                                <StatNumber color="orange.500" fontSize="2xl">{stats.upcomingTrips}</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel color="gray.600" fontSize="sm">Ciudades</StatLabel>
                                <StatNumber color="purple.500" fontSize="2xl">{stats.totalCities}</StatNumber>
                            </Stat>
                        </SimpleGrid>

                        <VStack spacing={2} align="start" w="full">
                            <HStack justify="space-between" w="full">
                                <Text fontSize="sm" color="gray.600" fontWeight="500">
                                    Progreso hacia meta anual (12 viajes)
                                </Text>
                                <Text fontSize="sm" color="gray.700" fontWeight="600">
                                    {stats.totalTrips}/12
                                </Text>
                            </HStack>
                            <Progress
                                value={(stats.totalTrips / 12) * 100}
                                size="sm"
                                colorScheme="sage"
                                borderRadius="full"
                                bg="gray.200"
                                w="full"
                            />
                        </VStack>
                    </VStack>
                </CardBody>
            </Card>

            {/* Próximo viaje */}
            {stats.nextTrip && (
                <Card bg="gradient-to-r" bgGradient="linear(to-r, sage.400, sage.500)" color="white">
                    <CardBody p={6}>
                        <VStack spacing={3} align="start">
                            <HStack spacing={2}>
                                <Icon as={FiTrendingUp} boxSize={5} />
                                <Heading size="md">Próximo Viaje</Heading>
                            </HStack>
                            <HStack spacing={4} w="full" justify="space-between">
                                <VStack spacing={1} align="start">
                                    <Text fontSize="lg" fontWeight="600">
                                        {stats.nextTrip.destination}
                                    </Text>
                                    <HStack spacing={2}>
                                        <Icon as={FiCalendar} boxSize={4} />
                                        <Text fontSize="sm">
                                            {new Date(stats.nextTrip.date).toLocaleDateString('es-ES')}
                                        </Text>
                                    </HStack>
                                </VStack>
                                <Button
                                    variant="outline"
                                    colorScheme="whiteAlpha"
                                    size="sm"
                                    color="white"
                                    borderColor="white"
                                    _hover={{ bg: "whiteAlpha.200" }}
                                >
                                    Ver Detalles
                                </Button>
                            </HStack>
                        </VStack>
                    </CardBody>
                </Card>
            )}

            {/* Lista de viajes */}
            <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.800">Mis Viajes Recientes</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {trips.map((trip) => (
                        <Card key={trip.id} bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                            <CardBody p={6}>
                                <VStack spacing={4} align="stretch">
                                    <HStack justify="space-between" align="start">
                                        <HStack spacing={3}>
                                            <Text fontSize="3xl">{trip.image}</Text>
                                            <VStack spacing={1} align="start">
                                                <Text fontSize="lg" fontWeight="600" color="gray.800">
                                                    {trip.title}
                                                </Text>
                                                <HStack spacing={2}>
                                                    <Icon as={FiMapPin} boxSize={4} color="gray.500" />
                                                    <Text fontSize="sm" color="gray.600">
                                                        {trip.destination}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>

                                        <Badge
                                            colorScheme={getStatusColor(trip.status)}
                                            variant="solid"
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                            fontSize="xs"
                                        >
                                            {getStatusText(trip.status)}
                                        </Badge>
                                    </HStack>

                                    <VStack spacing={2} align="start">
                                        <HStack spacing={4}>
                                            <HStack spacing={2}>
                                                <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                                                <Text fontSize="sm" color="gray.600">
                                                    {new Date(trip.date).toLocaleDateString('es-ES')}
                                                </Text>
                                            </HStack>
                                            <HStack spacing={2}>
                                                <Icon as={FiClock} boxSize={4} color="gray.500" />
                                                <Text fontSize="sm" color="gray.600">
                                                    {trip.duration}
                                                </Text>
                                            </HStack>
                                        </HStack>

                                        <HStack spacing={4}>
                                            <HStack spacing={2}>
                                                <Icon as={FiCamera} boxSize={4} color="gray.500" />
                                                <Text fontSize="sm" color="gray.600">
                                                    {trip.photos} fotos
                                                </Text>
                                            </HStack>
                                            {trip.rating && (
                                                <HStack spacing={2}>
                                                    {renderStars(trip.rating)}
                                                    <Text fontSize="sm" color="gray.600">
                                                        {trip.rating}/5
                                                    </Text>
                                                </HStack>
                                            )}
                                        </HStack>
                                    </VStack>

                                    <Button
                                        variant="outline"
                                        colorScheme="sage"
                                        size="sm"
                                        leftIcon={<FiFlag />}
                                    >
                                        Ver Viaje
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </VStack>
    )
}

export default TripsTab