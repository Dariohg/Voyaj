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
    Divider
} from '@chakra-ui/react'
import {
    FiMapPin,
    FiUser,
    FiSettings,
    FiLogOut
} from 'react-icons/fi'

const Navbar = ({ user, onNavigate, onLogout }) => {
    const handleProfile = () => {
        onNavigate('/profile')
    }

    const handleSettings = () => {
        onNavigate('/settings')
    }

    return (
        <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={100}>
            <Container maxW="7xl" py={4} px={{ base: 4, md: 8 }}>
                <Flex justify="space-between" align="center">
                    {/* Logo */}
                    <HStack spacing={3} cursor="pointer" onClick={() => onNavigate('/dashboard')}>
                        <Icon as={FiMapPin} boxSize={8} color="sage.400" />
                        <Heading size="lg" color="sage.400" fontWeight="600">
                            Voyaj
                        </Heading>
                    </HStack>

                    {/* User Menu */}
                    <Menu>
                        <MenuButton>
                            <HStack spacing={3} cursor="pointer" _hover={{ bg: "gray.50" }} p={2} borderRadius="lg">
                                <VStack spacing={0} align="end">
                                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                                        {user?.name || "Juan Pérez"}
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        Viajero Premium
                                    </Text>
                                </VStack>
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