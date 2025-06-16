// src/pages/PhotosPage.jsx
import { Container, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import PhotosHeader from '../components/photos/PhotosHeader'
import PhotosFilters from '../components/photos/PhotosFilters'
import PhotosGrid from '../components/photos/PhotosGrid'
import PhotoModal from '../components/photos/PhotoModal'

const PhotosPage = ({ onNavigate, onLogout, user }) => {
    const [selectedFilter, setSelectedFilter] = useState('todas')
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Datos de ejemplo de fotos
    const [photos] = useState([
        {
            id: 1,
            url: "https://images.pexels.com/photos/3266523/pexels-photo-3266523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 750,
            title: "Atardecer en la playa",
            description: "Vista increíble del atardecer desde la playa principal",
            uploadedBy: "Tú",
            uploadedByAvatar: "👤",
            date: "2024-07-16",
            location: "Playa Principal, Tokio",
            likes: 12,
            tripDay: "Día 2",
            tags: ["atardecer", "playa", "paisaje"]
        },
        {
            id: 2,
            url: "https://images.pexels.com/photos/2364397/pexels-photo-2364397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 1890,
            title: "Templo tradicional",
            description: "Hermoso templo que visitamos en la mañana",
            uploadedBy: "Ana García",
            uploadedByAvatar: "👩",
            date: "2024-07-16",
            location: "Templo Senso-ji, Asakusa",
            likes: 8,
            tripDay: "Día 2",
            tags: ["templo", "cultura", "arquitectura"]
        },
        {
            id: 3,
            url: "https://images.pexels.com/photos/3266523/pexels-photo-3266523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 750,
            title: "Comida local",
            description: "Delicioso ramen que probamos",
            uploadedBy: "Carlos López",
            uploadedByAvatar: "👨",
            date: "2024-07-16",
            location: "Restaurante Ramen Ichiran",
            likes: 15,
            tripDay: "Día 2",
            tags: ["comida", "ramen", "local"]
        },
        {
            id: 4,
            url: "https://images.pexels.com/photos/2364397/pexels-photo-2364397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 1890,
            title: "Calle tradicional",
            description: "Paseando por las calles históricas",
            uploadedBy: "Tú",
            uploadedByAvatar: "👤",
            date: "2024-07-17",
            location: "Distrito histórico",
            likes: 6,
            tripDay: "Día 3",
            tags: ["calle", "historia", "paseo"]
        },
        {
            id: 5,
            url: "https://images.pexels.com/photos/3266523/pexels-photo-3266523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 750,
            title: "Grupo en Disneyland",
            description: "¡Día increíble en Disneyland!",
            uploadedBy: "Ana García",
            uploadedByAvatar: "👩",
            date: "2024-07-17",
            location: "Tokyo Disneyland",
            likes: 20,
            tripDay: "Día 3",
            tags: ["grupo", "disneyland", "diversión"]
        },
        {
            id: 6,
            url: "https://images.pexels.com/photos/2364397/pexels-photo-2364397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            width: 1260,
            height: 1890,
            title: "Vista nocturna",
            description: "La ciudad se ve increíble de noche",
            uploadedBy: "Carlos López",
            uploadedByAvatar: "👨",
            date: "2024-07-17",
            location: "Mirador Tokyo Skytree",
            likes: 18,
            tripDay: "Día 3",
            tags: ["nocturna", "ciudad", "luces"]
        }
    ])

    const getFilteredPhotos = () => {
        switch (selectedFilter) {
            case 'mias':
                return photos.filter(photo => photo.uploadedBy === 'Tú')
            case 'grupo':
                return photos.filter(photo => photo.uploadedBy !== 'Tú')
            case 'dia2':
                return photos.filter(photo => photo.tripDay === 'Día 2')
            case 'dia3':
                return photos.filter(photo => photo.tripDay === 'Día 3')
            default:
                return photos
        }
    }

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPhoto(null)
    }

    const filteredPhotos = getFilteredPhotos()

    return (
        <Container maxW="6xl" py={6} px={{ base: 4, md: 6 }}>
            <VStack spacing={6} align="stretch">
                <PhotosHeader
                    onNavigate={onNavigate}
                    totalPhotos={photos.length}
                    myPhotos={photos.filter(p => p.uploadedBy === 'Tú').length}
                />

                <PhotosFilters
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    photos={photos}
                />

                <PhotosGrid
                    photos={filteredPhotos}
                    onPhotoClick={handlePhotoClick}
                />

                <PhotoModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    photo={selectedPhoto}
                />
            </VStack>
        </Container>
    )
}

export default PhotosPage