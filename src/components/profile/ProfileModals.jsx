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
    HStack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Avatar,
    Text,
    useToast,
    InputGroup,
    InputRightElement,
    Icon
} from '@chakra-ui/react'
import {
    FiEye,
    FiEyeOff
} from 'react-icons/fi'
import { useState } from 'react'

const ProfileModals = ({
                           user,
                           isEditModalOpen,
                           isPasswordModalOpen,
                           onCloseEditModal,
                           onClosePasswordModal,
                           onSaveProfile,
                           onChangePassword
                       }) => {
    const toast = useToast()

    // Estado para el modal de editar perfil
    const [editFormData, setEditFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        city: user.city || '',
        birthDate: user.birthDate || '',
        bio: user.bio || ''
    })

    // Estado para el modal de cambiar contraseña
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    const resetEditForm = () => {
        setEditFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            country: user.country || '',
            city: user.city || '',
            birthDate: user.birthDate || '',
            bio: user.bio || ''
        })
    }

    const resetPasswordForm = () => {
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
        setShowPasswords({
            current: false,
            new: false,
            confirm: false
        })
    }

    const handleEditSave = () => {
        // Validaciones básicas
        if (!editFormData.firstName.trim() || !editFormData.lastName.trim()) {
            toast({
                title: "Error",
                description: "El nombre y apellido son obligatorios",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (!editFormData.email.trim() || !editFormData.email.includes('@')) {
            toast({
                title: "Error",
                description: "Por favor ingresa un email válido",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        onSaveProfile({
            ...editFormData,
            name: `${editFormData.firstName} ${editFormData.lastName}`
        })

        toast({
            title: "Perfil actualizado",
            description: "Tus cambios han sido guardados correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const handlePasswordSave = () => {
        // Validaciones
        if (!passwordData.currentPassword.trim()) {
            toast({
                title: "Error",
                description: "Ingresa tu contraseña actual",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (passwordData.newPassword.length < 8) {
            toast({
                title: "Error",
                description: "La nueva contraseña debe tener al menos 8 caracteres",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        onChangePassword(passwordData)
        resetPasswordForm()

        toast({
            title: "Contraseña actualizada",
            description: "Tu contraseña ha sido cambiada correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <>
            {/* Modal para editar perfil */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    onCloseEditModal()
                    resetEditForm()
                }}
                size="lg"
            >
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="white" color="gray.800" borderRadius="xl" mx={4}>
                    <ModalHeader
                        bg="white"
                        color="gray.800"
                        borderTopRadius="xl"
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        Editar Perfil
                    </ModalHeader>
                    <ModalCloseButton color="gray.600" />
                    <ModalBody bg="white" py={6}>
                        <VStack spacing={6}>
                            {/* Avatar */}
                            <VStack spacing={3}>
                                <Avatar
                                    size="xl"
                                    name={`${editFormData.firstName} ${editFormData.lastName}`}
                                    src={user.avatar}
                                    bg="sage.400"
                                    color="white"
                                />
                                <Button size="sm" variant="outline" colorScheme="sage">
                                    Cambiar Foto
                                </Button>
                            </VStack>

                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Nombre</FormLabel>
                                    <Input
                                        value={editFormData.firstName}
                                        onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel color="gray.700" fontWeight="500">Apellido</FormLabel>
                                    <Input
                                        value={editFormData.lastName}
                                        onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Email</FormLabel>
                                <Input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Teléfono</FormLabel>
                                <Input
                                    type="tel"
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl>
                                    <FormLabel color="gray.700" fontWeight="500">País</FormLabel>
                                    <Select
                                        value={editFormData.country}
                                        onChange={(e) => setEditFormData({...editFormData, country: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    >
                                        <option value="" style={{ color: 'black' }}>Selecciona país</option>
                                        <option value="México" style={{ color: 'black' }}>México</option>
                                        <option value="Estados Unidos" style={{ color: 'black' }}>Estados Unidos</option>
                                        <option value="España" style={{ color: 'black' }}>España</option>
                                        <option value="Francia" style={{ color: 'black' }}>Francia</option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel color="gray.700" fontWeight="500">Ciudad</FormLabel>
                                    <Input
                                        value={editFormData.city}
                                        onChange={(e) => setEditFormData({...editFormData, city: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Fecha de nacimiento</FormLabel>
                                <Input
                                    type="date"
                                    value={editFormData.birthDate}
                                    onChange={(e) => setEditFormData({...editFormData, birthDate: e.target.value})}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="500">Biografía</FormLabel>
                                <Textarea
                                    value={editFormData.bio}
                                    onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
                                    placeholder="Cuéntanos un poco sobre ti..."
                                    rows={4}
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="white" borderBottomRadius="xl" borderTop="1px" borderColor="gray.200">
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={() => {
                                onCloseEditModal()
                                resetEditForm()
                            }}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="sage.400"
                            color="white"
                            onClick={handleEditSave}
                            _hover={{ bg: "sage.500" }}
                        >
                            Guardar Cambios
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para cambiar contraseña */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => {
                    onClosePasswordModal()
                    resetPasswordForm()
                }}
            >
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="white" color="gray.800" borderRadius="xl" mx={4}>
                    <ModalHeader
                        bg="white"
                        color="gray.800"
                        borderTopRadius="xl"
                        borderBottom="1px"
                        borderColor="gray.200"
                    >
                        Cambiar Contraseña
                    </ModalHeader>
                    <ModalCloseButton color="gray.600" />
                    <ModalBody bg="white" py={6}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Contraseña actual</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPasswords.current ? "text" : "password"}
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                                        >
                                            <Icon as={showPasswords.current ? FiEyeOff : FiEye} />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Nueva contraseña</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPasswords.new ? "text" : "password"}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                                        >
                                            <Icon as={showPasswords.new ? FiEyeOff : FiEye} />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Mínimo 8 caracteres
                                </Text>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Confirmar nueva contraseña</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                                        >
                                            <Icon as={showPasswords.confirm ? FiEyeOff : FiEye} />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="white" borderBottomRadius="xl" borderTop="1px" borderColor="gray.200">
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={() => {
                                onClosePasswordModal()
                                resetPasswordForm()
                            }}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="sage.400"
                            color="white"
                            onClick={handlePasswordSave}
                            _hover={{ bg: "sage.500" }}
                        >
                            Cambiar Contraseña
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModals