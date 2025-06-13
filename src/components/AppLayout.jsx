import { Box, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AppLayout = ({
                       children,
                       user,
                       onNavigate,
                       onLogout,
                       currentRoute
                   }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true)
    }

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false)
    }

    // Cerrar sidebar cuando cambie la ruta (opcional)
    useEffect(() => {
        setIsSidebarOpen(false)
    }, [currentRoute])

    return (
        <Box minH="100vh" bg="gray.50">
            {/* Navbar */}
            <Navbar
                user={user}
                onNavigate={onNavigate}
                onLogout={onLogout}
                currentRoute={currentRoute}
                onMenuClick={handleOpenSidebar}
            />

            {/* Sidebar - Siempre renderizado */}
            <Sidebar
                currentRoute={currentRoute}
                onNavigate={onNavigate}
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
            />

            {/* Contenido Principal */}
            <Box
                flex={1}
                ml={0} // Sin margen porque el sidebar es flotante
                transition="margin-left 0.2s"
                minH="calc(100vh - 81px)"
            >
                {children}
            </Box>
        </Box>
    )
}

export default AppLayout