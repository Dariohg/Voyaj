import {
    Box,
    VStack,
    Text,
    Icon,
    Button,
    Divider,
    useBreakpointValue,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tooltip,
    HStack
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

const Sidebar = ({ currentRoute, onNavigate, isOpen = false, onClose }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false })

    const navigationItems = [
        { icon: FiHome, label: 'Dashboard', route: '/dashboard' },
        { icon: FiPlus, label: 'Nuevo Viaje', route: '/create-trip' },
        { icon: FiCalendar, label: 'Mis Viajes', route: '/my-trips' },
        { icon: FiCamera, label: 'Fotos', route: '/photos' },
        { icon: FiBarChart2, label: 'Estadísticas', route: '/stats' },
    ]

    const secondaryItems = [
        { icon: FiUser, label: 'Mi Perfil', route: '/profile' },
        { icon: FiSettings, label: 'Configuración', route: '/settings' },
    ]

    const handleNavigation = (route) => {
        onNavigate(route)
        if (isMobile && onClose) {
            onClose()
        }
    }

    const isActive = (route) => currentRoute === route

    // Botón con diseño de isla para desktop
    const renderFloatingButton = (item) => (
        <Tooltip
            key={item.route}
            label={item.label}
            placement="right"
            hasArrow
            bg="gray.800"
            color="white"
            fontSize="sm"
            px={3}
            py={2}
            borderRadius="md"
        >
            <Box
                as="button"
                onClick={() => handleNavigation(item.route)}
                w={12}
                h={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={isActive(item.route) ? "sage.400" : "white"}
                color={isActive(item.route) ? "white" : "gray.600"}
                borderRadius="full"
                boxShadow={isActive(item.route) ? "lg" : "md"}
                border="1px"
                borderColor={isActive(item.route) ? "sage.400" : "gray.200"}
                transition="all 0.3s ease"
                _hover={{
                    bg: isActive(item.route) ? "sage.500" : "gray.50",
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                    borderColor: isActive(item.route) ? "sage.500" : "gray.300",
                }}
                _active={{
                    transform: "translateY(0px)",
                }}
            >
                <Icon as={item.icon} boxSize={5} />
            </Box>
        </Tooltip>
    )

    // Botón normal para móvil (drawer)
    const renderMobileButton = (item) => (
        <Button
            key={item.route}
            variant="ghost"
            bg={isActive(item.route) ? "sage.400" : "white"}
            color={isActive(item.route) ? "white" : "gray.700"}
            leftIcon={<Icon as={item.icon} boxSize={5} color={isActive(item.route) ? "white" : "gray.600"} />}
            onClick={() => handleNavigation(item.route)}
            justifyContent="flex-start"
            w="full"
            h={12}
            fontWeight={isActive(item.route) ? "600" : "500"}
            _hover={{
                bg: isActive(item.route) ? "sage.500" : "gray.50",
                color: isActive(item.route) ? "white" : "gray.800",
            }}
            transition="all 0.2s"
            borderRadius="8px"
            border="none"
        >
            {item.label}
        </Button>
    )

    // Contenido para móvil (drawer)
    const mobileContent = (
        <VStack spacing={6} align="stretch" w="full">
            <Box>
                <Text fontSize="xs" fontWeight="600" color="gray.500" uppercase tracking="wider" mb={4}>
                    Navegación
                </Text>
                <VStack spacing={2} align="stretch">
                    {navigationItems.map(renderMobileButton)}
                </VStack>
            </Box>

            <Divider />

            <Box>
                <Text fontSize="xs" fontWeight="600" color="gray.500" uppercase tracking="wider" mb={4}>
                    Cuenta
                </Text>
                <VStack spacing={2} align="stretch">
                    {secondaryItems.map(renderMobileButton)}
                </VStack>
            </Box>
        </VStack>
    )

    // MOBILE: Drawer
    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay bg="blackAlpha.600" />
                <DrawerContent maxW="280px" bg="white">
                    <DrawerCloseButton color="gray.600" />
                    <DrawerHeader borderBottomWidth="1px" borderColor="gray.200" pb={4} bg="white">
                        <Text fontSize="lg" fontWeight="600" color="sage.400">
                            Voyaj
                        </Text>
                    </DrawerHeader>
                    <DrawerBody p={6} bg="white">
                        {mobileContent}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        )
    }

    // DESKTOP: Sidebar flotante con iconos
    return (
        <Box
            position="fixed"
            left={6}
            top="120px" // Alineado con el contenido principal
            zIndex={10}
            bg="transparent"
        >
            <VStack
                spacing={4}
                p={4}
                bg="white"
                borderRadius="2xl"
                boxShadow="2xl"
                border="1px"
                borderColor="gray.100"
            >
                {/* Navegación Principal */}
                {navigationItems.map(renderFloatingButton)}

                {/* Divider flotante */}
                <Box w={8} h="1px" bg="gray.200" />

                {/* Configuración */}
                {secondaryItems.map(renderFloatingButton)}
            </VStack>
        </Box>
    )
}

export default Sidebar