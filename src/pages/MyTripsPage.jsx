import {
    Container,
    VStack,
    Heading,
    Text,
    Icon,
    Button,
    SimpleGrid,
    Card,
    CardBody,
    HStack,
    Badge,
    Progress,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Box,
    Avatar,
    AvatarGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiArrowLeft,
    FiSearch,
    FiFilter,
    FiMoreVertical,
    FiEdit,
    FiTrash2,
    FiCopy,
    FiEye,
    FiMapPin,
    FiClock,
    FiDollarSign,
    FiUsers,
    FiPlus,
    FiStar
} from 'react-icons/fi'
import { useState } from 'react'

const MyTripsPage = ({ onNavigate, onLogout, user }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('todos')
    const [sortBy, setSortBy] = useState('fecha_desc')

    // Datos de ejemplo de viajes
    const [viajes] = useState([
        {
            id: 1,
            titulo: "Viaje a Japón",
            destino: "Tokio, Japón",
            fecha_inicio: "2024-07-15",
            fecha_fin: "2024-07-28",
            presupuesto_estimado: 2500,
            gasto_actual: 1680,
            esta_activo: true,
            es_viaje_grupal: true,
            participantes: ["Ana García", "Carlos López"],
            categoria: "vacaciones",
            imagen: "🇯🇵",
            progreso: 67,
            moneda: "USD"
        },
        {
            id: 2,
            titulo: "Europa Backpack",
            destino: "París, Francia",
            fecha_inicio: "2024-08-20",
            fecha_fin: "2024-09-15",
            presupuesto_estimado: 3200,
            gasto_actual: 0,
            esta_activo: true,
            es_viaje_grupal: false,
            participantes: [],
            categoria: "aventura",
            imagen: "🇫🇷",
            progreso: 85,
            moneda: "EUR"
        },
        {
            id: 3,
            titulo: "Costa Rica Adventure",
            destino: "San José, Costa Rica",
            fecha_inicio: "2024-03-10",
            fecha_fin: "2024-03-25",
            presupuesto_estimado: 1800,
            gasto_actual: 1650,
            esta_activo: false,
            es_viaje_grupal: true,
            participantes: ["María Santos", "Luis Rodríguez"],
            categoria: "aventura",
            imagen: "🇨🇷",
            progreso: 100,
            moneda: "USD"
        },
        {
            id: 4,
            titulo: "NYC Weekend",
            destino: "Nueva York, USA",
            fecha_inicio: "2024-01-15",
            fecha_fin: "2024-01-18",
            presupuesto_estimado: 1200,
            gasto_actual: 1350,
            esta_activo: false,
            es_viaje_grupal: false,
            participantes: [],
            categoria: "cultural",
            imagen: "🇺🇸",
            progreso: 100,
            moneda: "USD"
        }
    ])

    const filteredViajes = viajes.filter(viaje => {
        const matchesSearch = viaje.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            viaje.destino.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filterStatus === 'todos' ||
            (filterStatus === 'activos' && viaje.esta_activo) ||
            (filterStatus === 'completados' && !viaje.esta_activo)

        return matchesSearch && matchesFilter
    })

    const viajesActivos = viajes.filter(v => v.esta_activo)
    const viajesCompletados = viajes.filter(v => !v.esta_activo)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const handleEditTrip = (id) => {
        console.log('Editar viaje:', id)
        // TODO: Navegar a editar viaje
    }

    const handleViewTrip = (id) => {
        console.log('Ver viaje:', id)
        // TODO: Navegar a detalles del viaje
    }

    const handleDeleteTrip = (id) => {
        console.log('Eliminar viaje:', id)
        // TODO: Implementar eliminación
    }

    const TripCard = ({ viaje }) => (
        <Card
            bg="white"
            shadow="md"
            _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
            transition="all 0.2s"
            border="1px"
            borderColor="gray.200"
        >
            <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                    {/* Header */}
                    <HStack justify="space-between" align="start">
                        <HStack spacing={3}>
                            <Text fontSize="2xl">{viaje.imagen}</Text>
                            <VStack spacing={1} align="start">
                                <Text fontSize="lg" fontWeight="600" color="gray.800">
                                    {viaje.titulo}
                                </Text>
                                <HStack spacing={2}>
                                    <Icon as={FiMapPin} boxSize={4} color="gray.500" />
                                    <Text fontSize="sm" color="gray.600">
                                        {viaje.destino}
                                    </Text>
                                </HStack>
                            </VStack>
                        </HStack>

                        <HStack spacing={2}>
                            <Badge
                                colorScheme={viaje.esta_activo ? "green" : "blue"}
                                variant="solid"
                                px={2}
                                py={1}
                                borderRadius="md"
                                bg={viaje.esta_activo ? "green.400" : "blue.400"}
                                color="white"
                            >
                                {viaje.esta_activo ? "Activo" : "Completado"}
                            </Badge>

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={<FiMoreVertical />}
                                    variant="ghost"
                                    size="sm"
                                    color="gray.600"
                                    _hover={{ bg: "gray.100", color: "gray.800" }}
                                />
                                <MenuList bg="white" border="1px" borderColor="gray.200">
                                    <MenuItem
                                        icon={<FiEye />}
                                        onClick={() => handleViewTrip(viaje.id)}
                                        color="gray.700"
                                        _hover={{ bg: "gray.50" }}
                                    >
                                        Ver detalles
                                    </MenuItem>
                                    <MenuItem
                                        icon={<FiEdit />}
                                        onClick={() => handleEditTrip(viaje.id)}
                                        color="gray.700"
                                        _hover={{ bg: "gray.50" }}
                                    >
                                        Editar
                                    </MenuItem>
                                    <MenuItem
                                        icon={<FiCopy />}
                                        color="gray.700"
                                        _hover={{ bg: "gray.50" }}
                                    >
                                        Duplicar
                                    </MenuItem>
                                    <MenuItem
                                        icon={<FiTrash2 />}
                                        onClick={() => handleDeleteTrip(viaje.id)}
                                        color="red.500"
                                        _hover={{ bg: "red.50" }}
                                    >
                                        Eliminar
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </HStack>

                    {/* Fechas */}
                    <HStack spacing={4}>
                        <HStack spacing={2}>
                            <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                            <Text fontSize="sm" color="gray.600">
                                {formatDate(viaje.fecha_inicio)} - {formatDate(viaje.fecha_fin)}
                            </Text>
                        </HStack>
                        {viaje.es_viaje_grupal && (
                            <HStack spacing={2}>
                                <Icon as={FiUsers} boxSize={4} color="gray.500" />
                                <Text fontSize="sm" color="gray.600">
                                    {viaje.participantes.length + 1} personas
                                </Text>
                            </HStack>
                        )}
                    </HStack>

                    {/* Progreso */}
                    {viaje.esta_activo && (
                        <Box>
                            <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" color="gray.600" fontWeight="500">
                                    Progreso de planificación
                                </Text>
                                <Text fontSize="sm" color="gray.700" fontWeight="600">
                                    {viaje.progreso}%
                                </Text>
                            </HStack>
                            <Progress
                                value={viaje.progreso}
                                size="sm"
                                colorScheme="sage"
                                borderRadius="full"
                                bg="gray.200"
                            />
                        </Box>
                    )}

                    {/* Presupuesto */}
                    <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                        <VStack spacing={0} align="start">
                            <Text fontSize="xs" color="gray.500" fontWeight="500">
                                Presupuesto
                            </Text>
                            <Text fontSize="sm" color="gray.700" fontWeight="600">
                                {viaje.moneda === 'USD' ? '' : viaje.moneda === 'EUR' ? '€' : ''}
                                {viaje.presupuesto_estimado.toLocaleString()}
                            </Text>
                        </VStack>
                        <VStack spacing={0} align="end">
                            <Text fontSize="xs" color="gray.500" fontWeight="500">
                                Gastado
                            </Text>
                            <Text
                                fontSize="sm"
                                fontWeight="600"
                                color={viaje.gasto_actual > viaje.presupuesto_estimado ? "red.500" : "green.500"}
                            >
                                {viaje.moneda === 'USD' ? '' : viaje.moneda === 'EUR' ? '€' : ''}
                                {viaje.gasto_actual.toLocaleString()}
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Participantes */}
                    {viaje.es_viaje_grupal && viaje.participantes.length > 0 && (
                        <Box>
                            <Text fontSize="sm" color="gray.600" mb={2} fontWeight="500">
                                Participantes:
                            </Text>
                            <AvatarGroup size="sm" max={3}>
                                <Avatar name={user?.name || "Tú"} bg="sage.400" color="white" />
                                {viaje.participantes.map((participante, idx) => (
                                    <Avatar
                                        key={idx}
                                        name={participante}
                                        bg="blue.400"
                                        color="white"
                                    />
                                ))}
                            </AvatarGroup>
                        </Box>
                    )}

                    {/* Acciones */}
                    <HStack spacing={2}>
                        <Button
                            size="sm"
                            variant="outline"
                            colorScheme="sage"
                            onClick={() => handleViewTrip(viaje.id)}
                            flex={1}
                            borderColor="sage.300"
                            color="sage.600"
                            _hover={{ bg: "sage.50", borderColor: "sage.400" }}
                        >
                            Ver detalles
                        </Button>
                        {viaje.esta_activo && (
                            <Button
                                size="sm"
                                bg="sage.400"
                                color="white"
                                onClick={() => handleEditTrip(viaje.id)}
                                flex={1}
                                _hover={{ bg: "sage.500" }}
                            >
                                Continuar planificando
                            </Button>
                        )}
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    )

    return (
        <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
            <VStack spacing={8} align="stretch">
                {/* Header */}
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

                    <VStack spacing={2} align="start">
                        <HStack spacing={3}>
                            <Icon as={FiCalendar} boxSize={8} color="sage.400" />
                            <Heading size="xl" color="gray.800">
                                Mis Viajes
                            </Heading>
                        </HStack>
                        <Text color="gray.600" fontSize="lg">
                            Gestiona todos tus viajes en un solo lugar
                        </Text>
                    </VStack>
                </VStack>

                {/* Stats */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                        <CardBody p={6}>
                            <VStack spacing={3} align="center">
                                <Box p={3} bg="gray.100" borderRadius="xl">
                                    <Icon as={FiCalendar} boxSize={6} color="gray.600" />
                                </Box>
                                <Stat textAlign="center">
                                    <StatNumber color="gray.800" fontSize="3xl" fontWeight="700">{viajes.length}</StatNumber>
                                    <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Total de Viajes</StatLabel>
                                </Stat>
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                        <CardBody p={6}>
                            <VStack spacing={3} align="center">
                                <Box p={3} bg="green.100" borderRadius="xl">
                                    <Icon as={FiMapPin} boxSize={6} color="green.500" />
                                </Box>
                                <Stat textAlign="center">
                                    <StatNumber color="green.500" fontSize="3xl" fontWeight="700">{viajesActivos.length}</StatNumber>
                                    <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Viajes Activos</StatLabel>
                                </Stat>
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card bg="white" border="1px" borderColor="gray.200" _hover={{ transform: "translateY(-2px)", shadow: "lg" }} transition="all 0.2s">
                        <CardBody p={6}>
                            <VStack spacing={3} align="center">
                                <Box p={3} bg="blue.100" borderRadius="xl">
                                    <Icon as={FiStar} boxSize={6} color="blue.500" />
                                </Box>
                                <Stat textAlign="center">
                                    <StatNumber color="blue.500" fontSize="3xl" fontWeight="700">{viajesCompletados.length}</StatNumber>
                                    <StatLabel color="gray.600" fontSize="sm" fontWeight="500">Viajes Completados</StatLabel>
                                </Stat>
                            </VStack>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Filtros y Búsqueda */}
                <Card bg="white" border="1px" borderColor="gray.200">
                    <CardBody>
                        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                            <HStack spacing={4} flex={1}>
                                <InputGroup maxW="350px">
                                    <InputLeftElement>
                                        <Icon as={FiSearch} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Buscar viajes por título o destino..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _placeholder={{ color: "gray.400" }}
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </InputGroup>

                                <Select
                                    maxW="220px"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                >
                                    <option value="todos" style={{ color: 'black' }}>Todos los viajes</option>
                                    <option value="activos" style={{ color: 'black' }}>Viajes activos</option>
                                    <option value="completados" style={{ color: 'black' }}>Viajes completados</option>
                                </Select>
                            </HStack>

                            <Button
                                leftIcon={<FiPlus />}
                                bg="sage.400"
                                color="white"
                                onClick={() => onNavigate('/create-trip')}
                                _hover={{ bg: "sage.500" }}
                                size="md"
                                px={6}
                                flexShrink={0}
                            >
                                Nuevo Viaje
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>

                {/* Lista de Viajes */}
                <Tabs colorScheme="sage">
                    <TabList borderColor="gray.200">
                        <Tab
                            color="gray.600"
                            _selected={{ color: "sage.600", borderColor: "sage.400" }}
                            _hover={{ color: "gray.800" }}
                        >
                            Todos ({filteredViajes.length})
                        </Tab>
                        <Tab
                            color="gray.600"
                            _selected={{ color: "sage.600", borderColor: "sage.400" }}
                            _hover={{ color: "gray.800" }}
                        >
                            Activos ({viajesActivos.length})
                        </Tab>
                        <Tab
                            color="gray.600"
                            _selected={{ color: "sage.600", borderColor: "sage.400" }}
                            _hover={{ color: "gray.800" }}
                        >
                            Completados ({viajesCompletados.length})
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            {filteredViajes.length > 0 ? (
                                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                                    {filteredViajes.map((viaje) => (
                                        <TripCard key={viaje.id} viaje={viaje} />
                                    ))}
                                </SimpleGrid>
                            ) : (
                                <Flex
                                    direction="column"
                                    align="center"
                                    justify="center"
                                    py={12}
                                    textAlign="center"
                                >
                                    <Icon as={FiCalendar} boxSize={12} color="gray.300" mb={4} />
                                    <Text fontSize="lg" color="gray.600" mb={2}>
                                        No se encontraron viajes
                                    </Text>
                                    <Text color="gray.500" mb={6}>
                                        Intenta ajustar tus filtros de búsqueda
                                    </Text>
                                    <Button
                                        leftIcon={<FiPlus />}
                                        bg="sage.400"
                                        color="white"
                                        onClick={() => onNavigate('/create-trip')}
                                        _hover={{ bg: "sage.500" }}
                                    >
                                        Crear tu primer viaje
                                    </Button>
                                </Flex>
                            )}
                        </TabPanel>

                        <TabPanel px={0}>
                            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                                {viajesActivos.map((viaje) => (
                                    <TripCard key={viaje.id} viaje={viaje} />
                                ))}
                            </SimpleGrid>
                        </TabPanel>

                        <TabPanel px={0}>
                            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                                {viajesCompletados.map((viaje) => (
                                    <TripCard key={viaje.id} viaje={viaje} />
                                ))}
                            </SimpleGrid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Container>
    )
}

export default MyTripsPage