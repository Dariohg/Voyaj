import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import theme from './styles/theme'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreateTripPage from './pages/CreateTripPage'
import MyTripsPage from './pages/MyTripsPage'
import PhotosPage from './pages/PhotosPage'
import StatsPage from './pages/StatsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

function App() {
    const [currentRoute, setCurrentRoute] = useState('/')
    const [user, setUser] = useState(null) // Estado de autenticación

    // Función para navegar y actualizar la URL
    const navigate = (path) => {
        setCurrentRoute(path)
        window.history.pushState({}, '', path)
    }

    // Función para simular login
    const handleLogin = (userData) => {
        console.log('Login successful with user:', userData)
        setUser(userData)
        navigate('/dashboard')
    }

    // Función para logout
    const handleLogout = () => {
        console.log('Logging out user')
        setUser(null)
        navigate('/')
    }

    // Escuchar cambios en el historial del navegador (botón atrás/adelante)
    useEffect(() => {
        const handlePopState = () => {
            setCurrentRoute(window.location.pathname)
        }

        // Establecer ruta inicial basada en la URL actual
        setCurrentRoute(window.location.pathname)

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    // FORZAR MODO CLARO - Prevenir que el sistema cambie el tema
    useEffect(() => {
        // Forzar el color-scheme a light
        document.documentElement.style.colorScheme = 'light'
        document.body.style.colorScheme = 'light'

        // Agregar meta tag si no existe
        const existingMeta = document.querySelector('meta[name="color-scheme"]')
        if (!existingMeta) {
            const meta = document.createElement('meta')
            meta.name = 'color-scheme'
            meta.content = 'light'
            document.head.appendChild(meta)
        } else {
            existingMeta.content = 'light'
        }
    }, [])

    // Función para verificar si el usuario está autenticado
    const requireAuth = (component) => {
        if (!user) {
            return <LoginPage onNavigate={navigate} onLogin={handleLogin} />
        }
        return component
    }

    // Debug: log current state
    console.log('Current route:', currentRoute)
    console.log('User:', user)

    // Función para renderizar la página actual
    const renderCurrentPage = () => {
        switch (currentRoute) {
            case '/login':
                return <LoginPage onNavigate={navigate} onLogin={handleLogin} />
            case '/register':
                return <RegisterPage onNavigate={navigate} onLogin={handleLogin} />
            case '/dashboard':
                return requireAuth(
                    <DashboardPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/create-trip':
                return requireAuth(
                    <CreateTripPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/my-trips':
                return requireAuth(
                    <MyTripsPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/photos':
                return requireAuth(
                    <PhotosPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/stats':
                return requireAuth(
                    <StatsPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/profile':
                return requireAuth(
                    <ProfilePage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/settings':
                return requireAuth(
                    <SettingsPage onNavigate={navigate} onLogout={handleLogout} user={user} />
                )
            case '/':
            default:
                return <LandingPage onNavigate={navigate} />
        }
    }

    return (
        <>
            {/* Script para forzar modo claro desde el inicio */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>
                {renderCurrentPage()}
            </ChakraProvider>
        </>
    )
}

export default App