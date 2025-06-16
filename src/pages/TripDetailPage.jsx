// src/pages/TripDetailPage.jsx
import { Container, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import TripHeader from '../components/tripDetail/TripHeader'
import TripStats from '../components/tripDetail/TripStats'
import TripParticipants from '../components/tripDetail/TripParticipants'
import TripTabs from '../components/tripDetail/TripTabs'
import TripModals from '../components/tripDetail/TripModals'

const TripDetailPage = ({ tripId, onNavigate, user }) => {
    // Estados para modales
    const [isExpenseOpen, setIsExpenseOpen] = useState(false)
    const [isActivityOpen, setIsActivityOpen] = useState(false)
    const [isDiaryOpen, setIsDiaryOpen] = useState(false)

    // Estados para formularios
    const [newExpense, setNewExpense] = useState({
        amount: '',
        description: '',
        category: 'comida',
        date: ''
    })
    const [newActivity, setNewActivity] = useState({
        title: '',
        description: '',
        time: '',
        location: '',
        estimatedCost: '',
        date: ''
    })
    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: '',
        content: '',
        mood: 'feliz',
        date: ''
    })

    // Datos del viaje (esto vendría de una API)
    const [tripData] = useState({
        id: 1,
        titulo: "Viaje a Japón",
        destino: "Tokio, Japón",
        fecha_inicio: "2024-07-15",
        fecha_fin: "2024-07-28",
        presupuesto_estimado: 2500,
        gasto_actual: 1680,
        esta_activo: true,
        es_viaje_grupal: true,
        participantes: ["Ana García", "Carlos López"],
        categoria: "vacaciones",
        imagen: "🇯🇵",
        progreso: 67,
        moneda: "USD",
        descripcion: "Una aventura increíble por el país del sol naciente"
    })

    // Datos de gastos
    const [expenses] = useState([
        { id: 1, amount: 450, category: 'transporte', description: 'Vuelos', date: '2024-07-15' },
        { id: 2, amount: 120, category: 'alojamiento', description: 'Hotel primera noche', date: '2024-07-15' },
        { id: 3, amount: 85, category: 'comida', description: 'Cena sushi', date: '2024-07-16' },
        { id: 4, amount: 200, category: 'actividades', description: 'Entrada Disneyland', date: '2024-07-17' },
        { id: 5, amount: 45, category: 'compras', description: 'Souvenirs', date: '2024-07-18' }
    ])

    // Datos de actividades
    const [activities] = useState([
        {
            id: 1,
            date: '2024-07-16',
            time: '09:00',
            title: 'Visita al Templo Senso-ji',
            description: 'Explorar el templo más antiguo de Tokio',
            location: 'Asakusa, Tokio',
            estimatedCost: 0,
            completed: true
        },
        {
            id: 2,
            date: '2024-07-16',
            time: '14:00',
            title: 'Mercado de Tsukiji',
            description: 'Probar sushi fresco y mariscos',
            location: 'Tsukiji, Tokio',
            estimatedCost: 60,
            completed: true
        },
        {
            id: 3,
            date: '2024-07-17',
            time: '10:00',
            title: 'Tokyo Disneyland',
            description: 'Día completo en el parque temático',
            location: 'Urayasu, Chiba',
            estimatedCost: 200,
            completed: false
        }
    ])

    // Datos del diario
    const [diaryEntries] = useState([
        {
            id: 1,
            date: '2024-07-16',
            title: 'Primer día en Tokio',
            content: 'Llegamos temprano y fuimos directo al Templo Senso-ji. La experiencia fue increíble, el templo es hermoso y hay mucha historia. Por la tarde visitamos Tsukiji, el sushi estaba delicioso pero muy caro. Nos tomamos muchas fotos.',
            mood: 'emocionado',
            photos: 12
        },
        {
            id: 2,
            date: '2024-07-17',
            title: 'Disneyland Tokyo',
            content: 'Día mágico en Disneyland. Las colas fueron largas pero valió la pena. Space Mountain estuvo increíble. Gastamos más de lo planeado en souvenirs.',
            mood: 'feliz',
            photos: 25
        }
    ])

    return (
        <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
            <VStack spacing={8} align="stretch">
                <TripHeader
                    tripData={tripData}
                    onNavigate={onNavigate}
                />

                <TripStats
                    tripData={tripData}
                    activities={activities}
                    diaryEntries={diaryEntries}
                />

                {tripData.es_viaje_grupal && (
                    <TripParticipants
                        tripData={tripData}
                        user={user}
                    />
                )}

                <TripTabs
                    activities={activities}
                    expenses={expenses}
                    diaryEntries={diaryEntries}
                    tripData={tripData}
                    onActivityOpen={() => setIsActivityOpen(true)}
                    onExpenseOpen={() => setIsExpenseOpen(true)}
                    onDiaryOpen={() => setIsDiaryOpen(true)}
                />

                <TripModals
                    isExpenseOpen={isExpenseOpen}
                    isActivityOpen={isActivityOpen}
                    isDiaryOpen={isDiaryOpen}
                    onExpenseClose={() => setIsExpenseOpen(false)}
                    onActivityClose={() => setIsActivityOpen(false)}
                    onDiaryClose={() => setIsDiaryOpen(false)}
                    newExpense={newExpense}
                    newActivity={newActivity}
                    newDiaryEntry={newDiaryEntry}
                    setNewExpense={setNewExpense}
                    setNewActivity={setNewActivity}
                    setNewDiaryEntry={setNewDiaryEntry}
                    tripData={tripData}
                />
            </VStack>
        </Container>
    )
}

export default TripDetailPage