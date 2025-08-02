import { Container, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTabs from '../components/profile/ProfileTabs'
import ProfileModals from '../components/profile/ProfileModals'

const ProfilePage = ({ onNavigate, onLogout, user }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    // Datos del usuario extendidos
    const [userProfile, setUserProfile] = useState({
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@voyaj.com",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "+52 999 123 4567",
        country: "México",
        city: "Mérida, Yucatán",
        birthDate: "1990-05-15",
        bio: "Amante de los viajes y la fotografía. Siempre buscando nuevas aventuras y experiencias únicas alrededor del mundo.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        joinDate: "2023-01-15",
        plan: "Aventurero",
        preferences: {
            language: "es",
            currency: "MXN",
            timezone: "America/Mexico_City",
            notifications: {
                email: true,
                push: false,
                trips: true,
                photos: true
            },
            privacy: {
                profile: "public",
                trips: "friends",
                photos: "public"
            }
        }
    })

    // Estadísticas del usuario
    const [userStats] = useState({
        totalTrips: 12,
        completedTrips: 8,
        activeTrips: 2,
        upcomingTrips: 2,
        totalPhotos: 247,
        totalCountries: 8,
        totalCities: 23,
        totalDistance: 45280, // en km
        favoriteDestination: "Japón",
        nextTrip: {
            destination: "Francia",
            date: "2024-09-15"
        }
    })

    // Viajes recientes (datos de ejemplo)
    const [recentTrips] = useState([
        {
            id: 1,
            title: "Viaje a Japón",
            destination: "Tokio, Japón",
            date: "2024-07-15",
            duration: "14 días",
            image: "🇯🇵",
            status: "active",
            photos: 37,
            rating: 5
        },
        {
            id: 2,
            title: "Europa Backpack",
            destination: "París, Francia",
            date: "2024-08-20",
            duration: "26 días",
            image: "🇫🇷",
            status: "upcoming",
            photos: 0,
            rating: null
        }
    ])

    // Logros de ejemplo
    const [achievements] = useState([
        {
            id: 1,
            title: "Primer Viaje",
            description: "Completa tu primer viaje",
            icon: "🎯",
            earned: true,
            earnedDate: "2023-02-15"
        },
        {
            id: 2,
            title: "Aventurero Social",
            description: "Realiza 3 viajes en grupo",
            icon: "👥",
            earned: true,
            earnedDate: "2023-08-22"
        }
    ])

    const handleSaveProfile = (updatedData) => {
        setUserProfile(prev => ({
            ...prev,
            ...updatedData
        }))
        setIsEditModalOpen(false)
        console.log('Perfil actualizado:', updatedData)
    }

    const handleChangePassword = (passwordData) => {
        console.log('Cambio de contraseña:', passwordData)
        setIsPasswordModalOpen(false)
    }

    return (
        // Padding corregido para móvil
        <Container maxW="6xl" py={{ base: 4, md: 6 }} px={{ base: 2, md: 6 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <ProfileHeader
                    user={userProfile}
                    stats={userStats}
                    onEditProfile={() => setIsEditModalOpen(true)}
                    onChangePassword={() => setIsPasswordModalOpen(true)}
                />

                <ProfileTabs
                    user={userProfile}
                    stats={userStats}
                    recentTrips={recentTrips}
                    achievements={achievements}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <ProfileModals
                    user={userProfile}
                    isEditModalOpen={isEditModalOpen}
                    isPasswordModalOpen={isPasswordModalOpen}
                    onCloseEditModal={() => setIsEditModalOpen(false)}
                    onClosePasswordModal={() => setIsPasswordModalOpen(false)}
                    onSaveProfile={handleSaveProfile}
                    onChangePassword={handleChangePassword}
                />
            </VStack>
        </Container>
    )
}

export default ProfilePage