import {
    Box,
    Container,
    Flex,
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    Icon,
    Avatar,
    Badge,
    SimpleGrid,
    Card,
    CardBody,
    Progress,
    Divider,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import {
    FiMapPin,
    FiPlus,
    FiCalendar,
    FiDollarSign,
    FiCamera,
    FiTrendingUp,
    FiUser,
    FiSettings,
    FiLogOut,
    FiMoreVertical,
    FiEdit,
    FiTrash2
} from 'react-icons/fi'
import { useState } from 'react'

const DashboardPage = ({ onNavigate, onLogout, user }) => {
    const [activeTrips] = useState([
        {
            id: 1,
            title: "Viaje a Japón",
            destination: "Tokio, Japón",
            startDate: "15 Jul 2024",
            endDate: "28 Jul 2024",
            budget: 2500,
            spent: 1680,
            status: "active",
            progress: 67,
            image: "🇯🇵"
        },
        {
            id: 2,
            title: "Europa Backpack",
            destination: "París, Francia",
            startDate: "20 Ago 2024",
            endDate: "15 Sep 2024",
            budget: 3200,
            spent: 0,
            status: "planned",
            progress: 85,
            image: "🇫🇷"
        }
    ])

    const [recentTrips] = useState([
        {
            id: 3,
            title: "Costa Rica Adventure",
            destination: "San José, Costa Rica",
            completedDate: "Marzo 2024",
            budget: 1800,
            spent: 1650,
            rating: 5,
            image: "🇨🇷"
        },
        {
            id: 4,
            title: "NYC Weekend",
            destination: "Nueva York, USA",
            completedDate: "Enero 2024",
            budget: 1200,
            spent: 1350,
            rating: 4,
            image: "🇺🇸"
        }
    ])

    const stats = [
        {
            label: "Viajes Completados",
            value: "12",
            icon: FiMapPin,
            color: "sage.400",
            change: "+2 este año"
        },
        {
            label: "Países Visitados",
            value: "8",
            icon: FiTrendingUp,
            color: "blue.400",
            change: "+1 nuevo"
        },
        {
            label: "Presupuesto Total",
            value: "$8,450",
            icon: FiDollarSign,
            color: "green.400",
            change: "Bien controlado"
        },
        {
            label: "Fotos Guardadas",
            value: "247",
            icon: FiCamera,
            color: "purple.400",
            change: "+45 recientes"
        }
    ]

    const handleCreateTrip = () => {
        // TODO: Navegar a crear viaje
        console.log('Create new trip')
    }

    const handleEditTrip = (tripId) => {
        // TODO: Navegar a editar viaje
        console.log('Edit trip:', tripId)
    }

    const handleViewTrip = (tripId) => {
        // TODO: Navegar a ver detalles del viaje
        console.log('View trip:', tripId)
    }

    return (
        <Box minH="100vh" bg="gray.50">
            {/* Header */}
            <Box bg="white" borderBottom="1px" borderColor="gray.200" py={4}>
                <Container maxW="7xl">
                    <Flex justify="space-between" align="center">
                        {/* Logo */}
                        <HStack spacing={3}>
                            <Icon as={FiMapPin} boxSize={8} color="sage.400" />
                            <Heading size="lg" color="sage.400" fontWeight="600">
                                Voyaj
                            </Heading>
                        </HStack>

                        {/* User Menu */}
                        <Menu>
                            <MenuButton>
                                <HStack spacing={3} cursor="pointer" _hover={{ bg: "gray.50" }} p={2} borderRadius="lg">
                                    <VStack spacing={0} align="end">
                                        <Text fontSize="sm" fontWeight="500" color="gray.700">
                                            {user?.name || "Juan Pérez"}
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Viajero Premium
                                        </Text>
                                    </VStack>
                                    <Avatar
                                        size="sm"
                                        name={user?.name || "Juan Pérez"}
                                        bg="sage.400"
                                        color="white"
                                    />
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem icon={<FiUser />}>Mi Perfil</MenuItem>
                                <MenuItem icon={<FiSettings />}>Configuración</MenuItem>
                                <Divider />
                                <MenuItem icon={<FiLogOut />} onClick={onLogout} color="red.500">
                                    Cerrar Sesión
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Container>
            </Box>

            <Container maxW="7xl" py={8}>
                <VStack spacing={8} align="stretch">
                    {/* Welcome Section */}
                    <VStack spacing={4} align="start">
                        <Heading size="xl" color="gray.800" fontWeight="600">
                            ¡Hola, {user?.firstName || "Juan"}! 👋
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                            Tienes 2 viajes activos y muchas aventuras por delante.
                        </Text>
                    </VStack>

                    {/* Stats Grid */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                        {stats.map((stat, index) => (
                            <Card key={index} bg="white" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                                <CardBody p={6}>
                                    <VStack spacing={4} align="start">
                                        <HStack justify="space-between" w="full">
                                            <Icon
                                                as={stat.icon}
                                                boxSize={6}
                                                color={stat.color}
                                                p={1}
                                                bg={`${stat.color.split('.')[0]}.50`}
                                                borderRadius="lg"
                                            />
                                            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                                                {stat.value}
                                            </Text>
                                        </HStack>
                                        <VStack spacing={1} align="start">
                                            <Text fontSize="sm" color="gray.600" fontWeight="500">
                                                {stat.label}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                {stat.change}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>

                    {/* Active Trips */}
                    <VStack spacing={6} align="stretch">
                        <HStack justify="space-between">
                            <Heading size="lg" color="gray.800" fontWeight="600">
                                Viajes Activos
                            </Heading>
                            <Button
                                leftIcon={<FiPlus />}
                                bg="sage.400"
                                color="white"
                                _hover={{ bg: "sage.500", transform: "translateY(-1px)" }}
                                onClick={handleCreateTrip}
                                borderRadius="12px"
                                size="md"
                            >
                                Nuevo Viaje
                            </Button>
                        </HStack>

                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                            {activeTrips.map((trip) => (
                                <Card key={trip.id} bg="white" _hover={{ shadow: "lg" }} transition="all 0.2s">
                                    <CardBody p={6}>
                                        <VStack spacing={4} align="stretch">
                                            {/* Trip Header */}
                                            <HStack justify="space-between">
                                                <HStack spacing={3}>
                                                    <Text fontSize="2xl">{trip.image}</Text>
                                                    <VStack spacing={0} align="start">
                                                        <Heading size="md" color="gray.800">
                                                            {trip.title}
                                                        </Heading>
                                                        <Text fontSize="sm" color="gray.500">
                                                            {trip.destination}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                                <Menu>
                                                    <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
                                                    <MenuList>
                                                        <MenuItem icon={<FiEdit />} onClick={() => handleEditTrip(trip.id)}>
                                                            Editar
                                                        </MenuItem>
                                                        <MenuItem icon={<FiTrash2 />} color="red.500">
                                                            Eliminar
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </HStack>

                                            {/* Trip Status */}
                                            <HStack>
                                                <Badge
                                                    colorScheme={trip.status === 'active' ? 'green' : 'blue'}
                                                    variant="subtle"
                                                    borderRadius="full"
                                                    px={3}
                                                    py={1}
                                                >
                                                    {trip.status === 'active' ? 'En progreso' : 'Planificado'}
                                                </Badge>
                                                <Text fontSize="sm" color="gray.500">
                                                    {trip.startDate} - {trip.endDate}
                                                </Text>
                                            </HStack>

                                            {/* Budget Progress */}
                                            <VStack spacing={2} align="stretch">
                                                <HStack justify="space-between">
                                                    <Text fontSize="sm" color="gray.600" fontWeight="500">
                                                        Presupuesto
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.800" fontWeight="600">
                                                        ${trip.spent} / ${trip.budget}
                                                    </Text>
                                                </HStack>
                                                <Progress
                                                    value={(trip.spent / trip.budget) * 100}
                                                    colorScheme={trip.spent > trip.budget ? "red" : "sage"}
                                                    borderRadius="full"
                                                    size="sm"
                                                />
                                            </VStack>

                                            {/* Planning Progress */}
                                            <VStack spacing={2} align="stretch">
                                                <HStack justify="space-between">
                                                    <Text fontSize="sm" color="gray.600" fontWeight="500">
                                                        Planificación
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.800" fontWeight="600">
                                                        {trip.progress}%
                                                    </Text>
                                                </HStack>
                                                <Progress
                                                    value={trip.progress}
                                                    colorScheme="blue"
                                                    borderRadius="full"
                                                    size="sm"
                                                />
                                            </VStack>

                                            {/* Actions */}
                                            <Button
                                                w="full"
                                                variant="outline"
                                                borderColor="sage.200"
                                                color="sage.600"
                                                _hover={{ bg: "sage.50", borderColor: "sage.300" }}
                                                onClick={() => handleViewTrip(trip.id)}
                                                borderRadius="12px"
                                            >
                                                Ver Detalles
                                            </Button>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </VStack>

                    {/* Recent Trips */}
                    <VStack spacing={6} align="stretch">
                        <Heading size="lg" color="gray.800" fontWeight="600">
                            Viajes Recientes
                        </Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            {recentTrips.map((trip) => (
                                <Card key={trip.id} bg="white" _hover={{ shadow: "md" }} transition="all 0.2s">
                                    <CardBody p={6}>
                                        <HStack spacing={4}>
                                            <Text fontSize="3xl">{trip.image}</Text>
                                            <VStack spacing={2} align="start" flex={1}>
                                                <VStack spacing={0} align="start">
                                                    <Heading size="sm" color="gray.800">
                                                        {trip.title}
                                                    </Heading>
                                                    <Text fontSize="sm" color="gray.500">
                                                        {trip.destination}
                                                    </Text>
                                                </VStack>
                                                <HStack spacing={2}>
                                                    <Badge colorScheme="gray" variant="subtle" borderRadius="full">
                                                        {trip.completedDate}
                                                    </Badge>
                                                    <HStack spacing={1}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Box
                                                                key={i}
                                                                w={3}
                                                                h={3}
                                                                borderRadius="full"
                                                                bg={i < trip.rating ? "yellow.400" : "gray.200"}
                                                            />
                                                        ))}
                                                    </HStack>
                                                </HStack>
                                                <Text fontSize="xs" color="gray.500">
                                                    ${trip.spent} de ${trip.budget}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default DashboardPage