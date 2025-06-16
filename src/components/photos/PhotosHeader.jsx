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
    Stat,
    StatLabel,
    StatNumber,
    Box
} from '@chakra-ui/react'
import {
    FiArrowLeft,
    FiCamera,
    FiUpload,
    FiUsers,
    FiImage
} from 'react-icons/fi'

const PhotosHeader = ({ onNavigate, totalPhotos, myPhotos }) => {
    return (
        <VStack spacing={6} align="stretch">
            {/* Header Navigation */}
            <VStack spacing={4} align="start">
                <Button
                    leftIcon={<FiArrowLeft />}
                    variant="ghost"
                    onClick={() => onNavigate('/dashboard')}
                    alignSelf="flex-start"
                    color="gray.600"
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{
                        bg: "gray.50",
                        borderColor: "gray.300",
                        color: "gray.800"
                    }}
                >
                    Volver al Dashboard
                </Button>

                <HStack justify="space-between" w="full" align="start">
                    <VStack spacing={2} align="start">
                        <HStack spacing={3}>
                            <Icon as={FiCamera} boxSize={8} color="sage.400" />
                            <Heading size="xl" color="gray.800">
                                Galería de Fotos
                            </Heading>
                        </HStack>
                        <Text color="gray.600" fontSize="lg">
                            Todas las fotos de tu viaje en un solo lugar
                        </Text>
                    </VStack>

                    <Button
                        leftIcon={<FiUpload />}
                        bg="sage.400"
                        color="white"
                        _hover={{ bg: "sage.500" }}
                        size="lg"
                    >
                        Subir Fotos
                    </Button>
                </HStack>
            </VStack>

            {/* Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="blue.100" borderRadius="xl">
                                <Icon as={FiImage} boxSize={6} color="blue.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="blue.500" fontSize="3xl" fontWeight="700">{totalPhotos}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Total de Fotos</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="green.100" borderRadius="xl">
                                <Icon as={FiCamera} boxSize={6} color="green.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="green.500" fontSize="3xl" fontWeight="700">{myPhotos}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Mis Fotos</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="purple.100" borderRadius="xl">
                                <Icon as={FiUsers} boxSize={6} color="purple.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="purple.500" fontSize="3xl" fontWeight="700">{totalPhotos - myPhotos}</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Del Grupo</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>

                <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                    <CardBody p={6}>
                        <VStack spacing={3} align="center">
                            <Box p={3} bg="orange.100" borderRadius="xl">
                                <Icon as={FiImage} boxSize={6} color="orange.500" />
                            </Box>
                            <Stat textAlign="center">
                                <StatNumber color="orange.500" fontSize="3xl" fontWeight="700">3</StatNumber>
                                <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Días Fotografiados</StatLabel>
                            </Stat>
                        </VStack>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </VStack>
    )
}

export default PhotosHeader