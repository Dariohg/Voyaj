import {
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    Button,
    Divider,
    useBreakpointValue
} from '@chakra-ui/react'
import {
    FiHome,
    FiPlus,
    FiCalendar,
    FiCamera,
    FiBarChart2,
    FiUser,
    FiSettings
} from 'react-icons/fi'

const Sidebar = ({ currentRoute, onNavigate }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false })

    // Si es móvil, no mostrar sidebar (se puede implementar como drawer después)
    if (isMobile) return null

    const navigationItems = [
        { icon: FiHome, label: 'Dashboard', route: '/dashboard', section: 'main' },
        { icon: FiPlus, label: 'Nuevo Viaje', route: '/create-trip', section: 'main' },
        { icon: FiCalendar, label: 'Mis Viajes', route: '/my-trips', section: 'main' },
        { icon: FiCamera, label: 'Fotos', route: '/photos', section: 'main' },
        { icon: FiBarChart2, label: 'Estadísticas', route: '/stats', section: 'main' },
    ]

    const secondaryItems = [
        { icon: FiUser, label: 'Mi Perfil', route: '/profile', section: 'secondary' },
        { icon: FiSettings, label: 'Configuración', route: '/settings', section: 'secondary' },
    ]

    const handleNavigation = (route) => {
        onNavigate(route)
    }

    const isActive = (route) => currentRoute === route

    return (
        <Box
            w="280px"
            minH="calc(100vh - 81px)" // Altura total menos el navbar
            bg="white"
            borderRight="1px"
            borderColor="gray.200"
            position="fixed"
            left={0}
            top="81px" // Altura del navbar
            p={6}
            overflowY="auto"
        >
            <VStack spacing={6} align="stretch">
                {/* Navegación Principal */}
                <VStack spacing={2} align="stretch">
                    <Text fontSize="xs" fontWeight="600" color="gray.500" uppercase tracking="wider" mb={2}>
                        Navegación
                    </Text>
                    {navigationItems.map((item) => (
                        <Button
                            key={item.route}
                            variant={isActive(item.route) ? "solid" : "ghost"}
                            colorScheme={isActive(item.route) ? "sage" : "gray"}
                            leftIcon={<Icon as={item.icon} boxSize={5} />}
                            onClick={() => handleNavigation(item.route)}
                            justifyContent="flex-start"
                            h={12}
                            fontWeight={isActive(item.route) ? "600" : "500"}
                            _hover={{
                                bg: isActive(item.route) ? "sage.500" : "gray.100",
                                transform: "translateX(4px)",
                            }}
                            transition="all 0.2s"
                            borderRadius="12px"
                        >
                            {item.label}
                        </Button>
                    ))}
                </VStack>

                <Divider />

                {/* Configuración */}
                <VStack spacing={2} align="stretch">
                    <Text fontSize="xs" fontWeight="600" color="gray.500" uppercase tracking="wider" mb={2}>
                        Cuenta
                    </Text>
                    {secondaryItems.map((item) => (
                        <Button
                            key={item.route}
                            variant={isActive(item.route) ? "solid" : "ghost"}
                            colorScheme={isActive(item.route) ? "sage" : "gray"}
                            leftIcon={<Icon as={item.icon} boxSize={5} />}
                            onClick={() => handleNavigation(item.route)}
                            justifyContent="flex-start"
                            h={12}
                            fontWeight={isActive(item.route) ? "600" : "500"}
                            _hover={{
                                bg: isActive(item.route) ? "sage.500" : "gray.100",
                                transform: "translateX(4px)",
                            }}
                            transition="all 0.2s"
                            borderRadius="12px"
                        >
                            {item.label}
                        </Button>
                    ))}
                </VStack>

                {/* Espacio para futuras secciones */}
                <Box flex={1} />

                {/* Footer del Sidebar */}
                <Box
                    p={4}
                    bg="sage.50"
                    borderRadius="12px"
                    border="1px"
                    borderColor="sage.100"
                >
                    <VStack spacing={2}>
                        <Text fontSize="sm" fontWeight="600" color="sage.700" textAlign="center">
                            ¿Necesitas ayuda?
                        </Text>
                        <Text fontSize="xs" color="sage.600" textAlign="center">
                            Consulta nuestra guía de usuario para sacar el máximo provecho a Voyaj.
                        </Text>
                        <Button
                            size="sm"
                            variant="outline"
                            borderColor="sage.200"
                            color="sage.600"
                            _hover={{ bg: "sage.100" }}
                            w="full"
                        >
                            Ver Guía
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
}

export default Sidebar