import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import theme from './styles/theme'
import AppLayout from './components/AppLayout'
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
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // Estado de carga inicial

    // Función para guardar usuario en localStorage
    const saveUserToStorage = (userData) => {
        try {
            localStorage.setItem('voyaj_user', JSON.stringify(userData))
            localStorage.setItem('voyaj_session', 'active')
        } catch (error) {
            console.error('Error saving user to localStorage:', error)
        }
    }

    // Función para obtener usuario de localStorage
    const getUserFromStorage = () => {
        try {
            const savedUser = localStorage.getItem('voyaj_user')
            const savedSession = localStorage.getItem('voyaj_session')

            if (savedUser && savedSession === 'active') {
                return JSON.parse(savedUser)
            }
        } catch (error) {
            console.error('Error reading user from localStorage:', error)
        }
        return null
    }

    // Función para limpiar sesión
    const clearUserFromStorage = () => {
        try {
            localStorage.removeItem('voyaj_user')
            localStorage.removeItem('voyaj_session')
        } catch (error) {
            console.error('Error clearing user from localStorage:', error)
        }
    }

    // Función para navegar y actualizar la URL
    const navigate = (path) => {
        setCurrentRoute(path)
        window.history.pushState({}, '', path)
    }

    // Función para simular login
    const handleLogin = (userData) => {
        console.log('Login successful with user:', userData)
        setUser(userData)
        saveUserToStorage(userData) // Guardar en localStorage
        navigate('/dashboard')
    }

    // Función para logout
    const handleLogout = () => {
        console.log('Logging out user')
        setUser(null)
        clearUserFromStorage() // Limpiar localStorage
        navigate('/')
    }

    // Cargar usuario al iniciar la aplicación
    useEffect(() => {
        const savedUser = getUserFromStorage()
        if (savedUser) {
            setUser(savedUser)
            // Si hay usuario guardado y estamos en ruta pública, ir al dashboard
            if (currentRoute === '/' || currentRoute === '/login' || currentRoute === '/register') {
                setCurrentRoute('/dashboard')
                window.history.replaceState({}, '', '/dashboard')
            }
        }
        setIsLoading(false) // Terminar carga inicial
    }, [])

    // Escuchar cambios en el historial del navegador (botón atrás/adelante)
    useEffect(() => {
        const handlePopState = () => {
            setCurrentRoute(window.location.pathname)
        }

        // Establecer ruta inicial basada en la URL actual
        if (!isLoading) {
            setCurrentRoute(window.location.pathname)
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [isLoading])

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

    // Mostrar loading mientras se carga la sesión
    if (isLoading) {
        return (
            <ChakraProvider theme={theme}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f7fafc'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '16px' }}>🧳</div>
                        <div style={{ color: '#4a5568' }}>Cargando Voyaj...</div>
                    </div>
                </div>
            </ChakraProvider>
        )
    }

    // Debug: log current state
    console.log('Current route:', currentRoute)
    console.log('User:', user)

    // Función para renderizar la página actual
    const renderPageContent = () => {
        switch (currentRoute) {
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
            default:
                return null
        }
    }

    const renderCurrentPage = () => {
        // Páginas públicas sin layout
        switch (currentRoute) {
            case '/login':
                return <LoginPage onNavigate={navigate} onLogin={handleLogin} />
            case '/register':
                return <RegisterPage onNavigate={navigate} onLogin={handleLogin} />
            case '/':
            default:
                { if (currentRoute === '/') {
                    return <LandingPage onNavigate={navigate} />
                }

                // Páginas autenticadas con layout
                const pageContent = renderPageContent()
                if (pageContent && user) {
                    return (
                        <AppLayout
                            user={user}
                            onNavigate={navigate}
                            onLogout={handleLogout}
                            currentRoute={currentRoute}
                        >
                            {pageContent}
                        </AppLayout>
                    )
                }

                // Si no hay usuario y no es página pública, mostrar login
                return <LoginPage onNavigate={navigate} onLogin={handleLogin} /> }
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