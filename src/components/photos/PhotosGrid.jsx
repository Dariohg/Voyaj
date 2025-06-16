import {
    Box,
    Image,
    VStack,
    HStack,
    Text,
    Icon,
    Avatar,
    Badge,
    IconButton,
    useBreakpointValue
} from '@chakra-ui/react'
import {
    FiHeart,
    FiMapPin,
    FiCalendar,
    FiMoreVertical
} from 'react-icons/fi'
import { useState, useEffect } from 'react'

const PhotoCard = ({ photo, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            bg="white"
            border="1px"
            borderColor="gray.200"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(photo)}
        >
            {/* Imagen */}
            <Box position="relative">
                <Image
                    src={photo.url}
                    alt={photo.title}
                    w="100%"
                    h="auto"
                    objectFit="cover"
                    onLoad={() => setImageLoaded(true)}
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.02)" }}
                />

                {/* Overlay en hover */}
                {isHovered && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.400"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.3s ease"
                    >
                        <VStack spacing={2}>
                            <Text color="white" fontSize="lg" fontWeight="600" textAlign="center">
                                {photo.title}
                            </Text>
                            <HStack spacing={1}>
                                <Icon as={FiHeart} color="white" boxSize={4} />
                                <Text color="white" fontSize="sm">
                                    {photo.likes}
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                )}

                {/* Badge del día del viaje */}
                <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    bg="sage.400"
                    color="white"
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="md"
                >
                    {photo.tripDay}
                </Badge>

                {/* Menú de opciones */}
                <IconButton
                    position="absolute"
                    top={3}
                    right={3}
                    icon={<FiMoreVertical />}
                    size="sm"
                    variant="solid"
                    bg="whiteAlpha.800"
                    color="gray.600"
                    _hover={{ bg: "white" }}
                    opacity={isHovered ? 1 : 0}
                    transition="opacity 0.3s ease"
                />
            </Box>

            {/* Información de la foto */}
            <VStack spacing={3} p={4} align="stretch">
                <VStack spacing={1} align="start">
                    <Text fontSize="md" fontWeight="600" color="gray.800" noOfLines={1}>
                        {photo.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {photo.description}
                    </Text>
                </VStack>

                <VStack spacing={2} align="start">
                    <HStack spacing={2}>
                        <Icon as={FiMapPin} boxSize={3} color="gray.400" />
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>
                            {photo.location}
                        </Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Icon as={FiCalendar} boxSize={3} color="gray.400" />
                        <Text fontSize="xs" color="gray.500">
                            {new Date(photo.date).toLocaleDateString('es-ES')}
                        </Text>
                    </HStack>
                </VStack>

                {/* Usuario que subió la foto */}
                <HStack justify="space-between" align="center">
                    <HStack spacing={2}>
                        <Avatar size="xs" name={photo.uploadedBy} bg="sage.400" color="white" />
                        <Text fontSize="xs" color="gray.600" fontWeight="500">
                            {photo.uploadedBy}
                        </Text>
                    </HStack>
                    <HStack spacing={1}>
                        <Icon as={FiHeart} boxSize={3} color="gray.400" />
                        <Text fontSize="xs" color="gray.500">
                            {photo.likes}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}

const PhotosGrid = ({ photos, onPhotoClick }) => {
    const columns = useBreakpointValue({ base: 2, md: 3, lg: 4, xl: 5 })
    const [columnizedPhotos, setColumnizedPhotos] = useState([])

    useEffect(() => {
        if (!photos.length || !columns) return

        // Crear columnas vacías
        const newColumns = Array.from({ length: columns }, () => [])

        // Distribuir fotos en columnas (simulando masonry)
        photos.forEach((photo, index) => {
            const columnIndex = index % columns
            newColumns[columnIndex].push(photo)
        })

        setColumnizedPhotos(newColumns)
    }, [photos, columns])

    if (!photos.length) {
        return (
            <Box textAlign="center" py={12}>
                <Icon as={FiCalendar} boxSize={16} color="gray.300" mb={4} />
                <Text fontSize="lg" color="gray.600" mb={2}>
                    No hay fotos para mostrar
                </Text>
                <Text color="gray.500">
                    Cambia el filtro o sube algunas fotos
                </Text>
            </Box>
        )
    }

    return (
        <Box w="full">
            <HStack
                align="start"
                spacing={4}
                w="full"
                sx={{
                    '@media (max-width: 768px)': {
                        spacing: 2
                    }
                }}
            >
                {columnizedPhotos.map((column, columnIndex) => (
                    <VStack
                        key={columnIndex}
                        spacing={4}
                        flex={1}
                        sx={{
                            '@media (max-width: 768px)': {
                                spacing: 2
                            }
                        }}
                    >
                        {column.map((photo) => (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onClick={onPhotoClick}
                            />
                        ))}
                    </VStack>
                ))}
            </HStack>
        </Box>
    )
}

export default PhotosGrid