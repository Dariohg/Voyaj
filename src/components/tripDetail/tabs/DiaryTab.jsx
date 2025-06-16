import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Button,
    Card,
    CardBody,
    Badge
} from '@chakra-ui/react'
import {
    FiPlus,
    FiCamera
} from 'react-icons/fi'

const DiaryTab = ({ diaryEntries, onDiaryOpen }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
                <Heading size="md" color="gray.800">Diario de Viaje</Heading>
                <Button
                    leftIcon={<FiPlus />}
                    bg="sage.400"
                    color="white"
                    onClick={onDiaryOpen}
                    _hover={{ bg: "sage.500" }}
                >
                    Nueva Entrada
                </Button>
            </HStack>

            <VStack spacing={4} align="stretch">
                {diaryEntries.map((entry) => (
                    <Card key={entry.id} bg="white" border="1px" borderColor="gray.200">
                        <CardBody>
                            <VStack spacing={4} align="stretch">
                                <HStack justify="space-between">
                                    <VStack spacing={1} align="start">
                                        <Text fontWeight="600" color="gray.800" fontSize="lg">
                                            {entry.title}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {formatDate(entry.date)}
                                        </Text>
                                    </VStack>
                                    <HStack spacing={2}>
                                        <Badge colorScheme="yellow" variant="subtle">
                                            {entry.mood}
                                        </Badge>
                                        <HStack spacing={1}>
                                            <Icon as={FiCamera} boxSize={4} color="gray.400" />
                                            <Text fontSize="sm" color="gray.500">
                                                {entry.photos}
                                            </Text>
                                        </HStack>
                                    </HStack>
                                </HStack>
                                <Text color="gray.700" lineHeight="1.6">
                                    {entry.content}
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                ))}
            </VStack>
        </VStack>
    )
}

export default DiaryTab