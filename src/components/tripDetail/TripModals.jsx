import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    VStack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    InputGroup,
    InputLeftElement,
    Text,
    Alert,
    AlertIcon,
    useToast
} from '@chakra-ui/react'

const TripModals = ({
                        isExpenseOpen,
                        isActivityOpen,
                        isDiaryOpen,
                        onExpenseClose,
                        onActivityClose,
                        onDiaryClose,
                        newExpense,
                        newActivity,
                        newDiaryEntry,
                        setNewExpense,
                        setNewActivity,
                        setNewDiaryEntry,
                        tripData
                    }) => {
    const toast = useToast()

    const handleAddExpense = () => {
        console.log('Agregar gasto:', newExpense)
        onExpenseClose()
        toast({
            title: "Gasto agregado",
            description: "El gasto se ha registrado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const handleAddActivity = () => {
        console.log('Agregar actividad:', newActivity)
        onActivityClose()
        toast({
            title: "Actividad agregada",
            description: "La actividad se ha planificado correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const handleAddDiaryEntry = () => {
        console.log('Agregar entrada:', newDiaryEntry)
        onDiaryClose()
        toast({
            title: "Entrada agregada",
            description: "Tu experiencia ha sido guardada en el diario",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <>
            {/* Modal para agregar gasto */}
            <Modal isOpen={isExpenseOpen} onClose={onExpenseClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="white" color="gray.800" borderRadius="xl" mx={4}>
                    <ModalHeader
                        bg="white"
                        color="gray.800"
                        borderTopRadius="xl"
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        Agregar Gasto
                    </ModalHeader>
                    <ModalCloseButton color="gray.600" />
                    <ModalBody bg="white" py={6}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Descripción</FormLabel>
                                <Input
                                    placeholder="ej. Cena en restaurante"
                                    value={newExpense.description}
                                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Cantidad</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Text color="gray.500">{tripData.moneda === 'USD' ? '$' : '€'}</Text>
                                        </InputLeftElement>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={newExpense.amount}
                                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                                            bg="white"
                                            color="gray.800"
                                            borderColor="gray.300"
                                            _placeholder={{ color: "gray.400" }}
                                            _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Categoría</FormLabel>
                                    <Select
                                        value={newExpense.category}
                                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    >
                                        <option value="comida" style={{ color: 'black' }}>Comida</option>
                                        <option value="transporte" style={{ color: 'black' }}>Transporte</option>
                                        <option value="alojamiento" style={{ color: 'black' }}>Alojamiento</option>
                                        <option value="actividades" style={{ color: 'black' }}>Actividades</option>
                                        <option value="compras" style={{ color: 'black' }}>Compras</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={newExpense.date}
                                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="white" borderBottomRadius="xl" borderTop="1px" borderColor="gray.200">
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={onExpenseClose}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="sage.400"
                            color="white"
                            onClick={handleAddExpense}
                            _hover={{ bg: "sage.500" }}
                        >
                            Agregar Gasto
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para agregar actividad */}
            <Modal isOpen={isActivityOpen} onClose={onActivityClose} size="lg">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="white" color="gray.800" borderRadius="xl" mx={4}>
                    <ModalHeader
                        bg="white"
                        color="gray.800"
                        borderTopRadius="xl"
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        Planificar Actividad
                    </ModalHeader>
                    <ModalCloseButton color="gray.600" />
                    <ModalBody bg="white" py={6}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Título de la actividad</FormLabel>
                                <Input
                                    placeholder="ej. Visita al Museo Nacional"
                                    value={newActivity.title}
                                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Descripción</FormLabel>
                                <Textarea
                                    placeholder="Describe qué planeas hacer..."
                                    value={newActivity.description}
                                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                                    rows={3}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Fecha</FormLabel>
                                    <Input
                                        type="date"
                                        value={newActivity.date}
                                        onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Hora</FormLabel>
                                    <Input
                                        type="time"
                                        value={newActivity.time}
                                        onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Ubicación</FormLabel>
                                <Input
                                    placeholder="ej. Centro de la ciudad"
                                    value={newActivity.location}
                                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Costo estimado</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Text color="gray.500">{tripData.moneda === 'USD' ? '$' : '€'}</Text>
                                    </InputLeftElement>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={newActivity.estimatedCost}
                                        onChange={(e) => setNewActivity({...newActivity, estimatedCost: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _placeholder={{ color: "gray.400" }}
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="white" borderBottomRadius="xl" borderTop="1px" borderColor="gray.200">
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={onActivityClose}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="sage.400"
                            color="white"
                            onClick={handleAddActivity}
                            _hover={{ bg: "sage.500" }}
                        >
                            Agregar Actividad
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para entrada de diario */}
            <Modal isOpen={isDiaryOpen} onClose={onDiaryClose} size="lg">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="white" color="gray.800" borderRadius="xl" mx={4}>
                    <ModalHeader
                        bg="white"
                        color="gray.800"
                        borderTopRadius="xl"
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        Nueva Entrada del Diario
                    </ModalHeader>
                    <ModalCloseButton color="gray.600" />
                    <ModalBody bg="white" py={6}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Título</FormLabel>
                                <Input
                                    placeholder="ej. Día increíble en el centro"
                                    value={newDiaryEntry.title}
                                    onChange={(e) => setNewDiaryEntry({...newDiaryEntry, title: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Fecha</FormLabel>
                                    <Input
                                        type="date"
                                        value={newDiaryEntry.date}
                                        onChange={(e) => setNewDiaryEntry({...newDiaryEntry, date: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color="gray.700" fontWeight="500">Estado de ánimo</FormLabel>
                                    <Select
                                        value={newDiaryEntry.mood}
                                        onChange={(e) => setNewDiaryEntry({...newDiaryEntry, mood: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    >
                                        <option value="feliz" style={{ color: 'black' }}>😊 Feliz</option>
                                        <option value="emocionado" style={{ color: 'black' }}>🤩 Emocionado</option>
                                        <option value="relajado" style={{ color: 'black' }}>😌 Relajado</option>
                                        <option value="aventurero" style={{ color: 'black' }}>🤠 Aventurero</option>
                                        <option value="nostalgico" style={{ color: 'black' }}>😊 Nostálgico</option>
                                        <option value="cansado" style={{ color: 'black' }}>😴 Cansado</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">¿Qué hiciste hoy?</FormLabel>
                                <Textarea
                                    placeholder="Cuenta tu experiencia del día, lugares visitados, comida que probaste, personas que conociste..."
                                    value={newDiaryEntry.content}
                                    onChange={(e) => setNewDiaryEntry({...newDiaryEntry, content: e.target.value})}
                                    rows={6}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <Alert status="info" borderRadius="md">
                                <AlertIcon />
                                <Text fontSize="sm" color="gray.700">
                                    Tip: Escribe sobre lo que más te gustó, lo que fue diferente a lo planeado, y qué recomendarías a otros viajeros.
                                </Text>
                            </Alert>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="white" borderBottomRadius="xl" borderTop="1px" borderColor="gray.200">
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={onDiaryClose}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="sage.400"
                            color="white"
                            onClick={handleAddDiaryEntry}
                            _hover={{ bg: "sage.500" }}
                        >
                            Guardar Entrada
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TripModals