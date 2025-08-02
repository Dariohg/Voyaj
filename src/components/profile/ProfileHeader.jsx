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
    FiMapPin,
    FiUsers,
    FiCalendar
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

    return (
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={{ base: 4, md: 6 }}>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, md: 6 }}
                        align={{ base: "center", md: "start" }}
                    >
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

                        <VStack spacing={4} align="start" flex={1} w="full">
                            <VStack spacing={3} align="start" w="full">
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
                                        <Icon as={FiUsers} boxSize={4} color="gray.500" />
                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                            Miembro desde {formatJoinDate(user.joinDate)}
                                        </Text>
                                    </HStack>
                                </SimpleGrid>
                            </VStack>

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
                                    onClick={onChangePassword}
                                    size={{ base: "sm", md: "md" }}
                                    minW={{ base: "120px", md: "auto" }}
                                >
                                    Cambiar Contraseña
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>
                </CardBody>
            </Card>

            <SimpleGrid
                columns={{ base: 2, sm: 4 }}
                spacing={{ base: 3, md: 4 }}
            >
                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="blue.100" borderRadius="xl">
                                <Icon as={FiMapPin} boxSize={{ base: 5, md: 6 }} color="blue.500" />
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
                                <Icon as={FiCalendar} boxSize={{ base: 5, md: 6 }} color="green.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="green.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {stats.completedTrips}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Completados</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Completados</Box>
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
                                    {stats.activeTrips}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Activos</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Activos</Box>
                                </StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={{ base: 4, md: 6 }}>
                        <VStack spacing={{ base: 2, md: 3 }} align="center">
                            <Box p={{ base: 2, md: 3 }} bg="purple.100" borderRadius="xl">
                                <Icon as={FiCalendar} boxSize={{ base: 5, md: 6 }} color="purple.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber
                                    color="purple.500"
                                    fontSize={{ base: "xl", md: "2xl" }}
                                    fontWeight="700"
                                >
                                    {stats.upcomingTrips}
                                </StatNumber>
                                <StatLabel
                                    color="gray.600"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    fontWeight="500"
                                >
                                    <Box display={{ base: "block", sm: "none" }}>Próximos</Box>
                                    <Box display={{ base: "none", sm: "block" }}>Próximos</Box>
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