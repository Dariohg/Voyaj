// src/App.jsx
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import theme from './styles/theme'
import { useRouter } from './router/Router'
import { RouteRenderer } from './router/RouteRenderer'
import { routes } from './router/routes'

function App() {
    const { currentRoute, routeParams, navigate, isLoading: routerLoading } = useRouter()
    const [user, setUser] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)

    // Funciones de gestión de usuario
    const saveUserToStorage = (userData) => {
        try {
            localStorage.setItem('voyaj_user', JSON.stringify(userData))
            localStorage.setItem('voyaj_session', 'active')
        } catch (error) {
            console.error('Error saving user to localStorage:', error)
        }
    }

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

    const clearUserFromStorage = () => {
        try {
            localStorage.removeItem('voyaj_user')
            localStorage.removeItem('voyaj_session')
        } catch (error) {
            console.error('Error clearing user from localStorage:', error)
        }
    }

    const handleLogin = (userData) => {
        console.log('Login successful with user:', userData)
        setUser(userData)
        saveUserToStorage(userData)
        navigate(routes.DASHBOARD)
    }

    const handleLogout = () => {
        console.log('Logging out user')
        setUser(null)
        clearUserFromStorage()
        navigate(routes.HOME)
    }

    // Cargar usuario al iniciar la aplicación
    useEffect(() => {
        const savedUser = getUserFromStorage()
        if (savedUser) {
            setUser(savedUser)
        }
        setIsUserLoading(false)
    }, [])

    // Manejar redirección cuando hay usuario y está en ruta pública
    useEffect(() => {
        if (user && !routerLoading) {
            // Si el usuario está logueado Y en rutas específicas que requieren redirección
            const redirectRoutes = [routes.HOME, routes.LOGIN, routes.REGISTER]
            
            if (redirectRoutes.includes(currentRoute)) {
                // Si usuario está verificado, ir al dashboard
                if (user.email_verified) {
                    navigate(routes.DASHBOARD)
                } else {
                    // Si usuario NO está verificado, ir a verificación
                    navigate(routes.VERIFY_EMAIL)
                }
            }
        }
    }, [user, currentRoute, routerLoading])

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

    // Mostrar loading mientras se carga la sesión o el router
    if (routerLoading || isUserLoading) {
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
    console.log('Route params:', routeParams)
    console.log('User:', user)

    return (
        <>
            {/* Script para forzar modo claro desde el inicio */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>
                <RouteRenderer
                    currentRoute={currentRoute}
                    routeParams={routeParams}
                    user={user}
                    navigate={navigate}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
            </ChakraProvider>
        </>
    )
}

export default App