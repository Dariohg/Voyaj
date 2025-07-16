import { publicRoutes, protectedRoutes } from './routes'

export const extractTripId = (path) => {
    const tripIdMatch = path.match(/\/trip\/(\d+)/)
    return tripIdMatch ? parseInt(tripIdMatch[1]) : null
}

export const generateTripPath = (tripId) => {
    return `/trip/${tripId}`
}

export const isPublicRoute = (route) => {
    return publicRoutes.includes(route)
}

export const isProtectedRoute = (route) => {
    return protectedRoutes.includes(route)
}