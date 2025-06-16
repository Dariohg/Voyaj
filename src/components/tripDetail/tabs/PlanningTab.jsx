import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Button,
    SimpleGrid,
    Card,
    CardBody,
    IconButton
} from '@chakra-ui/react'
import {
    FiPlus,
    FiCheck,
    FiClock,
    FiMapPin,
    FiDollarSign,
    FiMoreHorizontal
} from 'react-icons/fi'

const PlanningTab = ({ activities, tripData, onActivityOpen }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatCurrency = (amount) => {
        return `${tripData.moneda === 'USD' ? '$' : tripData.moneda === 'EUR' ? '€' : ''}${amount.toLocaleString()}`
    }

    return (
        <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
                <Heading size="md" color="gray.800">Itinerario</Heading>
                <Button
                    leftIcon={<FiPlus />}
                    bg="sage.400"
                    color="white"
                    onClick={onActivityOpen}
                    _hover={{ bg: "sage.500" }}
                >
                    Nueva Actividad
                </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {activities.map((activity) => (
                    <Card key={activity.id} bg="white" border="1px" borderColor="gray.200">
                        <CardBody>
                            <VStack spacing={3} align="stretch">
                                <HStack justify="space-between">
                                    <HStack spacing={2}>
                                        <Icon
                                            as={activity.completed ? FiCheck : FiClock}
                                            color={activity.completed ? "green.500" : "orange.400"}
                                        />
                                        <Text fontSize="sm" color="gray.600">
                                            {formatDate(activity.date)} - {activity.time}
                                        </Text>
                                    </HStack>
                                    <IconButton
                                        icon={<FiMoreHorizontal />}
                                        size="sm"
                                        variant="ghost"
                                    />
                                </HStack>

                                <VStack spacing={2} align="start">
                                    <Text fontWeight="600" color="gray.800">
                                        {activity.title}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {activity.description}
                                    </Text>
                                    <HStack spacing={4}>
                                        <HStack spacing={1}>
                                            <Icon as={FiMapPin} boxSize={3} color="gray.400" />
                                            <Text fontSize="xs" color="gray.500">
                                                {activity.location}
                                            </Text>
                                        </HStack>
                                        {activity.estimatedCost > 0 && (
                                            <HStack spacing={1}>
                                                <Icon as={FiDollarSign} boxSize={3} color="gray.400" />
                                                <Text fontSize="xs" color="gray.500">
                                                    {formatCurrency(activity.estimatedCost)}
                                                </Text>
                                            </HStack>
                                        )}
                                    </HStack>
                                </VStack>
                            </VStack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default PlanningTab