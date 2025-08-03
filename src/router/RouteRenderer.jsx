import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import EmailVerificationPage from '../pages/EmailVerificationPage'
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
    const requireAuth = (component) => {
        if (!user) {
            return <LoginPage onNavigate={navigate} onLogin={onLogin} />
        }
        return component
    }

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

    const handleVerificationSuccess = () => {
        // Actualizar el estado del usuario después de verificar
        if (user) {
            const updatedUser = { ...user, email_verified: true }
            onLogin(updatedUser)
        }
    }

    const handleRegisterSuccess = (userData) => {
        // Después del registro exitoso, ir a verificación de email
        onLogin(userData)
        navigate('/verify-email')
    }

    if (isPublicRoute(currentRoute)) {
        switch (currentRoute) {
            case routes.HOME:
                return <LandingPage onNavigate={navigate} />

            case routes.LOGIN:
                return <LoginPage onNavigate={navigate} onLogin={onLogin} />

            case routes.REGISTER:
                return <RegisterPage onNavigate={navigate} onLogin={handleRegisterSuccess} />

            case routes.FORGOT_PASSWORD:
                return <ForgotPasswordPage onNavigate={navigate} />

            case routes.VERIFY_EMAIL:
                return (
                    <EmailVerificationPage
                        onNavigate={navigate}
                        userEmail={user?.email || 'usuario@email.com'}
                        onVerificationSuccess={handleVerificationSuccess}
                    />
                )

            default:
                return <LandingPage onNavigate={navigate} />
        }
    }

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

    return <LoginPage onNavigate={navigate} onLogin={onLogin} />
}