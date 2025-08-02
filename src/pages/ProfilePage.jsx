import { Container, VStack, Spinner, Box, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTabs from '../components/profile/ProfileTabs'
import ProfileModals from '../components/profile/ProfileModals'
import { authService } from '../services/api/authService'
import { subscriptionsService } from '../services/api/subscriptionsService'
import { tripsService } from '../services/api/tripsService'

const ProfilePage = ({ onNavigate, onLogout, user }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    
    const [userProfile, setUserProfile] = useState(null)
    const [userStats, setUserStats] = useState(null)
    const [subscription, setSubscription] = useState(null)
    const [recentTrips, setRecentTrips] = useState([])
    const [paymentStats, setPaymentStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setIsLoading(true)
                
                // Datos del perfil (endpoint real)
                const profileResponse = await authService.getProfile()
                
                // Estado de suscripción (endpoint real)  
                const subscriptionResponse = await subscriptionsService.getStatus()
                
                // Lista de viajes del usuario (endpoint real)
                const tripsResponse = await tripsService.getUserTrips()
                
                // Estadísticas de pagos (endpoint real)
                let paymentStatsResponse = null
                try {
                    paymentStatsResponse = await subscriptionsService.getPaymentStatistics()
                } catch (error) {
                    console.log('[PAYMENT_STATS_ERROR]', error)
                }

                // Calcular estadísticas reales de viajes
                const calculateTripStats = (trips) => {
                    const now = new Date()
                    const activeTrips = trips.filter(trip => {
                        const startDate = new Date(trip.start_date)
                        const endDate = new Date(trip.end_date)
                        return startDate <= now && now <= endDate
                    })
                    
                    const upcomingTrips = trips.filter(trip => {
                        const startDate = new Date(trip.start_date)
                        return startDate > now
                    })
                    
                    const completedTrips = trips.filter(trip => {
                        const endDate = new Date(trip.end_date)
                        return endDate < now
                    })

                    // Obtener viajes más recientes (últimos 3)
                    const recentTripsData = trips
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(0, 3)
                        .map(trip => ({
                            id: trip.id,
                            title: trip.title,
                            destination: trip.title,
                            date: trip.start_date,
                            duration: calculateDuration(trip.start_date, trip.end_date),
                            status: getStatus(trip, now)
                        }))

                    return {
                        totalTrips: trips.length,
                        completedTrips: completedTrips.length,
                        activeTrips: activeTrips.length,
                        upcomingTrips: upcomingTrips.length,
                        recentTrips: recentTripsData
                    }
                }

                const tripStats = calculateTripStats(tripsResponse)
                
                // Construir perfil solo con datos que existen en la API
                const profileData = {
                    id: profileResponse.id,
                    name: profileResponse.name,
                    email: profileResponse.email,
                    avatar: profileResponse.profile_photo_url,
                    joinDate: profileResponse.created_at,
                    plan: subscriptionResponse.is_pro ? "PRO" : "FREE",
                    email_verified: profileResponse.email_verified,
                    friends: profileResponse.friends || []
                }
                
                // Estadísticas solo de lo que retorna la API
                const statsData = {
                    totalTrips: tripStats.totalTrips,
                    completedTrips: tripStats.completedTrips,
                    activeTrips: tripStats.activeTrips,
                    upcomingTrips: tripStats.upcomingTrips
                }

                setUserProfile(profileData)
                setUserStats(statsData)
                setSubscription(subscriptionResponse)
                setRecentTrips(tripStats.recentTrips)
                setPaymentStats(paymentStatsResponse)
                
            } catch (error) {
                console.error('[PROFILE_LOAD_ERROR]', error)
                
                // Fallback solo con datos del contexto del usuario
                const fallbackProfile = {
                    id: user?.id || 1,
                    name: user?.name || "Usuario",
                    email: user?.email || "usuario@voyaj.com",
                    avatar: user?.profile_photo_url,
                    joinDate: new Date().toISOString(),
                    plan: "FREE",
                    email_verified: user?.email_verified || false,
                    friends: []
                }
                
                const fallbackStats = {
                    totalTrips: 0,
                    completedTrips: 0,
                    activeTrips: 0,
                    upcomingTrips: 0
                }
                
                setUserProfile(fallbackProfile)
                setUserStats(fallbackStats)
                setSubscription({ plan: 'free', is_pro: false, status: 'active' })
                setRecentTrips([])
                setPaymentStats(null)
                
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfileData()
    }, [user])

    // Funciones helper
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return `${diffDays} días`
    }

    const getStatus = (trip, now) => {
        const startDate = new Date(trip.start_date)
        const endDate = new Date(trip.end_date)
        
        if (now < startDate) return 'upcoming'
        if (now >= startDate && now <= endDate) return 'active'
        return 'completed'
    }

    const handleSaveProfile = async (updatedData) => {
        try {
            // Por ahora solo actualizar estado local
            // Se podría implementar endpoint PUT /auth/profile
            setUserProfile(prev => ({
                ...prev,
                ...updatedData
            }))
            setIsEditModalOpen(false)
            console.log('Perfil actualizado:', updatedData)
        } catch (error) {
            console.error('[PROFILE_UPDATE_ERROR]', error)
        }
    }

    const handleChangePassword = async (passwordData) => {
        try {
            // Se podría usar los endpoints de reset password existentes
            console.log('Cambio de contraseña:', passwordData)
            setIsPasswordModalOpen(false)
        } catch (error) {
            console.error('[PASSWORD_CHANGE_ERROR]', error)
        }
    }

    if (isLoading) {
        return (
            <Container maxW="6xl" py={{ base: 4, md: 6 }} px={{ base: 2, md: 6 }}>
                <Box textAlign="center" py={20}>
                    <Spinner size="xl" color="sage.400" />
                    <Text mt={4} color="gray.600">Cargando perfil...</Text>
                </Box>
            </Container>
        )
    }

    if (!userProfile) {
        return (
            <Container maxW="6xl" py={{ base: 4, md: 6 }} px={{ base: 2, md: 6 }}>
                <Box textAlign="center" py={20}>
                    <Text color="red.500">Error al cargar el perfil</Text>
                </Box>
            </Container>
        )
    }

    return (
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
                    achievements={[]} // Sin endpoint disponible
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