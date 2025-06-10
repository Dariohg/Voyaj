import { Box } from '@chakra-ui/react'
import HeaderSection from '../components/landing/HeaderSection'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import StatsSection from '../components/landing/StatsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASection from '../components/landing/CTASection'
import FooterSection from '../components/landing/FooterSection'

const LandingPage = ({ onNavigate }) => {
    const handleShowLogin = () => {
        onNavigate('/login')
    }

    const handleShowRegister = () => {
        onNavigate('/register')
    }
    return (
        <Box>
            <HeaderSection
                onShowLogin={handleShowLogin}
                onShowRegister={handleShowRegister}
            />
            <HeroSection
                onShowRegister={handleShowRegister}
            />
            <FeaturesSection />
            <StatsSection />
            <TestimonialsSection />
            <CTASection
                onShowRegister={handleShowRegister}
            />
            <FooterSection />
        </Box>
    )
}

export default LandingPage