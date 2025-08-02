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
    FormControl,
    FormLabel,
    Input,
    Avatar,
    useToast,
    InputGroup,
    InputRightElement,
    Icon,
    Box,
    Text
} from '@chakra-ui/react'
import {
    FiEye,
    FiEyeOff,
    FiUpload
} from 'react-icons/fi'
import { useState, useRef } from 'react'
import { authService } from '../../services/api/authService'

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
    const fileInputRef = useRef()

    // Estado para el modal de editar perfil (solo nombre)
    const [editFormData, setEditFormData] = useState({
        name: user.name || ''
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

    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

    const resetEditForm = () => {
        setEditFormData({
            name: user.name || ''
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
        if (!editFormData.name.trim()) {
            toast({
                title: "Error",
                description: "El nombre es obligatorio",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        onSaveProfile(editFormData)

        toast({
            title: "Perfil actualizado",
            description: "Tus cambios han sido guardados correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const handlePasswordSave = () => {
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

        if (passwordData.newPassword.length < 6) {
            toast({
                title: "Error",
                description: "La nueva contraseña debe tener al menos 6 caracteres",
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

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        // Validar tamaño (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "Error",
                description: "La imagen debe ser menor a 5MB",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        // Validar tipo
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Error",
                description: "Solo se permiten archivos de imagen",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        try {
            setIsUploadingPhoto(true)
            
            // Usar el endpoint real de upload
            const response = await authService.uploadProfilePhoto(file)
            
            // Actualizar el avatar del usuario
            onSaveProfile({ 
                ...user, 
                avatar: response.profile_photo_url 
            })

            toast({
                title: "Foto actualizada",
                description: "Tu foto de perfil ha sido cambiada",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

        } catch (error) {
            console.error('[PHOTO_UPLOAD_ERROR]', error)
            toast({
                title: "Error",
                description: "No se pudo subir la imagen. Intenta de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setIsUploadingPhoto(false)
        }
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
                size="md"
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
                            {/* Avatar con botón de upload */}
                            <VStack spacing={3}>
                                <Avatar
                                    size="xl"
                                    name={editFormData.name}
                                    src={user.avatar}
                                    bg="sage.400"
                                    color="white"
                                />
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    colorScheme="sage"
                                    leftIcon={<Icon as={FiUpload} />}
                                    onClick={() => fileInputRef.current?.click()}
                                    isLoading={isUploadingPhoto}
                                    loadingText="Subiendo..."
                                >
                                    Cambiar Foto
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handlePhotoUpload}
                                />
                                <Text fontSize="xs" color="gray.500" textAlign="center">
                                    Máximo 5MB • JPG, PNG, GIF
                                </Text>
                            </VStack>

                            {/* Solo campo de nombre */}
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Nombre completo</FormLabel>
                                <Input
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                    placeholder="Tu nombre completo"
                                    bg="white"
                                    color="gray.800"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                />
                            </FormControl>

                            <Box p={4} bg="gray.50" borderRadius="md">
                                <Text fontSize="sm" color="gray.600">
                                    <strong>Nota:</strong> El email no se puede modificar desde aquí. 
                                    Para cambios de email, contacta al soporte.
                                </Text>
                            </Box>
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
                                        type={showPasswords.current ? 'text' : 'password'}
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        placeholder="Tu contraseña actual"
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
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
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        placeholder="Tu nueva contraseña"
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                                        >
                                            <Icon as={showPasswords.new ? FiEyeOff : FiEye} />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="500">Confirmar nueva contraseña</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        placeholder="Confirma tu nueva contraseña"
                                        bg="white"
                                        color="gray.800"
                                        borderColor="gray.300"
                                        _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant="ghost"
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