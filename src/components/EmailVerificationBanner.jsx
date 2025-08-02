import React, { useState } from 'react'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    HStack,
    Input,
    Text,
    VStack,
    useToast,
    Collapse,
    IconButton,
    Spinner
} from '@chakra-ui/react'
import { FiMail, FiX, FiRefreshCw } from 'react-icons/fi'

const EmailVerificationBanner = ({ user, onVerificationSuccess, onDismiss }) => {
    const [verificationCode, setVerificationCode] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const toast = useToast()

    // Usar la misma configuración que el resto de la app
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

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
                    email: user.email,
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
                onVerificationSuccess?.()
            } else {
                const errorData = await response.json()
                console.log('[EMAIL_VERIFICATION] Error response:', errorData)
                
                // Manejar el array de errores de validación
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
                description: `No se pudo conectar con el servidor (${API_BASE_URL})`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResendCode = async () => {
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
            } else {
                const errorData = await response.json()
                console.log('[RESEND_VERIFICATION] Error response:', errorData)
                
                // Manejar el array de errores de validación
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
                description: `No se pudo conectar con el servidor (${API_BASE_URL})`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } finally {
            setIsResending(false)
        }
    }

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded)
        if (!isExpanded) {
            setVerificationCode('')
        }
    }

    if (!user) {
        return null
    }

    return (
        <Box w="full" bg="white" borderRadius="12px" overflow="hidden" boxShadow="md">
            <Alert status="warning" bg="orange.50" borderColor="orange.200" borderWidth="1px">
                <AlertIcon color="orange.500" />
                <Box flex="1">
                    <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="600" color="orange.800" fontSize="sm">
                                Email no verificado
                            </Text>
                            <Text color="orange.700" fontSize="xs">
                                Verifica tu email para acceder a todas las funciones
                            </Text>
                        </VStack>
                        <HStack spacing={2}>
                            <Button
                                size="xs"
                                bg="orange.500"
                                color="white"
                                _hover={{ bg: "orange.600" }}
                                onClick={handleToggleExpand}
                                fontWeight="500"
                            >
                                {isExpanded ? 'Ocultar' : 'Verificar'}
                            </Button>
                            {onDismiss && (
                                <IconButton
                                    icon={<FiX />}
                                    size="xs"
                                    variant="ghost"
                                    color="orange.600"
                                    _hover={{ bg: "orange.100" }}
                                    onClick={onDismiss}
                                    aria-label="Cerrar banner"
                                />
                            )}
                        </HStack>
                    </HStack>
                </Box>
            </Alert>

            <Collapse in={isExpanded} animateOpacity>
                <Box p={4} bg="gray.50" borderTop="1px" borderColor="gray.200">
                    <VStack spacing={4} align="stretch">
                        <VStack spacing={2}>
                            <Text fontSize="sm" color="gray.700" textAlign="center">
                                Ingresa el código de 6 dígitos enviado a
                            </Text>
                            <Text fontSize="sm" color="gray.800" fontWeight="600" textAlign="center">
                                {user.email}
                            </Text>
                        </VStack>

                        <HStack spacing={3}>
                            <Input
                                placeholder="123456"
                                value={verificationCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                                    setVerificationCode(value)
                                }}
                                maxLength={6}
                                textAlign="center"
                                letterSpacing="wider"
                                fontWeight="600"
                                fontSize="lg"
                                h="44px"
                                bg="white"
                                border="2px"
                                borderColor="gray.200"
                                _focus={{
                                    borderColor: "orange.400",
                                    boxShadow: "0 0 0 1px rgba(251, 146, 60, 0.3)"
                                }}
                            />
                            <Button
                                onClick={handleVerifyEmail}
                                isLoading={isVerifying}
                                loadingText="Verificando..."
                                isDisabled={verificationCode.length !== 6}
                                bg="orange.500"
                                color="white"
                                _hover={{ bg: "orange.600" }}
                                _disabled={{ bg: "gray.300", cursor: "not-allowed" }}
                                h="44px"
                                px={6}
                                fontWeight="500"
                            >
                                Verificar
                            </Button>
                        </HStack>

                        <HStack justify="center" spacing={1}>
                            <Text fontSize="xs" color="gray.600">
                                ¿No recibiste el código?
                            </Text>
                            <Button
                                variant="link"
                                size="xs"
                                color="orange.600"
                                fontWeight="600"
                                onClick={handleResendCode}
                                isLoading={isResending}
                                spinner={<Spinner size="xs" />}
                                _hover={{ color: "orange.700" }}
                            >
                                <HStack spacing={1}>
                                    <FiRefreshCw />
                                    <Text>Reenviar</Text>
                                </HStack>
                            </Button>
                        </HStack>

                        {/* Debug info en desarrollo */}
                        {import.meta.env.DEV && (
                            <Box fontSize="xs" color="gray.500" textAlign="center" mt={2}>
                                API: {API_BASE_URL}
                            </Box>
                        )}
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    )
}

export default EmailVerificationBanner