import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Button,
    Box
} from '@chakra-ui/react'
import {
    FiUpload,
    FiCamera
} from 'react-icons/fi'

const PhotosTab = () => {
    return (
        <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
                <Heading size="md" color="gray.800">Galería de Fotos</Heading>
                <Button
                    leftIcon={<FiUpload />}
                    bg="sage.400"
                    color="white"
                    _hover={{ bg: "sage.500" }}
                >
                    Subir Fotos
                </Button>
            </HStack>

            <Box textAlign="center" py={12}>
                <Icon as={FiCamera} boxSize={16} color="gray.300" mb={4} />
                <Text fontSize="lg" color="gray.600" mb={2}>
                    Galería de fotos próximamente
                </Text>
                <Text color="gray.500">
                    Aquí podrás ver todas tus fotos organizadas por días y ubicaciones
                </Text>
            </Box>
        </VStack>
    )
}

export default PhotosTab