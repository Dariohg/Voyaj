import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Button,
    Badge,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import {
    FiArrowLeft,
    FiEdit,
    FiShare2,
    FiDownload,
    FiMapPin,
    FiCalendar,
    FiUsers,
    FiMoreHorizontal,
    FiTrash2
} from 'react-icons/fi'

const TripHeader = ({ tripData, onNavigate }) => {
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
        <VStack spacing={4} align="start">
            <Button
                leftIcon={<FiArrowLeft />}
                variant="ghost"
                onClick={() => onNavigate('/my-trips')}
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
                Volver a Mis Viajes
            </Button>

            <Flex justify="space-between" align="start" w="full" direction={{ base: 'column', md: 'row' }} gap={4}>
                <VStack spacing={3} align="start">
                    <HStack spacing={3}>
                        <Text fontSize="3xl">{tripData.imagen}</Text>
                        <VStack spacing={1} align="start">
                            <Heading size="xl" color="gray.800">
                                {tripData.titulo}
                            </Heading>
                            <HStack spacing={2}>
                                <Icon as={FiMapPin} boxSize={5} color="gray.500" />
                                <Text fontSize="lg" color="gray.600">
                                    {tripData.destino}
                                </Text>
                            </HStack>
                        </VStack>
                    </HStack>

                    <HStack spacing={4} wrap="wrap">
                        <Badge
                            colorScheme={tripData.esta_activo ? "green" : "blue"}
                            variant="solid"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                        >
                            {tripData.esta_activo ? "Viaje Activo" : "Completado"}
                        </Badge>
                        <HStack spacing={2}>
                            <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                            <Text fontSize="sm" color="gray.600">
                                {formatDate(tripData.fecha_inicio)} - {formatDate(tripData.fecha_fin)}
                            </Text>
                        </HStack>
                        {tripData.es_viaje_grupal && (
                            <HStack spacing={2}>
                                <Icon as={FiUsers} boxSize={4} color="gray.500" />
                                <Text fontSize="sm" color="gray.600">
                                    {tripData.participantes.length + 1} viajeros
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                </VStack>

                <HStack spacing={2}>
                    <Button
                        leftIcon={<FiShare2 />}
                        variant="outline"
                        colorScheme="sage"
                        size="md"
                    >
                        Compartir
                    </Button>
                    <Button
                        leftIcon={<FiDownload />}
                        variant="outline"
                        colorScheme="sage"
                        size="md"
                    >
                        Exportar
                    </Button>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FiMoreHorizontal />}
                            variant="outline"
                            colorScheme="sage"
                        />
                        <MenuList>
                            <MenuItem icon={<FiEdit />}>Editar viaje</MenuItem>
                            <MenuItem icon={<FiTrash2 />} color="red.500">Eliminar viaje</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Flex>
        </VStack>
    )
}

export default TripHeader