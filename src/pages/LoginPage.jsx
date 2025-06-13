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
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Validar credenciales de demo
            const isDemoCredentials = (
                data.email === 'demo@voyaj.com' && data.password === 'demo123'
            )

            if (isDemoCredentials) {
                // Credenciales correctas - crear usuario mock
                const userData = {
                    id: 1,
                    email: data.email,
                    name: 'Juan Pérez',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    avatar: null,
                    plan: 'premium'
                }

                toast({
                    title: "¡Bienvenido de vuelta!",
                    description: "Has iniciado sesión correctamente",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })

                // Llamar a onLogin para actualizar el estado y navegar
                onLogin(userData)

            } else {
                // Credenciales incorrectas
                toast({
                    title: "Credenciales incorrectas",
                    description: "Email o contraseña incorrectos. Usa las credenciales de demo.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
            }

        } catch (error) {
            toast({
                title: "Error al iniciar sesión",
                description: "Ocurrió un error inesperado. Intenta nuevamente.",
                status: "error",
                duration: 3000,
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

    // Función para rellenar credenciales de demo
    const fillDemoCredentials = () => {
        document.querySelector('input[name="email"]').value = 'demo@voyaj.com'
        document.querySelector('input[name="password"]').value = 'demo123'
    }

    return (
        <Box minH="100vh" bg="white" position="relative">
            {/* Subtle background pattern */}
            <Box
                position="absolute"
                inset={0}
                opacity={0.03}
                bgImage="radial-gradient(circle at 20px 20px, #9CAF88 1px, transparent 1px)"
                bgSize="40px 40px"
            />

            <Container maxW="md" py={8} position="relative" zIndex={1}>
                <VStack spacing={8} align="stretch">
                    {/* Header with back button and logo */}
                    <HStack justify="space-between" align="center">
                        <IconButton
                            icon={<FiArrowLeft />}
                            variant="ghost"
                            color="gray.400"
                            size="sm"
                            onClick={handleBackToHome}
                            aria-label="Volver"
                            _hover={{ color: "gray.600" }}
                        />
                        <HStack spacing={2}>
                            <Icon as={FiMapPin} boxSize={6} color="sage.400" />
                            <Heading size="md" color="sage.400" fontWeight="600">
                                Voyaj
                            </Heading>
                        </HStack>
                        <Box w="40px" />
                    </HStack>

                    {/* Main content */}
                    <VStack spacing={8} pt={8}>
                        {/* Title section */}
                        <VStack spacing={3} textAlign="center">
                            <Heading
                                size="xl"
                                color="gray.800"
                                fontWeight="600"
                                letterSpacing="tight"
                            >
                                Bienvenido de vuelta
                            </Heading>
                            <Text color="gray.500" fontSize="md">
                                Inicia sesión para continuar tu aventura
                            </Text>
                        </VStack>

                        {/* Social buttons */}
                        <VStack spacing={3} w="full">
                            <Button
                                w="full"
                                h="48px"
                                variant="outline"
                                borderColor="gray.200"
                                leftIcon={<FaGoogle color="#DB4437" />}
                                onClick={() => handleSocialLogin('Google')}
                                _hover={{
                                    borderColor: "gray.300",
                                    bg: "gray.50",
                                    transform: "translateY(-1px)",
                                    shadow: "sm"
                                }}
                                fontWeight="500"
                                color="gray.700"
                                transition="all 0.2s"
                            >
                                Continuar con Google
                            </Button>
                        </VStack>

                        {/* Divider */}
                        <HStack w="full" align="center">
                            <Divider borderColor="gray.200" />
                            <Text fontSize="sm" color="gray.400" px={3} whiteSpace="nowrap">
                                o con email
                            </Text>
                            <Divider borderColor="gray.200" />
                        </HStack>

                        {/* Form */}
                        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
                            <VStack spacing={6}>
                                {/* Email */}
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel
                                        color="gray.700"
                                        fontWeight="500"
                                        fontSize="sm"
                                        mb={2}
                                    >
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
                                                required: 'Email requerido',
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

                                {/* Password */}
                                <FormControl isInvalid={errors.password}>
                                    <FormLabel
                                        color="gray.700"
                                        fontWeight="500"
                                        fontSize="sm"
                                        mb={2}
                                    >
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
                                                required: 'Contraseña requerida',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Mínimo 6 caracteres'
                                                }
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

                                {/* Forgot password link */}
                                <HStack justify="space-between" w="full">
                                    <Box />
                                    <Link
                                        color="sage.500"
                                        fontSize="sm"
                                        fontWeight="500"
                                        _hover={{ color: "sage.600" }}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </HStack>

                                {/* Submit button */}
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

                        {/* Register link */}
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
                                    Crear cuenta gratis
                                </Link>
                            </HStack>
                        </Center>

                        {/* Demo credentials */}
                        <Box
                            bg="blue.50"
                            p={4}
                            borderRadius="12px"
                            border="1px"
                            borderColor="blue.100"
                            textAlign="center"
                        >
                            <Text fontSize="sm" color="blue.700" fontWeight="500" mb={2}>
                                💡 Demo - Credenciales de prueba
                            </Text>
                            <Text fontSize="xs" color="blue.600" mb={3}>
                                Email: demo@voyaj.com • Contraseña: demo123
                            </Text>
                            <Button
                                size="sm"
                                variant="outline"
                                borderColor="blue.200"
                                color="blue.600"
                                _hover={{ bg: "blue.100" }}
                                onClick={fillDemoCredentials}
                            >
                                Rellenar automáticamente
                            </Button>
                        </Box>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default LoginPage