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
    Box,
    Flex
} from '@chakra-ui/react'
import {
    FiAward,
    FiLock
} from 'react-icons/fi'

const AchievementsTab = ({ achievements }) => {
    const earnedAchievements = achievements.filter(a => a.earned)
    const upcomingAchievements = achievements.filter(a => !a.earned)

    const completionPercentage = (earnedAchievements.length / achievements.length) * 100

    const formatDate = (dateString) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Resumen de logros */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={4} align="start">
                        <HStack justify="space-between" w="full">
                            <Heading size="md" color="gray.800">Progreso de Logros</Heading>
                            <Badge
                                colorScheme="sage"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                            >
                                {earnedAchievements.length}/{achievements.length}
                            </Badge>
                        </HStack>

                        <VStack spacing={2} align="start" w="full">
                            <HStack justify="space-between" w="full">
                                <Text fontSize="sm" color="gray.600" fontWeight="500">
                                    Logros completados
                                </Text>
                                <Text fontSize="sm" color="gray.700" fontWeight="600">
                                    {Math.round(completionPercentage)}%
                                </Text>
                            </HStack>
                            <Progress
                                value={completionPercentage}
                                size="md"
                                colorScheme="sage"
                                borderRadius="full"
                                bg="gray.200"
                                w="full"
                            />
                        </VStack>
                    </VStack>
                </CardBody>
            </Card>

            {/* Logros obtenidos */}
            <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.800">Logros Obtenidos</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {earnedAchievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            bg="white"
                            border="2px"
                            borderColor="sage.200"
                            _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                            transition="all 0.2s"
                        >
                            <CardBody p={6}>
                                <Flex align="start" gap={4}>
                                    <Box
                                        fontSize="3xl"
                                        p={3}
                                        bg="sage.100"
                                        borderRadius="xl"
                                        border="2px solid"
                                        borderColor="sage.300"
                                    >
                                        {achievement.icon}
                                    </Box>

                                    <VStack spacing={2} align="start" flex={1}>
                                        <HStack justify="space-between" w="full">
                                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                                {achievement.title}
                                            </Text>
                                            <Icon as={FiAward} color="sage.500" boxSize={5} />
                                        </HStack>

                                        <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                                            {achievement.description}
                                        </Text>

                                        <HStack spacing={2}>
                                            <Badge
                                                colorScheme="green"
                                                variant="subtle"
                                                fontSize="xs"
                                                px={2}
                                                py={1}
                                                borderRadius="md"
                                            >
                                                Completado
                                            </Badge>
                                            <Text fontSize="xs" color="gray.500">
                                                {formatDate(achievement.date)}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </Flex>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>

            {/* Próximos logros */}
            <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.800">Próximos Logros</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {upcomingAchievements.map((achievement) => (
                        <Card
                            key={achievement.id}
                            bg="gray.50"
                            border="1px"
                            borderColor="gray.200"
                            opacity={0.7}
                        >
                            <CardBody p={6}>
                                <Flex align="start" gap={4}>
                                    <Box
                                        fontSize="3xl"
                                        p={3}
                                        bg="gray.200"
                                        borderRadius="xl"
                                        border="2px solid"
                                        borderColor="gray.300"
                                        position="relative"
                                    >
                                        {achievement.icon}
                                        <Box
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            bg="gray.600"
                                            borderRadius="full"
                                            p={1}
                                        >
                                            <Icon as={FiLock} color="white" boxSize={3} />
                                        </Box>
                                    </Box>

                                    <VStack spacing={2} align="start" flex={1}>
                                        <HStack justify="space-between" w="full">
                                            <Text fontSize="lg" fontWeight="600" color="gray.600">
                                                {achievement.title}
                                            </Text>
                                            <Icon as={FiLock} color="gray.400" boxSize={5} />
                                        </HStack>

                                        <Text fontSize="sm" color="gray.500" lineHeight="1.5">
                                            {achievement.description}
                                        </Text>

                                        <Badge
                                            colorScheme="gray"
                                            variant="subtle"
                                            fontSize="xs"
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                        >
                                            Bloqueado
                                        </Badge>
                                    </VStack>
                                </Flex>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </VStack>
    )
}

export default AchievementsTab