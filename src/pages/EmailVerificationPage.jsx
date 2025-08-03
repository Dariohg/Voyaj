import React, { useState, useEffect } from 'react'
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Input,
    Button,
    IconButton,
    useToast,
    Alert,
    AlertIcon,
    Circle,
    Heading,
    Link,
    Spinner
} from '@chakra-ui/react'
import { FiArrowLeft, FiMail, FiRefreshCw, FiCheck } from 'react-icons/fi'

const EmailVerificationPage = ({ onNavigate, userEmail, onVerificationSuccess }) => {
    const [verificationCode, setVerificationCode] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const toast = useToast()

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const getAuthHeaders = () => {
        const token = localStorage.getItem('access_token')
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
    }

    const handleVerifyEmail = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            toast({
                title: "Código inválido",
                description: "El código debe tener 6 dígitos",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setIsVerifying(true)
        try {
            console.log('[EMAIL_VERIFICATION] Sending verification request...')
            
            const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    email: userEmail,
                    token: verificationCode
                })
            })

            console.log('[EMAIL_VERIFICATION] Response status:', response.status)

            if (response.ok) {
                const data = await response.json()
                console.log('[EMAIL_VERIFICATION] Success:', data)
                
                toast({
                    title: "¡Email verificado!",
                    description: "Tu cuenta ha sido verificada exitosamente",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                
                // Esperar un momento antes de redirigir para que el usuario vea el mensaje
                setTimeout(() => {
                    onVerificationSuccess?.()
                    onNavigate('/dashboard')
                }, 1500)

            } else {
                const errorData = await response.json()
                console.log('[EMAIL_VERIFICATION] Error response:', errorData)
                
                let errorMessage = "Código inválido o expirado"
                if (errorData.detail && Array.isArray(errorData.detail)) {
                    errorMessage = errorData.detail.map(err => err.msg || err.message || 'Error de validación').join(', ')
                } else if (errorData.detail && typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail
                }
                
                toast({
                    title: "Error de verificación",
                    description: errorMessage,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('[EMAIL_VERIFICATION_ERROR]', error)
            toast({
                title: "Error de conexión",
                description: `No se pudo conectar con el servidor`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResendCode = async () => {
        if (countdown > 0) return

        setIsResending(true)
        try {
            console.log('[RESEND_VERIFICATION] Sending resend request...')
            
            const response = await fetch(`${API_BASE_URL}/auth/send-verification`, {
                method: 'POST',
                headers: getAuthHeaders()
            })

            console.log('[RESEND_VERIFICATION] Response status:', response.status)

            if (response.ok) {
                console.log('[RESEND_VERIFICATION] Success')
                
                toast({
                    title: "Código reenviado",
                    description: "Revisa tu email para el nuevo código de verificación",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
                setVerificationCode('')
                setCountdown(60) // 1 minuto de espera
            } else {
                const errorData = await response.json()
                console.log('[RESEND_VERIFICATION] Error response:', errorData)
                
                let errorMessage = "No se pudo reenviar el código"
                if (errorData.detail && Array.isArray(errorData.detail)) {
                    errorMessage = errorData.detail.map(err => err.msg || err.message || 'Error de validación').join(', ')
                } else if (errorData.detail && typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail
                }
                
                toast({
                    title: "Error al reenviar",
                    description: errorMessage,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('[RESEND_VERIFICATION_ERROR]', error)
            toast({
                title: "Error de conexión",
                description: `No se pudo conectar con el servidor`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsResending(false)
        }
    }

    const handleBackToLogin = () => {
        onNavigate('/login')
    }

    const handleCodeInput = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
        setVerificationCode(value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && verificationCode.length === 6) {
            handleVerifyEmail()
        }
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
                            onClick={handleBackToLogin}
                            aria-label="Volver al inicio de sesión"
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        />
                        <Text fontSize="sm" color="gray.500" fontWeight="500">
                            Verificación de Email
                        </Text>
                        <Box w={10} /> {/* Spacer */}
                    </HStack>

                    <VStack spacing={6} align="center" textAlign="center">
                        <Circle size="80px" bg="sage.100" color="sage.600">
                            <FiMail size={32} />
                        </Circle>

                        <VStack spacing={3}>
                            <Heading size="lg" color="gray.800" fontWeight="600">
                                Verifica tu email
                            </Heading>
                            <Text color="gray.600" fontSize="md" maxW="sm">
                                Hemos enviado un código de verificación de 6 dígitos a
                            </Text>
                            <Text color="sage.600" fontWeight="600" fontSize="md">
                                {userEmail}
                            </Text>
                        </VStack>
                    </VStack>

                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Text fontSize="sm" color="gray.700" mb={3} textAlign="center">
                                Ingresa el código de verificación
                            </Text>
                            <Input
                                value={verificationCode}
                                onChange={handleCodeInput}
                                onKeyPress={handleKeyPress}
                                placeholder="000000"
                                fontSize="2xl"
                                textAlign="center"
                                letterSpacing="0.5em"
                                maxLength={6}
                                h="60px"
                                bg="gray.50"
                                border="2px"
                                borderColor="gray.200"
                                _focus={{
                                    borderColor: "sage.400",
                                    bg: "white",
                                    boxShadow: "0 0 0 1px var(--chakra-colors-sage-400)"
                                }}
                                _placeholder={{
                                    color: "gray.400",
                                    letterSpacing: "0.2em"
                                }}
                                autoFocus
                            />
                        </Box>

                        <Button
                            onClick={handleVerifyEmail}
                            isLoading={isVerifying}
                            loadingText="Verificando..."
                            isDisabled={verificationCode.length !== 6}
                            w="full"
                            h="48px"
                            bg="sage.400"
                            color="white"
                            borderRadius="12px"
                            fontWeight="500"
                            _hover={{
                                bg: "sage.500",
                                transform: "translateY(-1px)",
                                shadow: "lg"
                            }}
                            _active={{ bg: "sage.600" }}
                            _disabled={{
                                bg: "gray.300",
                                color: "gray.500",
                                cursor: "not-allowed",
                                _hover: {}
                            }}
                            transition="all 0.2s"
                            rightIcon={<FiCheck />}
                        >
                            Verificar email
                        </Button>

                        <VStack spacing={3}>
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                                ¿No recibiste el código?
                            </Text>
                            
                            <Button
                                onClick={handleResendCode}
                                isLoading={isResending}
                                loadingText="Reenviando..."
                                isDisabled={countdown > 0}
                                variant="ghost"
                                color="sage.600"
                                fontWeight="500"
                                size="sm"
                                _hover={{ color: "sage.700", bg: "sage.50" }}
                                leftIcon={isResending ? <Spinner size="xs" /> : <FiRefreshCw />}
                            >
                                {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar código'}
                            </Button>
                        </VStack>

                        <Alert status="info" borderRadius="12px" bg="blue.50" borderColor="blue.200">
                            <AlertIcon color="blue.500" />
                            <Box>
                                <Text fontSize="sm" color="blue.800">
                                    Revisa tu carpeta de spam si no encuentras el email.
                                    El código expira en 24 horas.
                                </Text>
                            </Box>
                        </Alert>
                    </VStack>

                    <VStack spacing={4} pt={4}>
                        <HStack spacing={2} justify="center">
                            <Text color="gray.500" fontSize="sm">
                                ¿Quieres usar otro email?
                            </Text>
                            <Link
                                color="sage.500"
                                fontWeight="500"
                                fontSize="sm"
                                _hover={{ color: "sage.600" }}
                                onClick={handleBackToLogin}
                            >
                                Cambiar cuenta
                            </Link>
                        </HStack>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    )
}

export default EmailVerificationPage