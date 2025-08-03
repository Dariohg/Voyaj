// src/router/routes.js
export const routes = {
    // Rutas públicas
    HOME: '/',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register',
    VERIFY_EMAIL: '/verify-email',

    // Rutas autenticadas
    DASHBOARD: '/dashboard',
    CREATE_TRIP: '/create-trip',
    MY_TRIPS: '/my-trips',
    TRIP_DETAIL: '/trip-detail',
    PHOTOS: '/photos',
    STATS: '/stats',
    PROFILE: '/profile',
    SETTINGS: '/settings'
}

export const publicRoutes = [
    routes.HOME,
    routes.LOGIN,
    routes.FORGOT_PASSWORD,
    routes.REGISTER,
    routes.VERIFY_EMAIL
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