import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Heading,
    Text,
    Link,
    InputGroup,
    InputRightElement,
    IconButton,
    useToast,
    Icon,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react'
import { FiMail, FiMapPin, FiArrowLeft, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authService } from '../services/api/authService'

const ForgotPasswordPage = ({ onNavigate }) => {
    const [step, setStep] = useState('email')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const toast = useToast()

    const emailForm = useForm({ mode: 'onBlur' })
    const resetForm = useForm({ mode: 'onBlur' })

    const handleSendResetEmail = async (data) => {
        setIsLoading(true)
        
        try {
            await authService.sendPasswordReset(data.email)
            setEmail(data.email)
            setStep('token')
            
            toast({
                title: "Email enviado",
                description: "Revisa tu bandeja de entrada para el código de recuperación",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
        } catch (error) {
            console.error('[RESET_EMAIL_ERROR]', error)
            
            let errorMessage = "Error al enviar email de recuperación"
            if (error.message === "User not found") {
                errorMessage = "No encontramos una cuenta con este email"
            } else if (error.message && error.message !== "Network Error") {
                errorMessage = error.message
            }
            
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleResetPassword = async (data) => {
        setIsLoading(true)
        
        try {
            await authService.resetPassword({
                email: email,
                token: data.token,
                new_password: data.newPassword
            })
            
            setStep('success')
            
            toast({
                title: "¡Contraseña actualizada!",
                description: "Tu contraseña ha sido cambiada exitosamente",
                status: "success",
                duration: 4000,
                isClosable: true,
            })
        } catch (error) {
            console.error('[RESET_PASSWORD_ERROR]', error)
            
            let errorMessage = "Error al cambiar contraseña"
            if (error.message === "Invalid reset token") {
                errorMessage = "Código de recuperación inválido"
            } else if (error.message === "Reset token expired") {
                errorMessage = "El código ha expirado. Solicita uno nuevo"
            } else if (error.message && error.message !== "Network Error") {
                errorMessage = error.message
            }
            
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleBackToLogin = () => {
        onNavigate('/login')
    }

    const handleStartOver = () => {
        setStep('email')
        setEmail('')
        emailForm.reset()
        resetForm.reset()
    }

    const renderEmailStep = () => (
        <Box as="form" onSubmit={emailForm.handleSubmit(handleSendResetEmail)}>
            <VStack spacing={6}>
                <VStack spacing={2} textAlign="center">
                    <Heading size="xl" color="gray.800" fontWeight="700">
                        ¿Olvidaste tu contraseña?
                    </Heading>
                    <Text color="gray.600" fontSize="lg">
                        Ingresa tu email y te enviaremos un código para recuperarla
                    </Text>
                </VStack>

                <FormControl isInvalid={emailForm.formState.errors.email}>
                    <FormLabel color="gray.700" fontWeight="500">
                        Email
                    </FormLabel>
                    <InputGroup>
                        <Input
                            type="email"
                            placeholder="tu@email.com"
                            h="48px"
                            bg="white"
                            border="1px"
                            borderColor="gray.200"
                            borderRadius="12px"
                            _hover={{ borderColor: "gray.300" }}
                            _focus={{
                                borderColor: "sage.400",
                                boxShadow: "0 0 0 3px rgba(156, 175, 136, 0.1)"
                            }}
                            {...emailForm.register('email', {
                                required: 'El email es obligatorio',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email inválido'
                                }
                            })}
                        />
                        <InputRightElement h="48px">
                            <Icon as={FiMail} color="gray.400" />
                        </InputRightElement>
                    </InputGroup>
                    {emailForm.formState.errors.email && (
                        <Text color="red.400" fontSize="xs" mt={1}>
                            {emailForm.formState.errors.email.message}
                        </Text>
                    )}
                </FormControl>

                <Button
                    type="submit"
                    w="full"
                    h="48px"
                    bg="sage.400"
                    color="white"
                    borderRadius="12px"
                    fontWeight="500"
                    isLoading={isLoading}
                    loadingText="Enviando..."
                    isDisabled={!emailForm.formState.isValid}
                    _hover={{
                        bg: "sage.500",
                        transform: "translateY(-1px)",
                        shadow: "lg"
                    }}
                    _active={{ bg: "sage.600" }}
                    transition="all 0.2s"
                >
                    Enviar código de recuperación
                </Button>
            </VStack>
        </Box>
    )

    const renderTokenStep = () => {
        const password = resetForm.watch('newPassword')
        
        return (
            <Box as="form" onSubmit={resetForm.handleSubmit(handleResetPassword)}>
                <VStack spacing={6}>
                    <VStack spacing={2} textAlign="center">
                        <Heading size="xl" color="gray.800" fontWeight="700">
                            Ingresa el código
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                            Enviamos un código de 6 dígitos a {email}
                        </Text>
                    </VStack>

                    <Alert status="info" borderRadius="12px">
                        <AlertIcon />
                        <Box>
                            <AlertTitle fontSize="sm">Revisa tu email</AlertTitle>
                            <AlertDescription fontSize="xs">
                                El código expira en 1 hora. Si no lo ves, revisa tu carpeta de spam.
                            </AlertDescription>
                        </Box>
                    </Alert>

                    <FormControl isInvalid={resetForm.formState.errors.token}>
                        <FormLabel color="gray.700" fontWeight="500">
                            Código de recuperación
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="123456"
                            h="48px"
                            bg="white"
                            border="1px"
                            borderColor="gray.200"
                            borderRadius="12px"
                            textAlign="center"
                            fontSize="lg"
                            fontWeight="600"
                            letterSpacing="2px"
                            maxLength={6}
                            _hover={{ borderColor: "gray.300" }}
                            _focus={{
                                borderColor: "sage.400",
                                boxShadow: "0 0 0 3px rgba(156, 175, 136, 0.1)"
                            }}
                            {...resetForm.register('token', {
                                required: 'El código es obligatorio',
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: 'El código debe tener 6 dígitos'
                                }
                            })}
                        />
                        {resetForm.formState.errors.token && (
                            <Text color="red.400" fontSize="xs" mt={1}>
                                {resetForm.formState.errors.token.message}
                            </Text>
                        )}
                    </FormControl>

                    <FormControl isInvalid={resetForm.formState.errors.newPassword}>
                        <FormLabel color="gray.700" fontWeight="500">
                            Nueva contraseña
                        </FormLabel>
                        <InputGroup>
                            <Input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                h="48px"
                                bg="white"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="12px"
                                _hover={{ borderColor: "gray.300" }}
                                _focus={{
                                    borderColor: "sage.400",
                                    boxShadow: "0 0 0 3px rgba(156, 175, 136, 0.1)"
                                }}
                                {...resetForm.register('newPassword', {
                                    required: 'La nueva contraseña es obligatoria',
                                    minLength: {
                                        value: 6,
                                        message: 'La contraseña debe tener al menos 6 caracteres'
                                    }
                                })}
                            />
                            <InputRightElement h="48px">
                                <IconButton
                                    variant="ghost"
                                    icon={showNewPassword ? <FiEyeOff /> : <FiEye />}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    color="gray.400"
                                    size="sm"
                                    _hover={{ color: "gray.600" }}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {resetForm.formState.errors.newPassword && (
                            <Text color="red.400" fontSize="xs" mt={1}>
                                {resetForm.formState.errors.newPassword.message}
                            </Text>
                        )}
                    </FormControl>

                    <FormControl isInvalid={resetForm.formState.errors.confirmPassword}>
                        <FormLabel color="gray.700" fontWeight="500">
                            Confirmar nueva contraseña
                        </FormLabel>
                        <InputGroup>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                h="48px"
                                bg="white"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="12px"
                                _hover={{ borderColor: "gray.300" }}
                                _focus={{
                                    borderColor: "sage.400",
                                    boxShadow: "0 0 0 3px rgba(156, 175, 136, 0.1)"
                                }}
                                {...resetForm.register('confirmPassword', {
                                    required: 'Confirma tu nueva contraseña',
                                    validate: (value) =>
                                        value === password || 'Las contraseñas no coinciden'
                                })}
                            />
                            <InputRightElement h="48px">
                                <IconButton
                                    variant="ghost"
                                    icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    color="gray.400"
                                    size="sm"
                                    _hover={{ color: "gray.600" }}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {resetForm.formState.errors.confirmPassword && (
                            <Text color="red.400" fontSize="xs" mt={1}>
                                {resetForm.formState.errors.confirmPassword.message}
                            </Text>
                        )}
                    </FormControl>

                    <Button
                        type="submit"
                        w="full"
                        h="48px"
                        bg="sage.400"
                        color="white"
                        borderRadius="12px"
                        fontWeight="500"
                        isLoading={isLoading}
                        loadingText="Cambiando contraseña..."
                        isDisabled={!resetForm.formState.isValid}
                        _hover={{
                            bg: "sage.500",
                            transform: "translateY(-1px)",
                            shadow: "lg"
                        }}
                        _active={{ bg: "sage.600" }}
                        transition="all 0.2s"
                        rightIcon={<FiCheck />}
                    >
                        Cambiar contraseña
                    </Button>

                    <Center>
                        <HStack spacing={2}>
                            <Text color="gray.500" fontSize="sm">
                                ¿No recibiste el código?
                            </Text>
                            <Link
                                color="sage.500"
                                fontWeight="500"
                                fontSize="sm"
                                _hover={{ color: "sage.600" }}
                                onClick={handleStartOver}
                            >
                                Enviar de nuevo
                            </Link>
                        </HStack>
                    </Center>
                </VStack>
            </Box>
        )
    }

    const renderSuccessStep = () => (
        <VStack spacing={6}>
            <Box textAlign="center">
                <Box
                    w="80px"
                    h="80px"
                    bg="green.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    mb={4}
                >
                    <Icon as={FiCheck} boxSize={10} color="green.500" />
                </Box>
                <Heading size="xl" color="gray.800" fontWeight="700" mb={2}>
                    ¡Listo!
                </Heading>
                <Text color="gray.600" fontSize="lg">
                    Tu contraseña ha sido actualizada correctamente
                </Text>
            </Box>

            <Button
                w="full"
                h="48px"
                bg="sage.400"
                color="white"
                borderRadius="12px"
                fontWeight="500"
                onClick={handleBackToLogin}
                _hover={{
                    bg: "sage.500",
                    transform: "translateY(-1px)",
                    shadow: "lg"
                }}
                _active={{ bg: "sage.600" }}
                transition="all 0.2s"
            >
                Iniciar sesión
            </Button>
        </VStack>
    )

    return (
        <Box minH="100vh" bg="white" position="relative">
            <Box
                position="absolute"
                inset={0}
                opacity={0.03}
                bgImage="radial-gradient(circle at 20px 20px, #9CAF88 1px, transparent 1px)"
                bgSize="40px 40px"
            />

            <Container maxW="md" py={8} position="relative" zIndex={1}>
                <VStack spacing={8} align="stretch">
                    <HStack justify="space-between" align="center">
                        <IconButton
                            icon={<FiArrowLeft />}
                            variant="ghost"
                            size="lg"
                            onClick={step === 'success' ? handleBackToLogin : handleBackToLogin}
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        />
                        <Box textAlign="center">
                            <Icon as={FiMapPin} boxSize={8} color="sage.500" mb={2} />
                            <Heading size="lg" color="gray.800" fontWeight="700">
                                Voyaj
                            </Heading>
                        </Box>
                        <Box w="40px" />
                    </HStack>

                    <VStack spacing={6} align="stretch">
                        {step === 'email' && renderEmailStep()}
                        {step === 'token' && renderTokenStep()}
                        {step === 'success' && renderSuccessStep()}
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default ForgotPasswordPage