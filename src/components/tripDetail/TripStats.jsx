import {
    SimpleGrid,
    Card,
    CardBody,
    VStack,
    Box,
    Icon,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    CircularProgress,
    CircularProgressLabel
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiCheck,
    FiCamera
} from 'react-icons/fi'

const TripStats = ({ tripData, activities, diaryEntries }) => {
    const getDaysRemaining = () => {
        const today = new Date()
        const endDate = new Date(tripData.fecha_fin)
        const diffTime = endDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 0 ? diffDays : 0
    }

    const getBudgetProgress = () => {
        return (tripData.gasto_actual / tripData.presupuesto_estimado) * 100
    }

    const formatCurrency = (amount) => {
        return `${tripData.moneda === 'USD' ? '$' : tripData.moneda === 'EUR' ? '€' : ''}${amount.toLocaleString()}`
    }

    const budgetProgress = getBudgetProgress()

    return (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={2} align="center">
                        <CircularProgress
                            value={budgetProgress}
                            size="60px"
                            color={budgetProgress > 100 ? "red.400" : "sage.400"}
                        >
                            <CircularProgressLabel fontSize="sm" fontWeight="600">
                                {Math.round(budgetProgress)}%
                            </CircularProgressLabel>
                        </CircularProgress>
                        <Stat textAlign="center">
                            <StatLabel color="gray.600" fontSize="xs">Presupuesto</StatLabel>
                            <StatNumber color="gray.800" fontSize="lg">
                                {formatCurrency(tripData.gasto_actual)}
                            </StatNumber>
                            <StatHelpText color="gray.500" fontSize="xs">
                                de {formatCurrency(tripData.presupuesto_estimado)}
                            </StatHelpText>
                        </Stat>
                    </VStack>
                </CardBody>
            </Card>

            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={2} align="center">
                        <Box p={3} bg="blue.100" borderRadius="xl">
                            <Icon as={FiCalendar} boxSize={6} color="blue.500" />
                        </Box>
                        <Stat textAlign="center">
                            <StatLabel color="gray.600" fontSize="xs">Días restantes</StatLabel>
                            <StatNumber color="blue.500" fontSize="2xl">
                                {getDaysRemaining()}
                            </StatNumber>
                        </Stat>
                    </VStack>
                </CardBody>
            </Card>

            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={2} align="center">
                        <Box p={3} bg="green.100" borderRadius="xl">
                            <Icon as={FiCheck} boxSize={6} color="green.500" />
                        </Box>
                        <Stat textAlign="center">
                            <StatLabel color="gray.600" fontSize="xs">Actividades</StatLabel>
                            <StatNumber color="green.500" fontSize="2xl">
                                {activities.filter(a => a.completed).length}/{activities.length}
                            </StatNumber>
                        </Stat>
                    </VStack>
                </CardBody>
            </Card>

            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={2} align="center">
                        <Box p={3} bg="purple.100" borderRadius="xl">
                            <Icon as={FiCamera} boxSize={6} color="purple.500" />
                        </Box>
                        <Stat textAlign="center">
                            <StatLabel color="gray.600" fontSize="xs">Fotos</StatLabel>
                            <StatNumber color="purple.500" fontSize="2xl">
                                {diaryEntries.reduce((total, entry) => total + (entry.photos || 0), 0)}
                            </StatNumber>
                        </Stat>
                    </VStack>
                </CardBody>
            </Card>
        </SimpleGrid>
    )
}

export default TripStats