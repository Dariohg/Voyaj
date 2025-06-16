// src/router/routes.js
export const routes = {
    // Rutas públicas
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Rutas autenticadas
    DASHBOARD: '/dashboard',
    CREATE_TRIP: '/create-trip',
    MY_TRIPS: '/my-trips',
    TRIP_DETAIL: '/trip-detail', // Ruta interna para /trip/:id
    PHOTOS: '/photos',
    STATS: '/stats',
    PROFILE: '/profile',
    SETTINGS: '/settings'
}

export const publicRoutes = [
    routes.HOME,
    routes.LOGIN,
    routes.REGISTER
]

export const protectedRoutes = [
    routes.DASHBOARD,
    routes.CREATE_TRIP,
    routes.MY_TRIPS,
    routes.TRIP_DETAIL,
    routes.PHOTOS,
    routes.STATS,
    routes.PROFILE,
    routes.SETTINGS
]