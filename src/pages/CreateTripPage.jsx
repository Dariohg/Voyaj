import {
    Container,
    VStack,
    Heading,
    Text,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Switch,
    Button,
    SimpleGrid,
    Box,
    HStack,
    Icon,
    InputGroup,
    InputLeftElement,
    Divider,
    Badge,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import {
    FiMapPin,
    FiCalendar,
    FiDollarSign,
    FiUsers,
    FiSave,
    FiArrowLeft,
    FiGlobe,
    FiSun,
    FiBriefcase,
    FiCompass,
    FiCamera,
    FiHeart,
    FiHome,
    FiPackage,
    FiStar
} from 'react-icons/fi'
import React, { useState } from 'react'

const CreateTripPage = ({ onNavigate, onLogout, user }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        fecha_inicio: '',
        fecha_fin: '',
        destino: '',
        descripcion: '',
        presupuesto_estimado: '',
        moneda_base: 'USD',
        esta_activo: true,
        es_viaje_grupal: false,
        participantes: [''],
        categoria: 'vacaciones'
    })

    const [isLoading, setIsLoading] = useState(false)

    const monedas = [
        { code: 'USD', name: 'Dólar Estadounidense', symbol: '' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'Libra Esterlina', symbol: '' },
        { code: 'MXN', name: 'Peso Mexicano', symbol: '' },
        { code: 'COP', name: 'Peso Colombiano', symbol: '' },
        { code: 'ARS', name: 'Peso Argentino', symbol: '' },
        { code: 'CLP', name: 'Peso Chileno', symbol: '' },
        { code: 'PEN', name: 'Sol Peruano', symbol: '' },
        { code: 'BRL', name: 'Real Brasileño', symbol: '' },
        { code: 'JPY', name: 'Yen Japonés', symbol: '' }
    ]

    const categorias = [
        { value: 'vacaciones', label: 'Vacaciones', icon: FiSun, color: 'orange' },
        { value: 'trabajo', label: 'Viaje de Trabajo', icon: FiBriefcase, color: 'blue' },
        { value: 'aventura', label: 'Aventura', icon: FiCompass, color: 'green' },
        { value: 'cultural', label: 'Cultural', icon: FiCamera, color: 'purple' },
        { value: 'familiar', label: 'Familiar', icon: FiHome, color: 'pink' },
        { value: 'romantico', label: 'Romántico', icon: FiHeart, color: 'red' },
        { value: 'mochilero', label: 'Mochilero', icon: FiPackage, color: 'teal' },
        { value: 'lujo', label: 'Lujo', icon: FiStar, color: 'yellow' }
    ]

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleParticipantChange = (index, value) => {
        const newParticipants = [...formData.participantes]
        newParticipants[index] = value
        setFormData(prev => ({
            ...prev,
            participantes: newParticipants
        }))
    }

    const addParticipant = () => {
        setFormData(prev => ({
            ...prev,
            participantes: [...prev.participantes, '']
        }))
    }

    const removeParticipant = (index) => {
        const newParticipants = formData.participantes.filter((_, i) => i !== index)
        setFormData(prev => ({
            ...prev,
            participantes: newParticipants.length > 0 ? newParticipants : ['']
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simular llamada a API
        try {
            console.log('Creando viaje:', formData)

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Navegar al dashboard
            onNavigate('/dashboard')
        } catch (error) {
            console.error('Error creating trip:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = () => {
        return formData.titulo.trim() &&
            formData.fecha_inicio &&
            formData.fecha_fin &&
            formData.destino.trim() &&
            formData.presupuesto_estimado > 0
    }

    return (
        <Container maxW="4xl" py={8} px={{ base: 4, md: 8 }}>
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
                        size="md"
                    >
                        Volver al Dashboard
                    </Button>

                    <VStack spacing={2} align="start">
                        <HStack spacing={3}>
                            <Icon as={FiMapPin} boxSize={8} color="sage.400" />
                            <Heading size="xl" color="gray.800">
                                Crear Nuevo Viaje
                            </Heading>
                        </HStack>
                        <Text color="gray.600" fontSize="lg">
                            Planifica tu próxima aventura paso a paso
                        </Text>
                    </VStack>
                </VStack>

                {/* Alert Info */}
                <Alert status="info" borderRadius="xl">
                    <AlertIcon />
                    <Text fontSize="sm">
                        Completa la información básica de tu viaje. Podrás agregar más detalles después.
                    </Text>
                </Alert>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <VStack spacing={8} align="stretch">

                        {/* Información Básica */}
                        <Card bg="white">
                            <CardHeader>
                                <HStack spacing={3}>
                                    <Icon as={FiMapPin} color="sage.400" />
                                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                                        Información Básica
                                    </Text>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="500">Título del Viaje</FormLabel>
                                        <Input
                                            placeholder="ej. Aventura en Europa"
                                            value={formData.titulo}
                                            onChange={(e) => handleInputChange('titulo', e.target.value)}
                                            size="lg"
                                            bg="white"
                                            color="gray.800"
                                            borderColor="gray.300"
                                            _placeholder={{ color: "gray.400" }}
                                            _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="500">Destino Principal</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement>
                                                <Icon as={FiGlobe} color="gray.400" />
                                            </InputLeftElement>
                                            <Input
                                                placeholder="ej. París, Francia"
                                                value={formData.destino}
                                                onChange={(e) => handleInputChange('destino', e.target.value)}
                                                bg="white"
                                                color="gray.800"
                                                borderColor="gray.300"
                                                _placeholder={{ color: "gray.400" }}
                                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="500">Fecha de Inicio</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement>
                                                <Icon as={FiCalendar} color="gray.400" />
                                            </InputLeftElement>
                                            <Input
                                                type="date"
                                                value={formData.fecha_inicio}
                                                onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                                                bg="white"
                                                color="gray.800"
                                                borderColor="gray.300"
                                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="500">Fecha de Fin</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement>
                                                <Icon as={FiCalendar} color="gray.400" />
                                            </InputLeftElement>
                                            <Input
                                                type="date"
                                                value={formData.fecha_fin}
                                                onChange={(e) => handleInputChange('fecha_fin', e.target.value)}
                                                min={formData.fecha_inicio}
                                                bg="white"
                                                color="gray.800"
                                                borderColor="gray.300"
                                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </SimpleGrid>

                                <FormControl mt={6}>
                                    <FormLabel color="gray.700" fontWeight="500">Descripción (Opcional)</FormLabel>
                                    <Textarea
                                        placeholder="Cuéntanos sobre tu viaje..."
                                        value={formData.descripcion}
                                        onChange={(e) => handleInputChange('descripcion', e.target.value)}
                                        size="lg"
                                        rows={4}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _placeholder={{ color: "gray.400" }}
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>

                                <FormControl mt={6}>
                                    <FormLabel color="gray.800">Categoría del Viaje</FormLabel>
                                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
                                        {categorias.map((categoria) => (
                                            <Box
                                                key={categoria.value}
                                                as="button"
                                                type="button"
                                                p={4}
                                                borderRadius="lg"
                                                border="2px"
                                                borderColor={formData.categoria === categoria.value ? "sage.400" : "gray.200"}
                                                bg={formData.categoria === categoria.value ? "sage.50" : "white"}
                                                _hover={{ borderColor: "sage.300" }}
                                                onClick={() => handleInputChange('categoria', categoria.value)}
                                                transition="all 0.2s"
                                            >
                                                <VStack spacing={2}>
                                                    <Icon
                                                        as={categoria.icon}
                                                        boxSize={6}
                                                        color={formData.categoria === categoria.value ? "sage.500" : `${categoria.color}.400`}
                                                    />
                                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                                        {categoria.label}
                                                    </Text>
                                                </VStack>
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                </FormControl>
                            </CardBody>
                        </Card>

                        {/* Presupuesto */}
                        <Card bg="white">
                            <CardHeader>
                                <HStack spacing={3}>
                                    <Icon as={FiDollarSign} color="green.400" />
                                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                                        Presupuesto
                                    </Text>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="500">Presupuesto Estimado</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement>
                                                <Icon as={FiDollarSign} color="gray.400" />
                                            </InputLeftElement>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={formData.presupuesto_estimado}
                                                onChange={(e) => handleInputChange('presupuesto_estimado', e.target.value)}
                                                min="0"
                                                step="0.01"
                                                bg="white"
                                                color="gray.800"
                                                borderColor="gray.300"
                                                _placeholder={{ color: "gray.400" }}
                                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="gray.700" fontWeight="500">Moneda Base</FormLabel>
                                        <Select
                                            value={formData.moneda_base}
                                            onChange={(e) => handleInputChange('moneda_base', e.target.value)}
                                            size="lg"
                                            bg="white"
                                            color="gray.800"
                                            borderColor="gray.300"
                                            _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                        >
                                            {monedas.map((moneda) => (
                                                <option key={moneda.code} value={moneda.code} style={{ color: 'black', backgroundColor: 'white' }}>
                                                    {moneda.symbol} {moneda.name} ({moneda.code})
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </SimpleGrid>
                            </CardBody>
                        </Card>

                        {/* Configuración del Viaje */}
                        <Card bg="white">
                            <CardHeader>
                                <HStack spacing={3}>
                                    <Icon as={FiUsers} color="blue.400" />
                                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                                        Configuración del Viaje
                                    </Text>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={6} align="stretch">
                                    <HStack justify="space-between">
                                        <VStack align="start" spacing={1}>
                                            <Text fontWeight="500" color="gray.700">
                                                Viaje en Grupo
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                ¿Viajarás con otras personas?
                                            </Text>
                                        </VStack>
                                        <Switch
                                            colorScheme="sage"
                                            size="lg"
                                            isChecked={formData.es_viaje_grupal}
                                            onChange={(e) => handleInputChange('es_viaje_grupal', e.target.checked)}
                                            sx={{
                                                '.chakra-switch__track': {
                                                    bg: formData.es_viaje_grupal ? 'sage.400' : 'gray.200',
                                                    _checked: {
                                                        bg: 'sage.400'
                                                    }
                                                },
                                                '.chakra-switch__thumb': {
                                                    bg: 'white'
                                                }
                                            }}
                                        />
                                    </HStack>

                                    {formData.es_viaje_grupal && (
                                        <Box>
                                            <Text fontWeight="500" color="gray.700" mb={4}>
                                                Participantes del Viaje
                                            </Text>
                                            <VStack spacing={3} align="stretch">
                                                {formData.participantes.map((participante, index) => (
                                                    <HStack key={index} spacing={3}>
                                                        <Input
                                                            placeholder="Nombre o email del participante"
                                                            value={participante}
                                                            onChange={(e) => handleParticipantChange(index, e.target.value)}
                                                            bg="white"
                                                            color="gray.800"
                                                            borderColor="gray.300"
                                                            _placeholder={{ color: "gray.400" }}
                                                            _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                                        />
                                                        {formData.participantes.length > 1 && (
                                                            <Button
                                                                size="sm"
                                                                colorScheme="red"
                                                                variant="outline"
                                                                onClick={() => removeParticipant(index)}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        )}
                                                    </HStack>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    colorScheme="sage"
                                                    onClick={addParticipant}
                                                    alignSelf="flex-start"
                                                >
                                                    + Agregar Participante
                                                </Button>
                                            </VStack>
                                        </Box>
                                    )}

                                    <Divider />

                                    <HStack justify="space-between">
                                        <VStack align="start" spacing={1}>
                                            <Text fontWeight="500" color="gray.700">
                                                Estado del Viaje
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                ¿Activar este viaje inmediatamente?
                                            </Text>
                                        </VStack>
                                        <HStack spacing={3}>
                                            <Badge
                                                colorScheme={formData.esta_activo ? "green" : "gray"}
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                color={formData.esta_activo ? "white" : "gray.600"}
                                                bg={formData.esta_activo ? "green.400" : "gray.200"}
                                            >
                                                {formData.esta_activo ? "Activo" : "Borrador"}
                                            </Badge>
                                            <Switch
                                                colorScheme="sage"
                                                size="lg"
                                                isChecked={formData.esta_activo}
                                                onChange={(e) => handleInputChange('esta_activo', e.target.checked)}
                                                sx={{
                                                    '.chakra-switch__track': {
                                                        bg: formData.esta_activo ? 'sage.400' : 'gray.200',
                                                        _checked: {
                                                            bg: 'sage.400'
                                                        }
                                                    },
                                                    '.chakra-switch__thumb': {
                                                        bg: 'white'
                                                    }
                                                }}
                                            />
                                        </HStack>
                                    </HStack>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Botones de Acción */}
                        <Card bg="white" shadow="md">
                            <CardBody>
                                <HStack spacing={4} justify="flex-end">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => onNavigate('/dashboard')}
                                        isDisabled={isLoading}
                                        borderColor="gray.300"
                                        color="gray.700"
                                        _hover={{ borderColor: "gray.400", bg: "gray.50" }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        leftIcon={<FiSave />}
                                        colorScheme="sage"
                                        bg="sage.400"
                                        color="white"
                                        size="lg"
                                        type="submit"
                                        isLoading={isLoading}
                                        loadingText="Creando viaje..."
                                        isDisabled={!isFormValid()}
                                        _hover={{ bg: "sage.500" }}
                                        _disabled={{
                                            bg: "gray.200",
                                            color: "gray.500",
                                            cursor: "not-allowed"
                                        }}
                                    >
                                        Crear Viaje
                                    </Button>
                                </HStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </form>
            </VStack>
        </Container>
    )
}

    export default CreateTripPage