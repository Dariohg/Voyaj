import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Icon,
    Card,
    CardBody
} from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'María González',
            location: 'Madrid, España',
            text: 'Voyaj transformó completamente mi forma de viajar. Ahora tengo todos mis recuerdos organizados y nunca me excedo del presupuesto.',
            rating: 5
        },
        {
            name: 'Carlos Rivera',
            location: 'México DF, México',
            text: 'La función de viajes en grupo es increíble. Pudimos planificar nuestro viaje a Japón entre 6 amigos sin complicaciones.',
            rating: 5
        },
        {
            name: 'Ana Martín',
            location: 'Buenos Aires, Argentina',
            text: 'Me encanta cómo compara lo planeado vs lo real. He mejorado mucho mis habilidades de planificación de viajes.',
            rating: 5
        }
    ]

    return (
        <Box py={20} bg="vanilla.50">
            <Container maxW="7xl">
                <VStack spacing={16}>
                    <VStack spacing={4} textAlign="center">
                        <Heading size="xl" color="gray.800">
                            Amado por viajeros de todo el mundo
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            Descubre por qué miles de personas eligen Voyaj para sus aventuras
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} bg="white">
                                <CardBody>
                                    <VStack spacing={4} align="start">
                                        <HStack>
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Icon key={i} as={FiHeart} color="red.400" />
                                            ))}
                                        </HStack>
                                        <Text color="gray.700" fontStyle="italic" lineHeight="tall">
                                            "{testimonial.text}"
                                        </Text>
                                        <VStack spacing={1} align="start">
                                            <Text fontWeight="semibold" color="gray.800">
                                                {testimonial.name}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {testimonial.location}
                                            </Text>
                                        </VStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    )
}

export default TestimonialsSection