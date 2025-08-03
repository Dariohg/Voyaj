import { useState, useEffect } from 'react'
import {
    Container,
    VStack,
    HStack,
    Heading,
    Text,
    Card,
    CardBody,
    Button,
    Avatar,
    Badge,
    SimpleGrid,
    Icon,
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
    Divider,
    Flex,
    IconButton,
    Spinner,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiEdit,
    FiCamera,
    FiSearch,
    FiUserPlus,
    FiCheck,
    FiX,
    FiTrash2,
    FiUsers
} from 'react-icons/fi'
import { authService } from '../services/api/authService.js'
import { friendshipsService } from '../services/api/friendshipsService.js'

const ProfilePage = ({ user, setUser, onLogin }) => {
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState({ received: [], sent: [] })
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [uploadLoading, setUploadLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        refreshUserProfile()
        loadFriendsData()
    }, [])

    const refreshUserProfile = async () => {
        try {
            const freshUserData = await authService.getProfile()
            setUser(freshUserData)
            localStorage.setItem('user', JSON.stringify(freshUserData))
        } catch (error) {
            console.error('[2025-01-02 00:00:00] [PROFILE] [ERROR] Failed to refresh profile:', error)
        }
    }

    const loadFriendsData = async () => {
        try {
            setLoading(true)
            const [friendsData, requestsData] = await Promise.all([
                friendshipsService.getFriends(),
                friendshipsService.getFriendRequests()
            ])
            setFriends(friendsData)
            setFriendRequests(requestsData)
        } catch (error) {
            console.error('[2025-01-02 00:00:00] [FRIENDSHIPS] [ERROR] Failed to load friends data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        if (searchQuery.length < 2) return
        try {
            setLoading(true)
            const results = await authService.searchUsers(searchQuery)
            setSearchResults(results)
        } catch (error) {
            toast({
                title: 'Error en búsqueda',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }

    const sendFriendRequest = async (userId) => {
        try {
            await friendshipsService.sendFriendRequest({ recipient_id: userId })
            toast({
                title: 'Solicitud enviada',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            loadFriendsData()
        } catch (error) {
            toast({
                title: 'Error al enviar solicitud',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const respondToRequest = async (requestId, accept) => {
        try {
            await friendshipsService.respondToRequest(requestId, { accept })
            toast({
                title: accept ? 'Solicitud aceptada' : 'Solicitud rechazada',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            loadFriendsData()
        } catch (error) {
            toast({
                title: 'Error al responder solicitud',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const removeFriend = async (friendId) => {
        try {
            await friendshipsService.removeFriend(friendId)
            toast({
                title: 'Amigo eliminado',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            loadFriendsData()
        } catch (error) {
            toast({
                title: 'Error al eliminar amigo',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const uploadPhoto = async (file) => {
        if (!file) return
        
        setUploadLoading(true)
        
        try {
            const result = await authService.uploadProfilePhoto(file)
            const updatedUser = { ...user, profile_photo_url: result.profile_photo_url }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            
            toast({
                title: 'Foto actualizada correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.error('[2025-01-02 00:00:00] [PROFILE] [ERROR] Upload failed')
            toast({
                title: 'Error al subir foto',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setUploadLoading(false)
        }
    }

    const formatJoinDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const ProfileHeader = () => (
        <Card bg="white" border="1px" borderColor="gray.200">
            <CardBody p={{ base: 4, md: 6 }}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 4, md: 6 }}
                    align={{ base: "center", md: "start" }}
                >
                    <VStack spacing={4} align="center" minW={{ md: "280px" }}>
                        <Box position="relative">
                            <Avatar
                                size={{ base: "xl", md: "2xl" }}
                                name={user.name}
                                src={user.profile_photo_url}
                                bg="sage.400"
                                color="white"
                                border="4px solid"
                                borderColor="sage.100"
                            />
                            <Box
                                position="absolute"
                                bottom="0"
                                right="0"
                                bg="white"
                                borderRadius="full"
                                p={2}
                                border="2px solid"
                                borderColor="sage.200"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="photo-upload"
                                    disabled={uploadLoading}
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) uploadPhoto(file)
                                    }}
                                />
                                <label htmlFor="photo-upload">
                                    <IconButton
                                        as="span"
                                        icon={uploadLoading ? <Spinner size="sm" /> : <FiCamera />}
                                        size="sm"
                                        colorScheme="sage"
                                        variant="ghost"
                                        cursor="pointer"
                                        isLoading={uploadLoading}
                                    />
                                </label>
                            </Box>
                        </Box>
                        <VStack spacing={2} align="center">
                            <Heading
                                size={{ base: "md", md: "lg" }}
                                color="gray.800"
                                textAlign="center"
                            >
                                {user.name}
                            </Heading>
                            <Badge
                                colorScheme="sage"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                            >
                                Plan Aventurero
                            </Badge>
                        </VStack>
                    </VStack>

                    <VStack spacing={4} align="start" flex={1} w="full">
                        <SimpleGrid
                            columns={{ base: 1, sm: 2 }}
                            spacing={3}
                            w="full"
                        >
                            <HStack spacing={2}>
                                <Icon as={FiMail} boxSize={4} color="gray.500" />
                                <Text
                                    fontSize={{ base: "xs", md: "sm" }}
                                    color="gray.600"
                                    isTruncated
                                >
                                    {user.email}
                                </Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Icon as={FiCalendar} boxSize={4} color="gray.500" />
                                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                    Miembro desde {formatJoinDate(user.created_at || '2024-01-01')}
                                </Text>
                            </HStack>
                        </SimpleGrid>
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    )

    const FriendsContent = () => (
        <VStack spacing={6} align="stretch">
            {/* Buscar usuarios */}
            <Card>
                <CardBody>
                    <VStack spacing={4} align="stretch">
                        <Heading size="md" color="gray.800">
                            Buscar Usuarios
                        </Heading>
                        <HStack>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FiSearch} color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Buscar por email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSearch()
                                    }}
                                />
                            </InputGroup>
                            <Button
                                colorScheme="sage"
                                onClick={handleSearch}
                                isLoading={loading}
                                disabled={searchQuery.length < 2}
                            >
                                Buscar
                            </Button>
                        </HStack>
                        
                        {searchResults.length > 0 && (
                            <VStack spacing={3} align="stretch">
                                {searchResults.map(searchUser => (
                                    <HStack
                                        key={searchUser.id}
                                        p={3}
                                        bg="gray.50"
                                        borderRadius="md"
                                        justify="space-between"
                                    >
                                        <HStack spacing={3}>
                                            <Avatar
                                                name={searchUser.name}
                                                src={searchUser.profile_photo_url}
                                                bg="sage.400"
                                                color="white"
                                                size="sm"
                                            />
                                            <VStack spacing={0} align="start">
                                                <Text fontSize="sm" fontWeight="500" color="gray.800">
                                                    {searchUser.name}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    {searchUser.email}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <Button
                                            size="sm"
                                            colorScheme="sage"
                                            leftIcon={<FiUserPlus />}
                                            onClick={() => sendFriendRequest(searchUser.id)}
                                        >
                                            Enviar Solicitud
                                        </Button>
                                    </HStack>
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </CardBody>
            </Card>

            {/* Solicitudes recibidas */}
            {friendRequests.received.length > 0 && (
                <Card>
                    <CardBody>
                        <VStack spacing={4} align="stretch">
                            <Heading size="md" color="gray.800">
                                Solicitudes Recibidas ({friendRequests.received.length})
                            </Heading>
                            <VStack spacing={3} align="stretch">
                                {friendRequests.received.map(request => (
                                    <HStack
                                        key={request.id}
                                        p={3}
                                        bg="blue.50"
                                        borderRadius="md"
                                        justify="space-between"
                                    >
                                        <HStack spacing={3}>
                                            <Avatar
                                                name={`Usuario ${request.sender_id}`}
                                                bg="blue.400"
                                                color="white"
                                                size="sm"
                                            />
                                            <VStack spacing={0} align="start">
                                                <Text fontSize="sm" fontWeight="500" color="gray.800">
                                                    Solicitud de: {request.sender_id}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    Recibida hace poco
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <IconButton
                                                icon={<FiCheck />}
                                                size="sm"
                                                colorScheme="green"
                                                onClick={() => respondToRequest(request.id, true)}
                                            />
                                            <IconButton
                                                icon={<FiX />}
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() => respondToRequest(request.id, false)}
                                            />
                                        </HStack>
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                    </CardBody>
                </Card>
            )}

            {/* Lista de amigos */}
            <Card>
                <CardBody>
                    <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                            <Heading size="md" color="gray.800">
                                Mis Amigos ({friends.length})
                            </Heading>
                            <Icon as={FiUsers} color="sage.400" boxSize={5} />
                        </HStack>
                        
                        {loading ? (
                            <Flex justify="center" py={8}>
                                <Spinner size="lg" color="sage.400" />
                            </Flex>
                        ) : friends.length > 0 ? (
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                                {friends.map(friend => (
                                    <HStack
                                        key={friend.id}
                                        p={3}
                                        bg="gray.50"
                                        borderRadius="md"
                                        justify="space-between"
                                    >
                                        <HStack spacing={3}>
                                            <Avatar
                                                name={friend.name}
                                                src={friend.profile_photo_url}
                                                bg="sage.400"
                                                color="white"
                                                size="sm"
                                            />
                                            <VStack spacing={0} align="start">
                                                <Text fontSize="sm" fontWeight="500" color="gray.800">
                                                    {friend.name}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    {friend.email}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <IconButton
                                            icon={<FiTrash2 />}
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => removeFriend(friend.id)}
                                        />
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Text color="gray.500" textAlign="center" py={8}>
                                Aún no tienes amigos agregados
                            </Text>
                        )}
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    )

    return (
        <Container maxW="6xl" py={{ base: 4, md: 8 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <ProfileHeader />
                
                <Tabs colorScheme="sage" variant="enclosed">
                    <TabList>
                        <Tab>Personal</Tab>
                        <Tab>Amigos</Tab>
                    </TabList>
                    
                    <TabPanels>
                        <TabPanel px={0} py={6}>
                            <Card>
                                <CardBody>
                                    <VStack spacing={4} align="center">
                                        <Text color="gray.600" fontSize="lg">
                                            Información personal próximamente
                                        </Text>
                                        <Text color="gray.500" fontSize="sm">
                                            Aquí podrás editar tu información personal
                                        </Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                        </TabPanel>
                        
                        <TabPanel px={0} py={6}>
                            <FriendsContent />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Container>
    )
}

export default ProfilePage