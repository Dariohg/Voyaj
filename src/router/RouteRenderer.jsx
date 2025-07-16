import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import CreateTripPage from '../pages/CreateTripPage'
import MyTripsPage from '../pages/MyTripsPage'
import TripDetailPage from '../pages/TripDetailPage'
import PhotosPage from '../pages/PhotosPage'
import StatsPage from '../pages/StatsPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import AppLayout from '../components/AppLayout'
import { routes } from './routes'
import { isPublicRoute } from './utils'

export const RouteRenderer = ({
                                  currentRoute,
                                  routeParams,
                                  user,
                                  navigate,
                                  onLogin,
                                  onLogout
                              }) => {
    // Función para verificar autenticación
    const requireAuth = (component) => {
        if (!user) {
            return <LoginPage onNavigate={navigate} onLogin={onLogin} />
        }
        return component
    }

    // Función para renderizar páginas autenticadas
    const renderAuthenticatedPage = () => {
        switch (currentRoute) {
            case routes.DASHBOARD:
                return (
                    <DashboardPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.CREATE_TRIP:
                return (
                    <CreateTripPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.MY_TRIPS:
                return (
                    <MyTripsPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.TRIP_DETAIL:
                return (
                    <TripDetailPage
                        tripId={routeParams.tripId}
                        onNavigate={navigate}
                        user={user}
                    />
                )

            case routes.PHOTOS:
                return (
                    <PhotosPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.STATS:
                return (
                    <StatsPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.PROFILE:
                return (
                    <ProfilePage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            case routes.SETTINGS:
                return (
                    <SettingsPage
                        onNavigate={navigate}
                        onLogout={onLogout}
                        user={user}
                    />
                )

            default:
                return null
        }
    }

    // Renderizar páginas públicas
    if (isPublicRoute(currentRoute)) {
        switch (currentRoute) {
            case routes.HOME:
                return <LandingPage onNavigate={navigate} />

            case routes.LOGIN:
                return <LoginPage onNavigate={navigate} onLogin={onLogin} />

            case routes.REGISTER:
                return <RegisterPage onNavigate={navigate} onLogin={onLogin} />

            default:
                return <LandingPage onNavigate={navigate} />
        }
    }

    // Renderizar páginas autenticadas con layout
    const pageContent = renderAuthenticatedPage()

    if (pageContent && user) {
        return (
            <AppLayout
                user={user}
                onNavigate={navigate}
                onLogout={onLogout}
                currentRoute={currentRoute}
            >
                {pageContent}
            </AppLayout>
        )
    }

    // Si no hay autenticación, redirigir a login
    return <LoginPage onNavigate={navigate} onLogin={onLogin} />
}