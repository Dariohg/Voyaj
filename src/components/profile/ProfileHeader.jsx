// src/components/profile/ProfileHeader.jsx - Versión responsive corregida
import {
    VStack,
    HStack,
    Heading,
    Text,
    Card,
    CardBody,
    Button,
    Avatar,
    Badge,
    SimpleGrid,
    Icon,
    Box,
    Stat,
    StatLabel,
    StatNumber,
    Flex
} from '@chakra-ui/react'
import {
    FiEdit,
    FiLock,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiUsers,
    FiFlag,
    FiCamera
} from 'react-icons/fi'

const ProfileHeader = ({ user, stats, onEditProfile, onChangePassword }) => {
    const formatJoinDate = (dateString) => {
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
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
            {/* Información principal del perfil */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={{ base: 4, md: 6 }}>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, md: 6 }}
                        align={{ base: "center", md: "start" }}
                    >
                        {/* Avatar y info básica */}
                        <VStack spacing={4} align="center" minW={{ md: "280px" }}>
                            <Avatar
                                size={{ base: "xl", md: "2xl" }}
                                name={user.name}
                                src={user.avatar}
                                bg="sage.400"
                                color="white"
                                border="4px solid"
                                borderColor="sage.100"
                            />
                            <VStack spacing={2} align="center">
                                <Heading
                                    size={{ base: "md", md: "lg" }}
                                    color="gray.800"
                                    textAlign="center"
                                >
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
                        <VStack spacing={4} align="start" flex={1} w="full">
                            <VStack spacing={3} align="start" w="full">
                                <Text
                                    color="gray.700"
                                    fontSize={{ base: "sm", md: "md" }}
                                    lineHeight="1.6"
                                    textAlign={{ base: "center", md: "left" }}
                                >
                                    {user.bio}
                                </Text>

                                <SimpleGrid
                                    columns={{ base: 1, sm: 2 }}
                                    spacing={3}
                                    w="full"
                                >
                                    <HStack spacing={2}>
                                        <Icon as={FiMail} boxSize={4} color="gray.500" />
                                        <Text
                                            fontSize={{ base: "xs", md: "sm" }}
                                            color="gray.600"
                                            isTruncated
                                        >
                                            {user.email}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiPhone} boxSize={4} color="gray.500" />
                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                            {user.phone}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiMapPin} boxSize={4} color="gray.500" />
                                        <Text
                                            fontSize={{ base: "xs", md: "sm" }}
                                            color="gray.600"
                                            isTruncated
                                        >
                                            {user.city}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                            {calculateAge(user.birthDate)} años
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiUsers} boxSize={4} color="gray.500" />
                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                            Miembro desde {formatJoinDate(user.joinDate)}
                                        </Text>
                                    </HStack>
                                </SimpleGrid>
                            </VStack>

                            {/* Botones de acción */}
                            <HStack
                                spacing={3}
                                w="full"
                                justify={{ base: "center", md: "flex-end" }}
                                flexWrap="wrap"
                            >
                                <Button
                                    leftIcon={<Icon as={FiEdit} />}
                                    colorScheme="sage"
                                    variant="solid"
                                    onClick={onEditProfile}
                                    size={{ base: "sm", md: "md" }}
                                    minW={{ base: "120px", md: "auto" }}
                                >
                                    Editar Perfil
                                </Button>
                                <Button
                                    leftIcon={<Icon as={FiLock} />}
                                    variant="outline"
                                    borderColor="gray.300"
                                    color="gray.700"
                                    bg="white"
                                    onClick={onChangePassword}
                                    size={{ base: "sm", md: "md" }}
                                    minW={{ base: "160px", md: "auto" }}
                                    _hover={{
                                        borderColor: "sage.400",
                                        color: "sage.600",
                                        bg: "sage.50"
                                    }}
                                    whiteSpace="nowrap"
                                >
                                    Cambiar Contraseña
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>

            {/* Estadísticas - Grid responsive */}
            <SimpleGrid
                columns={{ base: 2, md: 4 }}
                spacing={{ base: 3, md: 4 }}
                w="full"
            >
                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="blue.100" borderRadius="xl">
                                <Icon as={FiFlag} boxSize={{ base: 5, md: 6 }} color="blue.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="blue.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {stats.totalTrips}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Viajes</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Viajes Totales</Box>
                                </StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="green.100" borderRadius="xl">
                                <Icon as={FiMapPin} boxSize={{ base: 5, md: 6 }} color="green.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="green.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {stats.totalCountries}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Países</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Países Visitados</Box>
                                </StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="purple.100" borderRadius="xl">
                                <Icon as={FiCamera} boxSize={{ base: 5, md: 6 }} color="purple.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="purple.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {stats.totalPhotos}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Fotos</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Fotos Subidas</Box>
                                </StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="orange.100" borderRadius="xl">
                                <Icon as={FiMapPin} boxSize={{ base: 5, md: 6 }} color="orange.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="orange.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {(stats.totalDistance / 1000).toFixed(0)}K
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>KM</Box>
                                    <Box display={{ base: "none", sm: "block" }}>KM Recorridos</Box>
                                </StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </VStack>
    )
}

export default ProfileHeader