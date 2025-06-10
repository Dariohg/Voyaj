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
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

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

    // Calculate password strength
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
            await new Promise(resolve => setTimeout(resolve, 2000))

            toast({
                title: "¡Cuenta creada exitosamente!",
                description: "Bienvenido a Voyaj. Tu aventura comienza ahora.",
                status: "success",
                duration: 4000,
                isClosable: true,
            })

            console.log('Registration successful:', data)

        } catch (error) {
            toast({
                title: "Error al crear cuenta",
                description: "Ocurrió un error. Por favor intenta nuevamente.",
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
            title: `Registrándose con ${provider}`,
            description: "Redirigiendo...",
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
                    <VStack spacing={8} pt={4}>
                        {/* Title section */}
                        <VStack spacing={3} textAlign="center">
                            <Heading
                                size="xl"
                                color="gray.800"
                                fontWeight="600"
                                letterSpacing="tight"
                            >
                                Crear cuenta
                            </Heading>
                            <Text color="gray.500" fontSize="md">
                                Únete a miles de viajeros que confían en Voyaj
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
                            <Button
                                w="full"
                                h="48px"
                                variant="outline"
                                borderColor="gray.200"
                                leftIcon={<FaFacebook color="#1877F2" />}
                                onClick={() => handleSocialLogin('Facebook')}
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
                                Continuar con Facebook
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
                                {/* Name fields */}
                                <HStack spacing={4} w="full">
                                    <FormControl isInvalid={errors.firstName}>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="500"
                                            fontSize="sm"
                                            mb={2}
                                        >
                                            Nombre
                                        </FormLabel>
                                        <Input
                                            placeholder="Juan"
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
                                            {...register('firstName', {
                                                required: 'Nombre requerido',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Mínimo 2 caracteres'
                                                }
                                            })}
                                        />
                                        {errors.firstName && (
                                            <Text color="red.400" fontSize="xs" mt={1}>
                                                {errors.firstName.message}
                                            </Text>
                                        )}
                                    </FormControl>

                                    <FormControl isInvalid={errors.lastName}>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="500"
                                            fontSize="sm"
                                            mb={2}
                                        >
                                            Apellido
                                        </FormLabel>
                                        <Input
                                            placeholder="Pérez"
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
                                            {...register('lastName', {
                                                required: 'Apellido requerido',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Mínimo 2 caracteres'
                                                }
                                            })}
                                        />
                                        {errors.lastName && (
                                            <Text color="red.400" fontSize="xs" mt={1}>
                                                {errors.lastName.message}
                                            </Text>
                                        )}
                                    </FormControl>
                                </HStack>

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

                                    {password && (
                                        <VStack spacing={2} mt={2} align="start">
                                            <HStack justify="space-between" w="full">
                                                <Text fontSize="xs" color="gray.500">
                                                    Fortaleza:
                                                </Text>
                                                <Badge
                                                    colorScheme={getPasswordStrengthColor()}
                                                    size="sm"
                                                    variant="subtle"
                                                    fontSize="xs"
                                                >
                                                    {getPasswordStrengthLabel()}
                                                </Badge>
                                            </HStack>
                                            <Progress
                                                value={passwordStrength}
                                                size="sm"
                                                colorScheme={getPasswordStrengthColor()}
                                                w="full"
                                                borderRadius="full"
                                            />
                                        </VStack>
                                    )}

                                    {errors.password && (
                                        <Text color="red.400" fontSize="xs" mt={1}>
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* Confirm Password */}
                                <FormControl isInvalid={errors.confirmPassword}>
                                    <FormLabel
                                        color="gray.700"
                                        fontWeight="500"
                                        fontSize="sm"
                                        mb={2}
                                    >
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

                                {/* Terms checkbox */}
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

                        {/* Login link */}
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

                        {/* Benefits note */}
                        <Box
                            bg="green.50"
                            p={4}
                            borderRadius="12px"
                            border="1px"
                            borderColor="green.100"
                            textAlign="center"
                        >
                            <Text fontSize="sm" color="green.700" fontWeight="500">
                                🎉 Tu primer viaje es gratis
                            </Text>
                            <Text fontSize="xs" color="green.600" mt={1}>
                                Sin tarjeta de crédito • Cancela cuando quieras
                            </Text>
                        </Box>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default RegisterPage