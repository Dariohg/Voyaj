import {
    VStack,
    HStack,
    Heading,
    Text,
    Icon,
    Card,
    CardBody,
    Box,
    Avatar,
    Badge,
    Divider
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiCamera,
    FiMapPin,
    FiFlag,
    FiEdit3,
    FiHeart,
    FiShare2
} from 'react-icons/fi'

const ActivityTab = ({ user }) => {
    // Actividad reciente simulada
    const recentActivity = [
        {
            id: 1,
            type: 'trip_created',
            title: 'Creó un nuevo viaje',
            description: 'Europa Backpack - París, Francia',
            icon: FiFlag,
            color: 'blue',
            date: '2024-06-10T14:30:00Z'
        },
        {
            id: 2,
            type: 'photos_uploaded',
            title: 'Subió 12 fotos nuevas',
            description: 'Viaje a Japón - Día 3',
            icon: FiCamera,
            color: 'purple',
            date: '2024-06-08T16:45:00Z'
        },
        {
            id: 3,
            type: 'trip_completed',
            title: 'Completó un viaje',
            description: 'Costa Rica Adventure - 15 días',
            icon: FiMapPin,
            color: 'green',
            date: '2024-06-05T10:20:00Z'
        },
        {
            id: 4,
            type: 'diary_entry',
            title: 'Escribió en su diario',
            description: 'Día increíble en Tokio',
            icon: FiEdit3,
            color: 'orange',
            date: '2024-06-03T20:15:00Z'
        },
        {
            id: 5,
            type: 'achievement_earned',
            title: 'Obtuvo un nuevo logro',
            description: 'Aventurero Social - 3 viajes grupales',
            icon: FiHeart,
            color: 'red',
            date: '2024-05-28T12:00:00Z'
        },
        {
            id: 6,
            type: 'trip_shared',
            title: 'Compartió un viaje',
            description: 'Viaje a Japón con Ana García y Carlos López',
            icon: FiShare2,
            color: 'sage',
            date: '2024-05-25T09:30:00Z'
        }
    ]

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)

        if (diffInSeconds < 60) return 'Hace un momento'
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`

        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        })
    }

    const getActivityBadge = (type) => {
        switch (type) {
            case 'trip_created':
                return { label: 'Nuevo Viaje', color: 'blue' }
            case 'photos_uploaded':
                return { label: 'Fotos', color: 'purple' }
            case 'trip_completed':
                return { label: 'Completado', color: 'green' }
            case 'diary_entry':
                return { label: 'Diario', color: 'orange' }
            case 'achievement_earned':
                return { label: 'Logro', color: 'red' }
            case 'trip_shared':
                return { label: 'Compartido', color: 'sage' }
            default:
                return { label: 'Actividad', color: 'gray' }
        }
    }

    return (
        <VStack spacing={6} align="stretch">
            {/* Header */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={3} align="start">
                        <Heading size="md" color="gray.800">Actividad Reciente</Heading>
                        <Text color="gray.600" fontSize="sm">
                            Aquí puedes ver un resumen de todas tus actividades en Voyaj
                        </Text>
                    </VStack>
                </CardBody>
            </Card>

            {/* Timeline de actividad */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardBody p={6}>
                    <VStack spacing={0} align="stretch">
                        {recentActivity.map((activity, index) => {
                            const badge = getActivityBadge(activity.type)
                            return (
                                <Box key={activity.id}>
                                    <HStack spacing={4} align="start" py={4}>
                                        {/* Avatar e icono */}
                                        <Box position="relative">
                                            <Avatar
                                                size="md"
                                                name={user.name}
                                                src={user.avatar}
                                                bg="sage.400"
                                                color="white"
                                            />
                                            <Box
                                                position="absolute"
                                                bottom={-1}
                                                right={-1}
                                                bg={`${activity.color}.500`}
                                                borderRadius="full"
                                                p={1.5}
                                                border="2px solid white"
                                            >
                                                <Icon
                                                    as={activity.icon}
                                                    boxSize={3}
                                                    color="white"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Contenido */}
                                        <VStack spacing={2} align="start" flex={1}>
                                            <HStack justify="space-between" w="full">
                                                <VStack spacing={1} align="start">
                                                    <HStack spacing={2}>
                                                        <Text fontSize="md" fontWeight="600" color="gray.800">
                                                            {activity.title}
                                                        </Text>
                                                        <Badge
                                                            colorScheme={badge.color}
                                                            variant="subtle"
                                                            fontSize="xs"
                                                            px={2}
                                                            py={1}
                                                            borderRadius="md"
                                                        >
                                                            {badge.label}
                                                        </Badge>
                                                    </HStack>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {activity.description}
                                                    </Text>
                                                </VStack>

                                                <Text fontSize="xs" color="gray.500" flexShrink={0}>
                                                    {formatTimeAgo(activity.date)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>

                                    {/* Separador */}
                                    {index < recentActivity.length - 1 && (
                                        <Divider />
                                    )}
                                </Box>
                            )
                        })}
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    )
}

export default ActivityTab