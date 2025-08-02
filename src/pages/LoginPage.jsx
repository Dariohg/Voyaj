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
    Divider,
    useToast,
    Icon,
    Center
} from '@chakra-ui/react'
import { FiEye, FiEyeOff, FiMail, FiMapPin, FiArrowLeft } from 'react-icons/fi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authService } from '../services/api/authService'
import { validateAuthResponse } from '../utils/validators/responseValidators'

const LoginPage = ({ onNavigate, onLogin }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        setIsLoading(true)

        try {
            const credentials = {
                email: data.email,
                password: data.password
            }

            const response = await authService.login(credentials)
            const validation = validateAuthResponse(response)
            
            if (!validation.isValid) {
                throw new Error(validation.error)
            }

            toast({
                title: "¡Bienvenido de vuelta!",
                description: "Has iniciado sesión correctamente",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            onLogin(response.user)

        } catch (error) {
            console.error('[LOGIN_ERROR]', error)
            
            let errorMessage = "Credenciales incorrectas"
            
            if (error.message === "Email no verificado") {
                errorMessage = "Verifica tu email antes de continuar"
            } else if (error.message === "Network Error" || !navigator.onLine) {
                errorMessage = "Sin conexión a internet"
            } else if (error.message && error.message !== "Network Error") {
                errorMessage = error.message
            }

            toast({
                title: "Error al iniciar sesión",
                description: errorMessage,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialLogin = (provider) => {
        toast({
            title: `Conectando con ${provider}`,
            description: "Esta función estará disponible pronto",
            status: "info",
            duration: 2000,
            isClosable: true,
        })
    }

    const handleBackToHome = () => {
        onNavigate('/')
    }

    const handleGoToRegister = () => {
        onNavigate('/register')
    }

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
                            onClick={handleBackToHome}
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
                        <VStack spacing={2} textAlign="center">
                            <Heading size="xl" color="gray.800" fontWeight="700">
                                Inicia sesión
                            </Heading>
                            <Text color="gray.600" fontSize="lg">
                                Continúa tu aventura donde la dejaste
                            </Text>
                        </VStack>

                        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                            <VStack spacing={5}>
                                <FormControl isInvalid={errors.email}>
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
                                            {...register('email', {
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
                                    {errors.email && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.email.message}
                                        </Text>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={errors.password}>
                                    <FormLabel color="gray.700" fontWeight="500">
                                        Contraseña
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
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
                                            {...register('password', {
                                                required: 'La contraseña es obligatoria'
                                            })}
                                        />
                                        <InputRightElement h="48px">
                                            <IconButton
                                                variant="ghost"
                                                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                                                onClick={() => setShowPassword(!showPassword)}
                                                color="gray.400"
                                                size="sm"
                                                _hover={{ color: "gray.600" }}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.password && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </FormControl>

                                <HStack justify="space-between" w="full">
                                    <Box />
                                    <Link
                                        color="sage.500"
                                        fontSize="sm"
                                        fontWeight="500"
                                        _hover={{ color: "sage.600" }}
                                        onClick={() => onNavigate('/forgot-password')}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </HStack>

                                <Button
                                    type="submit"
                                    w="full"
                                    h="48px"
                                    bg="sage.400"
                                    color="white"
                                    borderRadius="12px"
                                    fontWeight="500"
                                    isLoading={isLoading}
                                    loadingText="Iniciando sesión..."
                                    isDisabled={!isValid}
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
                        </Box>

                        <Center>
                            <HStack spacing={2}>
                                <Text color="gray.500" fontSize="sm">
                                    ¿No tienes cuenta?
                                </Text>
                                <Link
                                    color="sage.500"
                                    fontWeight="500"
                                    fontSize="sm"
                                    _hover={{ color: "sage.600" }}
                                    onClick={handleGoToRegister}
                                >
                                    Crear cuenta
                                </Link>
                            </HStack>
                        </Center>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default LoginPage