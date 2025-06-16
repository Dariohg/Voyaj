import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Button,
    Avatar,
    Badge,
    Card,
    CardBody,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Box,
    Flex
} from '@chakra-ui/react'
import {
    FiUser,
    FiEdit2,
    FiLock,
    FiMapPin,
    FiCalendar,
    FiMail,
    FiPhone,
    FiGlobe,
    FiCamera,
    FiFlag
} from 'react-icons/fi'

const ProfileHeader = ({ user, stats, onEditProfile, onChangePassword }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const calculateAge = (birthDate) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }

        return age
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Header principal */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={8}>
                    <Flex direction={{ base: 'column', md: 'row' }} gap={6} align="start">
                        {/* Avatar y información básica */}
                        <VStack spacing={4} align="center" flex="0 0 auto">
                            <Avatar
                                size="2xl"
                                name={user.name}
                                src={user.avatar}
                                bg="sage.400"
                                color="white"
                                border="4px solid"
                                borderColor="sage.100"
                            />
                            <VStack spacing={1} textAlign="center">
                                <Heading size="lg" color="gray.800">
                                    {user.name}
                                </Heading>
                                <Badge
                                    colorScheme="sage"
                                    variant="solid"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    fontSize="sm"
                                >
                                    Plan {user.plan}
                                </Badge>
                            </VStack>
                        </VStack>

                        {/* Información detallada */}
                        <VStack spacing={4} align="start" flex={1}>
                            <VStack spacing={3} align="start" w="full">
                                <Text color="gray.700" fontSize="md" lineHeight="1.6">
                                    {user.bio}
                                </Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="full">
                                    <HStack spacing={2}>
                                        <Icon as={FiMail} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {user.email}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiPhone} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {user.phone}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiMapPin} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {user.city}, {user.country}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {calculateAge(user.birthDate)} años
                                        </Text>
                                    </HStack>
                                </SimpleGrid>

                                <HStack spacing={2}>
                                    <Icon as={FiUser} boxSize={4} color="gray.500" />
                                    <Text fontSize="sm" color="gray.600">
                                        Miembro desde {formatDate(user.joinDate)}
                                    </Text>
                                </HStack>
                            </VStack>

                            {/* Botones de acción */}
                            <HStack spacing={3} pt={2}>
                                <Button
                                    leftIcon={<FiEdit2 />}
                                    bg="sage.400"
                                    color="white"
                                    onClick={onEditProfile}
                                    _hover={{ bg: "sage.500" }}
                                    size="md"
                                >
                                    Editar Perfil
                                </Button>
                                <Button
                                    leftIcon={<FiLock />}
                                    variant="outline"
                                    colorScheme="sage"
                                    onClick={onChangePassword}
                                    size="md"
                                >
                                    Cambiar Contraseña
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>

            {/* Estadísticas */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="blue.100" borderRadius="xl">
                                <Icon as={FiFlag} boxSize={6} color="blue.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="blue.500" fontSize="2xl" fontWeight="700">{stats.totalTrips}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Viajes Totales</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="green.100" borderRadius="xl">
                                <Icon as={FiGlobe} boxSize={6} color="green.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="green.500" fontSize="2xl" fontWeight="700">{stats.totalCountries}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Países Visitados</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="purple.100" borderRadius="xl">
                                <Icon as={FiCamera} boxSize={6} color="purple.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="purple.500" fontSize="2xl" fontWeight="700">{stats.totalPhotos}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Fotos Subidas</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="orange.100" borderRadius="xl">
                                <Icon as={FiMapPin} boxSize={6} color="orange.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="orange.500" fontSize="2xl" fontWeight="700">{(stats.totalDistance / 1000).toFixed(0)}K</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">KM Recorridos</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </VStack>
    )
}

export default ProfileHeader