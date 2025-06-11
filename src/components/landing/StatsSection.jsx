import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid
} from '@chakra-ui/react'

const StatsSection = () => {
    const stats = [
        { number: '15K+', label: 'Viajeros activos' },
        { number: '50+', label: 'Países cubiertos' },
        { number: '98%', label: 'Satisfacción' },
        { number: '24/7', label: 'Soporte' }
    ]

    return (
        <Box py={{ base: 12, md: 16 }} bg="sage.400">
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <SimpleGrid
                    columns={{ base: 2, md: 4 }}
                    spacing={{ base: 6, md: 8 }}
                    gap={{ base: 4, md: 8 }}
                >
                    {stats.map((stat, index) => (
                        <VStack key={index} spacing={2} textAlign="center">
                            <Heading
                                size={{ base: "xl", md: "2xl" }}
                                color="white"
                                fontWeight="bold"
                            >
                                {stat.number}
                            </Heading>
                            <Text
                                color="sage.100"
                                fontSize={{ base: "sm", md: "lg" }}
                                textAlign="center"
                                px={{ base: 2, md: 0 }}
                            >
                                {stat.label}
                            </Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}

export default StatsSection