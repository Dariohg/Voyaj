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
        <Box py={{ base: 12, md: 20 }} bg="vanilla.50">
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <VStack spacing={{ base: 10, md: 16 }}>
                    <VStack spacing={4} textAlign="center" maxW="3xl">
                        <Heading
                            size={{ base: "lg", md: "xl" }}
                            color="gray.800"
                            px={{ base: 4, md: 0 }}
                        >
                            Amado por viajeros de todo el mundo
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            px={{ base: 4, md: 0 }}
                        >
                            Descubre por qué miles de personas eligen Voyaj para sus aventuras
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={{ base: 6, md: 8 }}
                        w="full"
                    >
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} bg="white" h="full">
                                <CardBody p={{ base: 4, md: 6 }}>
                                    <VStack spacing={4} align="start" h="full">
                                        <HStack spacing={1} flexWrap="wrap">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Icon key={i} as={FiHeart} color="red.400" boxSize={4} />
                                            ))}
                                        </HStack>
                                        <Text
                                            color="gray.700"
                                            fontStyle="italic"
                                            lineHeight="tall"
                                            fontSize={{ base: "sm", md: "md" }}
                                            flex={1}
                                        >
                                            "{testimonial.text}"
                                        </Text>
                                        <VStack spacing={1} align="start" w="full">
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.800"
                                                fontSize={{ base: "sm", md: "md" }}
                                            >
                                                {testimonial.name}
                                            </Text>
                                            <Text
                                                fontSize={{ base: "xs", md: "sm" }}
                                                color="gray.500"
                                            >
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