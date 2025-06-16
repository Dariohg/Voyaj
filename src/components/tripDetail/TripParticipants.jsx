import {
    Card,
    CardHeader,
    CardBody,
    HStack,
    VStack,
    Text,
    Icon,
    Button,
    Avatar
} from '@chakra-ui/react'
import {
    FiUsers,
    FiPlus
} from 'react-icons/fi'

const TripParticipants = ({ tripData, user }) => {
    return (
        <Card bg="white" border="1px" borderColor="gray.200">
            <CardHeader>
                <HStack justify="space-between">
                    <HStack spacing={3}>
                        <Icon as={FiUsers} color="sage.400" />
                        <Text fontSize="lg" fontWeight="600" color="gray.800">
                            Compañeros de viaje
                        </Text>
                    </HStack>
                    <Button size="sm" leftIcon={<FiPlus />} variant="outline" colorScheme="sage">
                        Invitar
                    </Button>
                </HStack>
            </CardHeader>
            <CardBody pt={0}>
                <HStack spacing={4}>
                    <VStack spacing={1} align="center">
                        <Avatar name={user?.name || "Tú"} bg="sage.400" color="white" size="md" />
                        <Text fontSize="sm" color="gray.600" fontWeight="500">
                            Tú
                        </Text>
                    </VStack>
                    {tripData.participantes.map((participante, idx) => (
                        <VStack key={idx} spacing={1} align="center">
                            <Avatar name={participante} bg="blue.400" color="white" size="md" />
                            <Text fontSize="sm" color="gray.600" fontWeight="500">
                                {participante.split(' ')[0]}
                            </Text>
                        </VStack>
                    ))}
                </HStack>
            </CardBody>
        </Card>
    )
}

export default TripParticipants