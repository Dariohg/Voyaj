import {
    Box,
    Container,
    Heading,
    Button,
    HStack,
    Flex,
    Icon,
    useBreakpointValue,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    VStack,
    Text
} from '@chakra-ui/react'
import { FiMapPin, FiMenu, FiLogIn, FiUserPlus } from 'react-icons/fi'

const HeaderSection = ({ onShowLogin, onShowRegister }) => {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={100}>
            <Container maxW="7xl" py={4} px={{ base: 4, md: 8 }}>
                <Flex justify="space-between" align="center">
                    {/* Logo */}
                    <HStack spacing={{ base: 2, md: 3 }}>
                        <Icon as={FiMapPin} boxSize={{ base: 6, md: 8 }} color="sage.400" />
                        <Heading
                            size={{ base: "md", md: "lg" }}
                            color="sage.400"
                            fontWeight="bold"
                        >
                            Voyaj
                        </Heading>
                    </HStack>

                    {/* Desktop Navigation */}
                    {!isMobile ? (
                        <HStack spacing={4}>
                            <Button
                                variant="ghost"
                                color="gray.600"
                                onClick={onShowLogin}
                                size="md"
                                _hover={{ color: "gray.800", bg: "gray.50" }}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                variant="primary"
                                onClick={onShowRegister}
                                size="md"
                            >
                                Crear Cuenta
                            </Button>
                        </HStack>
                    ) : (
                        /* Mobile Menu */
                        <Menu placement="bottom-end">
                            <MenuButton
                                as={IconButton}
                                aria-label="Menu"
                                icon={<FiMenu />}
                                variant="ghost"
                                color="gray.600"
                                size="md"
                                _hover={{ color: "gray.800", bg: "gray.50" }}
                                _active={{ bg: "gray.100" }}
                            />
                            <MenuList
                                bg="white"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="12px"
                                shadow="0 4px 12px 0 rgba(0, 0, 0, 0.1)"
                                p={2}
                                minW="220px"
                                mt={2}
                                mr={0}
                                _focus={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" }}
                            >
                                <MenuItem
                                    onClick={onShowLogin}
                                    borderRadius="8px"
                                    _hover={{ bg: "gray.50" }}
                                    _focus={{ bg: "gray.50", boxShadow: "none" }}
                                    py={3}
                                    px={4}
                                    border="none"
                                >
                                    <HStack spacing={3} w="full">
                                        <Icon as={FiLogIn} color="gray.500" boxSize={4} />
                                        <VStack spacing={0} align="start">
                                            <Text fontWeight="500" color="gray.700" fontSize="sm">
                                                Iniciar Sesión
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                Accede a tu cuenta
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </MenuItem>

                                <MenuItem
                                    onClick={onShowRegister}
                                    borderRadius="8px"
                                    _hover={{ bg: "sage.50" }}
                                    _focus={{ bg: "sage.50", boxShadow: "none" }}
                                    py={3}
                                    px={4}
                                    mt={1}
                                    border="none"
                                >
                                    <HStack spacing={3} w="full">
                                        <Icon as={FiUserPlus} color="sage.400" boxSize={4} />
                                        <VStack spacing={0} align="start">
                                            <Text fontWeight="500" color="sage.600" fontSize="sm">
                                                Crear Cuenta
                                            </Text>
                                            <Text fontSize="xs" color="sage.400">
                                                Gratis para empezar
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </Container>
        </Box>
    )
}

export default HeaderSection