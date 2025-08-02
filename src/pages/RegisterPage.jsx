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
    Flex,
    Checkbox,
    Progress,
    Badge,
    Center
} from '@chakra-ui/react'
import { FiEye, FiEyeOff, FiMail, FiMapPin, FiArrowLeft, FiUser, FiCheck } from 'react-icons/fi'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { authService } from '../services/api/authService'
import { validateAuthResponse } from '../utils/validators/responseValidators'

const RegisterPage = ({ onNavigate, onLogin }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        mode: 'onBlur'
    })

    const password = watch('password')

    useEffect(() => {
        if (!password) {
            setPasswordStrength(0)
            return
        }

        let strength = 0
        if (password.length >= 6) strength += 25
        if (password.length >= 8) strength += 25
        if (/[A-Z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 25

        setPasswordStrength(strength)
    }, [password])

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 50) return 'red'
        if (passwordStrength < 75) return 'yellow'
        return 'green'
    }

    const getPasswordStrengthLabel = () => {
        if (passwordStrength < 25) return 'Muy débil'
        if (passwordStrength < 50) return 'Débil'
        if (passwordStrength < 75) return 'Buena'
        return 'Excelente'
    }

    const onSubmit = async (data) => {
        setIsLoading(true)

        try {
            const userData = {
                email: data.email,
                password: data.password,
                name: data.name
            }

            const response = await authService.register(userData)
            const validation = validateAuthResponse(response)
            
            if (!validation.isValid) {
                throw new Error(validation.error)
            }

            toast({
                title: "¡Cuenta creada exitosamente!",
                description: "Verifica tu email para completar el registro",
                status: "success",
                duration: 4000,
                isClosable: true,
            })

            onLogin(response.user)

        } catch (error) {
            console.error('[REGISTER_ERROR]', error)
            toast({
                title: "Error al crear cuenta",
                description: error.message || "Ocurrió un error inesperado",
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

    const handleGoToLogin = () => {
        onNavigate('/login')
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
                                Únete a la aventura
                            </Heading>
                            <Text color="gray.600" fontSize="lg">
                                Crea tu cuenta y empieza a planificar viajes increíbles
                            </Text>
                        </VStack>
                        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                            <VStack spacing={5}>
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel color="gray.700" fontWeight="500">
                                        Nombre completo
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            placeholder="Ej: Juan Pérez"
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
                                            {...register('name', {
                                                required: 'El nombre es obligatorio',
                                                minLength: {
                                                    value: 2,
                                                    message: 'El nombre debe tener al menos 2 caracteres'
                                                }
                                            })}
                                        />
                                        <InputRightElement h="48px">
                                            <Icon as={FiUser} color="gray.400" />
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.name && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.name.message}
                                        </Text>
                                    )}
                                </FormControl>

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
                                                required: 'La contraseña es obligatoria',
                                                minLength: {
                                                    value: 6,
                                                    message: 'La contraseña debe tener al menos 6 caracteres'
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
                                    {password && (
                                        <VStack spacing={1} mt={2} align="stretch">
                                            <Progress
                                                value={passwordStrength}
                                                size="sm"
                                                colorScheme={getPasswordStrengthColor()}
                                                borderRadius="full"
                                            />
                                            <HStack justify="space-between">
                                                <Text fontSize="xs" color="gray.500">
                                                    Fortaleza:
                                                </Text>
                                                <Badge
                                                    size="sm"
                                                    colorScheme={getPasswordStrengthColor()}
                                                    variant="subtle"
                                                >
                                                    {getPasswordStrengthLabel()}
                                                </Badge>
                                            </HStack>
                                        </VStack>
                                    )}
                                    {errors.password && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={errors.confirmPassword}>
                                    <FormLabel color="gray.700" fontWeight="500">
                                        Confirmar contraseña
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
                                            {...register('confirmPassword', {
                                                required: 'Confirma tu contraseña',
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
                                    {errors.confirmPassword && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.confirmPassword.message}
                                        </Text>
                                    )}
                                </FormControl>

                                <FormControl isInvalid={errors.acceptTerms}>
                                    <Checkbox
                                        colorScheme="green"
                                        {...register('acceptTerms', {
                                            required: 'Debes aceptar los términos'
                                        })}
                                    >
                                        <Text fontSize="sm" color="gray.600">
                                            Acepto los{' '}
                                            <Link color="sage.500" _hover={{ color: "sage.600" }} fontWeight="500">
                                                términos y condiciones
                                            </Link>
                                        </Text>
                                    </Checkbox>
                                    {errors.acceptTerms && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.acceptTerms.message}
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
                                    loadingText="Creando cuenta..."
                                    isDisabled={!isValid}
                                    _hover={{
                                        bg: "sage.500",
                                        transform: "translateY(-1px)",
                                        shadow: "lg"
                                    }}
                                    _active={{ bg: "sage.600" }}
                                    transition="all 0.2s"
                                    rightIcon={<FiCheck />}
                                >
                                    Crear cuenta
                                </Button>
                            </VStack>
                        </Box>

                        <Center>
                            <HStack spacing={2}>
                                <Text color="gray.500" fontSize="sm">
                                    ¿Ya tienes cuenta?
                                </Text>
                                <Link
                                    color="sage.500"
                                    fontWeight="500"
                                    fontSize="sm"
                                    _hover={{ color: "sage.600" }}
                                    onClick={handleGoToLogin}
                                >
                                    Iniciar sesión
                                </Link>
                            </HStack>
                        </Center>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default RegisterPage