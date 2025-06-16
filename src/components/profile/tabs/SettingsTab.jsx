// src/components/profile/tabs/SettingsTab.jsx
import {
    VStack,
    HStack,
    Heading,
    Text,
    Card,
    CardBody,
    CardHeader,
    Switch,
    Select,
    Divider,
    Button,
    Badge,
    SimpleGrid,
    Icon,
    Box
} from '@chakra-ui/react'
import {
    FiBell,
    FiGlobe,
    FiDollarSign,
    FiClock,
    FiLock,
    FiMail,
    FiSmartphone,
    FiEye,
    FiUsers,
    FiCamera
} from 'react-icons/fi'
import { useState } from 'react'

const SettingsTab = ({ user }) => {
    const [notifications, setNotifications] = useState(user.preferences.notifications)
    const [privacy, setPrivacy] = useState(user.preferences.privacy)
    const [language, setLanguage] = useState(user.preferences.language)
    const [currency, setCurrency] = useState(user.preferences.currency)
    const [timezone, setTimezone] = useState(user.preferences.timezone)

    const handleNotificationChange = (key, value) => {
        setNotifications(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handlePrivacyChange = (key, value) => {
        setPrivacy(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const saveSettings = () => {
        console.log('Guardando configuración:', {
            notifications,
            privacy,
            language,
            currency,
            timezone
        })
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Preferencias generales */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardHeader>
                    <HStack spacing={3}>
                        <Icon as={FiGlobe} color="sage.400" />
                        <Heading size="md" color="gray.800">
                            Preferencias Generales
                        </Heading>
                    </HStack>
                </CardHeader>
                <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <VStack spacing={2} align="start">
                                <Text fontSize="sm" fontWeight="500" color="gray.700">
                                    Idioma
                                </Text>
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    bg="white"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                >
                                    <option value="es" style={{ color: 'black' }}>Español</option>
                                    <option value="en" style={{ color: 'black' }}>English</option>
                                    <option value="fr" style={{ color: 'black' }}>Français</option>
                                </Select>
                            </VStack>

                            <VStack spacing={2} align="start">
                                <Text fontSize="sm" fontWeight="500" color="gray.700">
                                    Moneda
                                </Text>
                                <Select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    bg="white"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                >
                                    <option value="MXN" style={{ color: 'black' }}>Peso Mexicano (MXN)</option>
                                    <option value="USD" style={{ color: 'black' }}>Dólar Americano (USD)</option>
                                    <option value="EUR" style={{ color: 'black' }}>Euro (EUR)</option>
                                </Select>
                            </VStack>

                            <VStack spacing={2} align="start">
                                <Text fontSize="sm" fontWeight="500" color="gray.700">
                                    Zona Horaria
                                </Text>
                                <Select
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                    bg="white"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                                >
                                    <option value="America/Mexico_City" style={{ color: 'black' }}>México (GMT-6)</option>
                                    <option value="America/New_York" style={{ color: 'black' }}>Nueva York (GMT-5)</option>
                                    <option value="Europe/Madrid" style={{ color: 'black' }}>Madrid (GMT+1)</option>
                                </Select>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </CardBody>
            </Card>

            {/* Notificaciones */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardHeader>
                    <HStack spacing={3}>
                        <Icon as={FiBell} color="sage.400" />
                        <Heading size="md" color="gray.800">
                            Notificaciones
                        </Heading>
                    </HStack>
                </CardHeader>
                <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiMail} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Notificaciones por email
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Recibe actualizaciones importantes por correo
                                    </Text>
                                </VStack>
                            </HStack>
                            <Switch
                                isChecked={notifications.email}
                                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                                colorScheme="sage"
                            />
                        </HStack>

                        <Divider />

                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiSmartphone} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Notificaciones push
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Recibe notificaciones en tu dispositivo
                                    </Text>
                                </VStack>
                            </HStack>
                            <Switch
                                isChecked={notifications.push}
                                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                                colorScheme="sage"
                            />
                        </HStack>

                        <Divider />

                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiGlobe} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Actualizaciones de viajes
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Notificaciones sobre tus viajes activos
                                    </Text>
                                </VStack>
                            </HStack>
                            <Switch
                                isChecked={notifications.trips}
                                onChange={(e) => handleNotificationChange('trips', e.target.checked)}
                                colorScheme="sage"
                            />
                        </HStack>

                        <Divider />

                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiCamera} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Nuevas fotos compartidas
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Cuando compañeros suban fotos de viajes grupales
                                    </Text>
                                </VStack>
                            </HStack>
                            <Switch
                                isChecked={notifications.photos}
                                onChange={(e) => handleNotificationChange('photos', e.target.checked)}
                                colorScheme="sage"
                            />
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>

            {/* Privacidad */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardHeader>
                    <HStack spacing={3}>
                        <Icon as={FiLock} color="sage.400" />
                        <Heading size="md" color="gray.800">
                            Privacidad
                        </Heading>
                    </HStack>
                </CardHeader>
                <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiEye} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Visibilidad del perfil
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Quién puede ver tu información personal
                                    </Text>
                                </VStack>
                            </HStack>
                            <Select
                                value={privacy.profile}
                                onChange={(e) => handlePrivacyChange('profile', e.target.value)}
                                maxW="140px"
                                size="sm"
                                bg="white"
                                borderColor="gray.300"
                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                            >
                                <option value="public" style={{ color: 'black' }}>Público</option>
                                <option value="friends" style={{ color: 'black' }}>Amigos</option>
                                <option value="private" style={{ color: 'black' }}>Privado</option>
                            </Select>
                        </HStack>

                        <Divider />

                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiUsers} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Visibilidad de viajes
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Quién puede ver tus viajes
                                    </Text>
                                </VStack>
                            </HStack>
                            <Select
                                value={privacy.trips}
                                onChange={(e) => handlePrivacyChange('trips', e.target.value)}
                                maxW="140px"
                                size="sm"
                                bg="white"
                                borderColor="gray.300"
                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                            >
                                <option value="public" style={{ color: 'black' }}>Público</option>
                                <option value="friends" style={{ color: 'black' }}>Amigos</option>
                                <option value="private" style={{ color: 'black' }}>Privado</option>
                            </Select>
                        </HStack>

                        <Divider />

                        <HStack justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Icon as={FiCamera} boxSize={5} color="gray.500" />
                                <VStack spacing={0} align="start">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        Visibilidad de fotos
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Quién puede ver tus fotos
                                    </Text>
                                </VStack>
                            </HStack>
                            <Select
                                value={privacy.photos}
                                onChange={(e) => handlePrivacyChange('photos', e.target.value)}
                                maxW="140px"
                                size="sm"
                                bg="white"
                                borderColor="gray.300"
                                _focus={{ borderColor: "sage.400", boxShadow: "0 0 0 1px sage.400" }}
                            >
                                <option value="public" style={{ color: 'black' }}>Público</option>
                                <option value="friends" style={{ color: 'black' }}>Amigos</option>
                                <option value="private" style={{ color: 'black' }}>Privado</option>
                            </Select>
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>

            {/* Plan actual */}
            <Card bg="gradient-to-r" bgGradient="linear(to-r, sage.400, sage.500)" color="white">
                <CardBody p={6}>
                    <VStack spacing={4} align="start">
                        <HStack justify="space-between" w="full">
                            <VStack spacing={1} align="start">
                                <Text