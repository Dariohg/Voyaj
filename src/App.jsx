import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import theme from './styles/theme'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Importación condicional del Dashboard
let DashboardPage
try {
    DashboardPage = require('./pages/DashboardPage').default
} catch (error) {
    console.error('Dashboard component not found:', error)
    DashboardPage = null
}

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

    // Debug: log current state
    console.log('Current route:', currentRoute)
    console.log('User:', user)
    console.log('Dashboard component available:', !!DashboardPage)

    // Función para renderizar la página actual
    const renderCurrentPage = () => {
        switch (currentRoute) {
            case '/login':
                return <LoginPage onNavigate={navigate} onLogin={handleLogin} />
            case '/register':
                return <RegisterPage onNavigate={navigate} onLogin={handleLogin} />
            case '/dashboard':
                if (!user) {
                    console.log('No user found, redirecting to login')
                    return <LoginPage onNavigate={navigate} onLogin={handleLogin} />
                }
                if (!DashboardPage) {
                    console.log('Dashboard component not found, showing error')
                    return (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h1>Error: Dashboard component not found</h1>
                            <p>Please create the file: src/pages/DashboardPage.jsx</p>
                            <button onClick={() => navigate('/login')}>Go to Login</button>
                        </div>
                    )
                }
                return <DashboardPage onNavigate={navigate} onLogout={handleLogout} user={user} />
            case '/':
            default:
                return <LandingPage onNavigate={navigate} />
        }
    }

    return (
        <ChakraProvider theme={theme}>
            {renderCurrentPage()}
        </ChakraProvider>
    )
}

export default App