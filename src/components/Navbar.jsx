import {
    Box,
    Container,
    Flex,
    HStack,
    VStack,
    Heading,
    Text,
    Icon,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
    IconButton,
    useBreakpointValue,
    Spinner
} from '@chakra-ui/react'
import {
    FiMapPin,
    FiUser,
    FiSettings,
    FiLogOut,
    FiMenu
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { subscriptionsService } from '../services/api/subscriptionsService'

const Navbar = ({ user, onNavigate, onLogout, onMenuClick }) => {
    const [subscription, setSubscription] = useState(null)
    const [isLoadingSubscription, setIsLoadingSubscription] = useState(true)
    const isMobile = useBreakpointValue({ base: true, lg: false })

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            if (!user) return
            
            try {
                setIsLoadingSubscription(true)
                const response = await subscriptionsService.getStatus()
                setSubscription(response)
            } catch (error) {
                console.error('[SUBSCRIPTION_STATUS_ERROR]', error)
                setSubscription({ 
                    plan: 'free', 
                    is_pro: false, 
                    status: 'active' 
                })
            } finally {
                setIsLoadingSubscription(false)
            }
        }

        fetchSubscriptionStatus()
    }, [user])

    const handleProfile = () => {
        onNavigate('/profile')
    }

    const handleSettings = () => {
        onNavigate('/settings')
    }

    const getPlanDisplayName = () => {
        if (isLoadingSubscription) return "Cargando..."
        if (!subscription) return "Viajero Premium"
        
        return subscription.is_pro ? "Viajero Premium" : "Viajero FREE"
    }

    return (
        <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={100}>
            <Container maxW="7xl" py={4} px={{ base: 4, md: 8 }}>
                <Flex justify="space-between" align="center">
                    <HStack spacing={3}>
                        {isMobile && (
                            <IconButton
                                aria-label="Abrir menú"
                                icon={<FiMenu />}
                                variant="ghost"
                                size="md"
                                onClick={onMenuClick}
                                color="gray.600"
                                _hover={{ bg: "gray.100" }}
                            />
                        )}

                        <HStack spacing={2} cursor="pointer" onClick={() => onNavigate('/dashboard')}>
                            <Icon as={FiMapPin} boxSize={8} color="sage.400" />
                            <Heading size="lg" color="sage.400" fontWeight="600">
                                Voyaj
                            </Heading>
                        </HStack>
                    </HStack>

                    <Menu>
                        <MenuButton>
                            <HStack spacing={3} cursor="pointer" _hover={{ bg: "gray.50" }} p={2} borderRadius="lg">
                                {!isMobile && (
                                    <VStack spacing={0} align="end">
                                        <Text fontSize="sm" fontWeight="500" color="gray.700">
                                            {user?.name || "Juan Pérez"}
                                        </Text>
                                        <HStack spacing={1} align="center">
                                            {isLoadingSubscription && (
                                                <Spinner size="xs" color="sage.400" />
                                            )}
                                            <Text fontSize="xs" color="gray.500">
                                                {getPlanDisplayName()}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                )}
                                <Avatar
                                    size="sm"
                                    name={user?.name || "Juan Pérez"}
                                    bg="sage.400"
                                    color="white"
                                />
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<FiUser />} onClick={handleProfile}>
                                Mi Perfil
                            </MenuItem>
                            <MenuItem icon={<FiSettings />} onClick={handleSettings}>
                                Configuración
                            </MenuItem>
                            <Divider />
                            <MenuItem icon={<FiLogOut />} onClick={onLogout} color="red.500">
                                Cerrar Sesión
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar