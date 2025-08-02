import {
    Box,
    Container,
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    Icon,
    Badge,
    SimpleGrid,
    Card,
    CardBody,
    Progress,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useBreakpointValue,
    Grid,
    GridItem,
    Flex,
    Divider,
    Avatar,
    AvatarGroup
} from '@chakra-ui/react'
import {
    FiPlus,
    FiCalendar,
    FiDollarSign,
    FiCamera,
    FiTrendingUp,
    FiMapPin,
    FiMoreVertical,
    FiEdit,
    FiTrash2,
    FiUsers,
    FiStar,
    FiArrowUp,
    FiArrowDown,
    FiHeart,
    FiEye
} from 'react-icons/fi'
import { useState } from 'react'
import EmailVerificationBanner from '../components/EmailVerificationBanner'

const DashboardPage = ({ onNavigate, onLogout, user }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false })
    
    const [showVerificationBanner, setShowVerificationBanner] = useState(
        user && !user.email_verified
    )

    // Datos actualizados para el nuevo diseño
    const [stats] = useState([
        {
            label: "Total Gastado",
            value: "$9,834",
            change: "6.91%",
            trend: "up",
            icon: FiDollarSign,
            color: "blue.500"
        },
        {
            label: "Total Viajes",
            value: "1,935",
            change: "3.68%",
            trend: "up",
            icon: FiMapPin,
            color: "purple.500"
        },
        {
            label: "Fotos Subidas",
            value: "$28,178",
            change: "9.14%",
            trend: "up",
            icon: FiCamera,
            color: "green.500"
        },
        {
            label: "Experiencias",
            value: "$17,115",
            change: "3.71%",
            trend: "down",
            icon: FiStar,
            color: "orange.500"
        }
    ])

    const [upcomingTrips] = useState([
        {
            id: 1,
            title: "Gran Cañón",
            location: "Arizona, USA",
            dates: "7 May - 20 May 2025",
            rating: 4.8,
            friends: [
                { name: "Ana", avatar: "👩‍🦰" },
                { name: "Carlos", avatar: "👨‍🦱" },
                { name: "María", avatar: "👩‍🦳" }
            ],
            additionalFriends: 2,
            image: "🏜️",
            liked: false
        },
        {
            id: 2,
            title: "Playa Kelingking",
            location: "Bali, Indonesia",
            dates: "5 Aug - 12 Aug 2025",
            rating: 5.0,
            friends: [
                { name: "Luis", avatar: "👨‍💼" },
                { name: "Sofia", avatar: "👩‍💻" },
                { name: "Diego", avatar: "👨‍🎨" },
                { name: "Elena", avatar: "👩‍🔬" }
            ],
            additionalFriends: 4,
            image: "🏖️",
            liked: true
        },
        {
            id: 3,
            title: "Mont Saint-Michel",
            location: "Normandía, Francia",
            dates: "15 Sep - 25 Sep 2025",
            rating: 4.6,
            friends: [
                { name: "Pierre", avatar: "👨‍🍳" },
                { name: "Claire", avatar: "👩‍🎭" }
            ],
            additionalFriends: 1,
            image: "🏰",
            liked: false
        },
        {
            id: 4,
            title: "Parque Nacional Plitvice",
            location: "Plitvička, Jezera, Croacia",
            dates: "20 Oct - 30 Oct 2025",
            rating: 4.9,
            friends: [
                { name: "Marco", avatar: "👨‍🏫" },
                { name: "Nina", avatar: "👩‍🎨" }
            ],
            additionalFriends: 3,
            image: "🌊",
            liked: true
        }
    ])

    const [friends] = useState([
        { name: "Miles Kenner", email: "m.kenner@gmail.com", avatar: "👨‍💼" },
        { name: "Elise Thornwell", email: "elise.tn@gmail.com", avatar: "👩‍💻" },
        { name: "Dorian Westbrook", email: "d.westbrook@gmail.com", avatar: "👨‍🎨" },
        { name: "Grant Holloway", email: "grant.h@gmail.com", avatar: "👨‍🏫" }
    ])

    const handleVerificationSuccess = () => {
        setShowVerificationBanner(false)
        // Actualizar el estado del usuario
        if (user) {
            user.email_verified = true
        }
    }

    const handleDismissBanner = () => {
        setShowVerificationBanner(false)
    }

    const handleCreateTrip = () => {
        onNavigate('/create-trip')
    }

    const handleLikeTrip = (tripId) => {
        console.log('Like trip:', tripId)
    }

    const handleViewTrip = (tripId) => {
        onNavigate(`/trip/${tripId}`)
    }

    return (
        <Container maxW="full" py={8} px={{ base: 4, md: 8, lg: 16, xl: 20 }}>
            <Box maxW="1400px" mx="auto" pl={{ base: 0, lg: 20 }}>
                <VStack spacing={6} align="stretch">
                    {/* Banner de verificación de email */}
                    {showVerificationBanner && (
                        <EmailVerificationBanner
                            user={user}
                            onVerificationSuccess={handleVerificationSuccess}
                            onDismiss={handleDismissBanner}
                        />
                    )}

                    <Grid templateColumns={{ base: "1fr", xl: "1fr 300px" }} gap={8}>
                        {/* Columna Principal */}
                        <GridItem>
                            <VStack spacing={8} align="stretch">
                                {/* Welcome Section */}
                                <VStack spacing={4} align="start">
                                    <Heading size="xl" color="gray.800" fontWeight="600">
                                        ¡Hola, {user?.firstName || "Juan"}! 👋
                                    </Heading>
                                    <Text color="gray.600" fontSize="lg">
                                        Explora tus rutas de viaje favoritas
                                    </Text>
                                </VStack>

                                {/* Stats Grid */}
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                                    {stats.map((stat, index) => (
                                        <Card key={index} bg="white" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                                            <CardBody p={6}>
                                                <HStack justify="space-between" mb={4}>
                                                    <Text fontSize="sm" color="gray.500" fontWeight="500">
                                                        {stat.label}
                                                    </Text>
                                                    <IconButton
                                                        icon={<FiMoreVertical />}
                                                        size="xs"
                                                        variant="ghost"
                                                        color="gray.400"
                                                    />
                                                </HStack>
                                                <VStack spacing={2} align="start">
                                                    <Text fontSize="2xl" fontWeight="700" color="gray.800">
                                                        {stat.value}
                                                    </Text>
                                                    <HStack spacing={1}>
                                                        <Icon
                                                            as={stat.trend === 'up' ? FiArrowUp : FiArrowDown}
                                                            color={stat.trend === 'up' ? 'green.500' : 'red.500'}
                                                            boxSize={3}
                                                        />
                                                        <Text
                                                            fontSize="xs"
                                                            color={stat.trend === 'up' ? 'green.500' : 'red.500'}
                                                            fontWeight="500"
                                                        >
                                                            {stat.change}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>

                                {/* Map Section */}
                                <Card bg="white">
                                    <CardBody p={8}>
                                        <Flex
                                            h="300px"
                                            align="center"
                                            justify="center"
                                            bg="gray.50"
                                            borderRadius="xl"
                                            border="2px dashed"
                                            borderColor="gray.200"
                                        >
                                            <VStack spacing={4}>
                                                <Icon as={FiMapPin} boxSize={12} color="gray.400" />
                                                <VStack spacing={2}>
                                                    <Text fontSize="lg" fontWeight="600" color="gray.600">
                                                        Mapa Próximamente
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.500" textAlign="center">
                                                        Aquí podrás ver todas tus rutas de viaje en un mapa interactivo
                                                    </Text>
                                                </VStack>
                                            </VStack>
                                        </Flex>
                                    </CardBody>
                                </Card>

                                {/* Upcoming Trips */}
                                <VStack spacing={6} align="stretch">
                                    <HStack justify="space-between">
                                        <Heading size="md" color="gray.800">
                                            Próximos viajes
                                        </Heading>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="sage"
                                            rightIcon={<Icon as={FiEye} />}
                                        >
                                            Ver todos
                                        </Button>
                                    </HStack>

                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                        {upcomingTrips.map((trip) => (
                                            <Card key={trip.id} bg="white" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                                                <CardBody p={0}>
                                                    <Box position="relative">
                                                        {/* Trip Image Placeholder */}
                                                        <Flex
                                                            h="160px"
                                                            align="center"
                                                            justify="center"
                                                            bg="gradient-to-br"
                                                            bgGradient={`linear(to-br, ${trip.id % 2 === 0 ? 'blue.400, purple.600' : 'orange.400, red.600'})`}
                                                            borderTopRadius="xl"
                                                            color="white"
                                                            fontSize="4xl"
                                                        >
                                                            {trip.image}
                                                        </Flex>

                                                        {/* Like Button */}
                                                        <IconButton
                                                            icon={<FiHeart />}
                                                            size="sm"
                                                            variant="solid"
                                                            bg={trip.liked ? "red.500" : "white"}
                                                            color={trip.liked ? "white" : "gray.600"}
                                                            position="absolute"
                                                            top={4}
                                                            right={4}
                                                            borderRadius="full"
                                                            _hover={{
                                                                bg: trip.liked ? "red.600" : "gray.100"
                                                            }}
                                                            onClick={() => handleLikeTrip(trip.id)}
                                                        />
                                                    </Box>

                                                    <VStack spacing={4} p={6} align="stretch">
                                                        <VStack spacing={2} align="start">
                                                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                                                {trip.title}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {trip.location}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.600">
                                                                {trip.dates}
                                                            </Text>
                                                        </VStack>

                                                        <HStack justify="space-between">
                                                            <HStack spacing={2}>
                                                                <AvatarGroup size="sm" max={3}>
                                                                    {trip.friends.map((friend, idx) => (
                                                                        <Avatar
                                                                            key={idx}
                                                                            name={friend.name}
                                                                            bg="sage.400"
                                                                            color="white"
                                                                            size="sm"
                                                                        />
                                                                    ))}
                                                                </AvatarGroup>
                                                                {trip.additionalFriends > 0 && (
                                                                    <Text fontSize="xs" color="gray.500">
                                                                        + {trip.additionalFriends} amigos
                                                                    </Text>
                                                                )}
                                                            </HStack>

                                                            <HStack spacing={1}>
                                                                <Icon as={FiStar} color="yellow.400" boxSize={4} />
                                                                <Text fontSize="sm" fontWeight="600" color="gray.700">
                                                                    {trip.rating}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                    </VStack>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </VStack>
                            </VStack>
                        </GridItem>

                        {/* Sidebar Derecha */}
                        <GridItem display={{ base: "none", xl: "block" }}>
                            <VStack spacing={6} align="stretch">
                                {/* Calendar Widget */}
                                <Card bg="white">
                                    <CardBody p={6}>
                                        <VStack spacing={4} align="stretch">
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="600" color="gray.800">
                                                    Mayo 2025
                                                </Text>
                                                <HStack>
                                                    <IconButton icon={<Text>‹</Text>} size="sm" variant="ghost" />
                                                    <IconButton icon={<Text>›</Text>} size="sm" variant="ghost" />
                                                </HStack>
                                            </HStack>

                                            {/* Calendar Grid */}
                                            <SimpleGrid columns={7} spacing={1} fontSize="sm">
                                                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(day => (
                                                    <Text key={day} textAlign="center" color="gray.500" fontWeight="500" py={2}>
                                                        {day}
                                                    </Text>
                                                ))}
                                                {Array.from({length: 31}, (_, i) => (
                                                    <Flex
                                                        key={i}
                                                        align="center"
                                                        justify="center"
                                                        h={8}
                                                        w={8}
                                                        borderRadius="md"
                                                        bg={[4, 7, 20].includes(i + 1) ? "sage.400" : "transparent"}
                                                        color={[4, 7, 20].includes(i + 1) ? "white" : "gray.700"}
                                                        cursor="pointer"
                                                        _hover={{ bg: [4, 7, 20].includes(i + 1) ? "sage.500" : "gray.100" }}
                                                    >
                                                        {i + 1}
                                                    </Flex>
                                                ))}
                                            </SimpleGrid>

                                            <Divider />

                                            <VStack spacing={3}>
                                                <HStack spacing={3} w="full">
                                                    <Box w={3} h={3} bg="sage.400" borderRadius="full" />
                                                    <Text fontSize="sm" color="gray.600">2 eventos</Text>
                                                </HStack>
                                                <HStack spacing={3} w="full">
                                                    <Box w={3} h={3} bg="blue.400" borderRadius="full" />
                                                    <Text fontSize="sm" color="gray.600">1 nueva invitación</Text>
                                                </HStack>
                                            </VStack>
                                        </VStack>
                                    </CardBody>
                                </Card>

                                {/* Friends List */}
                                <Card bg="white">
                                    <CardBody p={6}>
                                        <VStack spacing={4} align="stretch">
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="600" color="gray.800">
                                                    Mis amigos
                                                </Text>
                                                <Button size="sm" variant="ghost" colorScheme="sage">
                                                    Ver todos
                                                </Button>
                                            </HStack>

                                            <VStack spacing={4}>
                                                {friends.map((friend, index) => (
                                                    <HStack key={index} spacing={3} w="full">
                                                        <Avatar
                                                            name={friend.name}
                                                            bg="sage.400"
                                                            color="white"
                                                            size="sm"
                                                        />
                                                        <VStack spacing={0} align="start" flex={1}>
                                                            <Text fontSize="sm" fontWeight="500" color="gray.800">
                                                                {friend.name}
                                                            </Text>
                                                            <Text fontSize="xs" color="gray.500">
                                                                {friend.email}
                                                            </Text>
                                                        </VStack>
                                                        <IconButton
                                                            icon={<FiUsers />}
                                                            size="sm"
                                                            variant="ghost"
                                                            color="gray.400"
                                                        />
                                                    </HStack>
                                                ))}
                                            </VStack>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            </VStack>
                        </GridItem>
                    </Grid>
                </VStack>
            </Box>
        </Container>
    )
}

export default DashboardPage