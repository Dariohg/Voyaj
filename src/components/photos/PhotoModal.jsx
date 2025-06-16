import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Image,
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    Avatar,
    Badge,
    Button,
    Divider,
    Wrap,
    WrapItem,
    Tag
} from '@chakra-ui/react'
import {
    FiMapPin,
    FiCalendar,
    FiHeart,
    FiDownload,
    FiShare2,
    FiUser
} from 'react-icons/fi'

const PhotoModal = ({ isOpen, onClose, photo }) => {
    if (!photo) return null

    const handleLikePhoto = () => {
        console.log('Like photo:', photo.id)
        // Aquí iría la lógica para dar like
    }

    const handleDownloadPhoto = () => {
        console.log('Download photo:', photo.id)
        // Aquí iría la lógica para descargar
    }

    const handleSharePhoto = () => {
        console.log('Share photo:', photo.id)
        // Aquí iría la lógica para compartir
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
            <ModalContent
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                maxH="90vh"
                mx={4}
            >
                <ModalCloseButton
                    color="gray.600"
                    zIndex={10}
                    bg="whiteAlpha.800"
                    borderRadius="full"
                    _hover={{ bg: "white" }}
                />

                <ModalBody p={0}>
                    <HStack spacing={0} align="stretch" h="80vh">
                        {/* Imagen */}
                        <Box
                            flex={2}
                            bg="gray.100"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                        >
                            <Image
                                src={photo.url}
                                alt={photo.title}
                                maxH="100%"
                                maxW="100%"
                                objectFit="contain"
                            />
                        </Box>

                        {/* Panel de información */}
                        <VStack
                            flex={1}
                            spacing={0}
                            align="stretch"
                            bg="white"
                            minW="350px"
                            maxW="400px"
                        >
                            {/* Header del panel */}
                            <VStack spacing={4} p={6} align="stretch">
                                <HStack justify="space-between" align="center">
                                    <HStack spacing={3}>
                                        <Avatar
                                            size="md"
                                            name={photo.uploadedBy}
                                            bg="sage.400"
                                            color="white"
                                        />
                                        <VStack spacing={0} align="start">
                                            <Text fontSize="md" fontWeight="600" color="gray.800">
                                                {photo.uploadedBy}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {new Date(photo.date).toLocaleDateString('es-ES', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <Badge
                                        bg="sage.400"
                                        color="white"
                                        fontSize="xs"
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                    >
                                        {photo.tripDay}
                                    </Badge>
                                </HStack>

                                <VStack spacing={2} align="start">
                                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                                        {photo.title}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                                        {photo.description}
                                    </Text>
                                </VStack>
                            </VStack>

                            <Divider />

                            {/* Información adicional */}
                            <VStack spacing={4} p={6} align="stretch" flex={1}>
                                <VStack spacing={3} align="start">
                                    <HStack spacing={2}>
                                        <Icon as={FiMapPin} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {photo.location}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={2}>
                                        <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {new Date(photo.date).toLocaleDateString('es-ES')}
                                        </Text>
                                    </HStack>
                                </VStack>

                                {/* Tags */}
                                {photo.tags && photo.tags.length > 0 && (
                                    <VStack spacing={2} align="start">
                                        <Text fontSize="sm" fontWeight="500" color="gray.700">
                                            Etiquetas:
                                        </Text>
                                        <Wrap>
                                            {photo.tags.map((tag, index) => (
                                                <WrapItem key={index}>
                                                    <Tag size="sm" colorScheme="sage" variant="subtle">
                                                        {tag}
                                                    </Tag>
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </VStack>
                                )}
                            </VStack>

                            <Divider />

                            {/* Acciones */}
                            <VStack spacing={4} p={6} align="stretch">
                                <HStack justify="space-between" align="center">
                                    <HStack spacing={1}>
                                        <Icon as={FiHeart} boxSize={4} color="gray.500" />
                                        <Text fontSize="sm" color="gray.600">
                                            {photo.likes} likes
                                        </Text>
                                    </HStack>
                                </HStack>

                                <HStack spacing={2}>
                                    <Button
                                        leftIcon={<FiHeart />}
                                        variant="outline"
                                        colorScheme="red"
                                        size="sm"
                                        flex={1}
                                        onClick={handleLikePhoto}
                                    >
                                        Me gusta
                                    </Button>
                                    <Button
                                        leftIcon={<FiDownload />}
                                        variant="outline"
                                        colorScheme="sage"
                                        size="sm"
                                        flex={1}
                                        onClick={handleDownloadPhoto}
                                    >
                                        Descargar
                                    </Button>
                                </HStack>

                                <Button
                                    leftIcon={<FiShare2 />}
                                    bg="sage.400"
                                    color="white"
                                    size="sm"
                                    onClick={handleSharePhoto}
                                    _hover={{ bg: "sage.500" }}
                                >
                                    Compartir foto
                                </Button>
                            </VStack>
                        </VStack>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default PhotoModal