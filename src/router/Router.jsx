import { useState, useEffect } from 'react'
import { extractTripId } from './utils'

export const useRouter = () => {
    const [currentRoute, setCurrentRoute] = useState('/')
    const [routeParams, setRouteParams] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // Función para navegar y actualizar la URL
    const navigate = (path) => {
        const { route, params } = parsePath(path)
        setCurrentRoute(route)
        setRouteParams(params)
        window.history.pushState({}, '', path)
    }

    // Función para parsear la ruta y extraer parámetros
    const parsePath = (path) => {
        // Manejar rutas con parámetros como /trip/123
        if (path.startsWith('/trip/')) {
            const tripId = extractTripId(path)
            return {
                route: '/trip-detail',
                params: { tripId }
            }
        }

        // Agregar aquí más rutas con parámetros si es necesario
        // if (path.startsWith('/user/')) { ... }

        return {
            route: path,
            params: {}
        }
    }

    // Cargar ruta inicial
    useEffect(() => {
        const { route, params } = parsePath(window.location.pathname)
        setCurrentRoute(route)
        setRouteParams(params)
        setIsLoading(false)
    }, [])

    // Escuchar cambios en el historial del navegador
    useEffect(() => {
        const handlePopState = () => {
            const { route, params } = parsePath(window.location.pathname)
            setCurrentRoute(route)
            setRouteParams(params)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    return {
        currentRoute,
        routeParams,
        navigate,
        isLoading
    }
}