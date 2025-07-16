// src/components/landing/PricingSection.jsx
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Button,
    Badge,
    Icon,
    List,
    ListItem,
    ListIcon,
    Divider
} from '@chakra-ui/react'
import {
    FiCheck,
    FiStar,
    FiZap,
    FiMapPin,
    FiUsers,
    FiCamera,
    FiBarChart2,
    FiShield,
    FiHeadphones,
    FiGlobe
} from 'react-icons/fi'

const PricingSection = ({ onShowRegister }) => {
    const plans = [
        {
            name: "Explorador",
            subtitle: "Perfecto para empezar",
            price: "Gratis",
            period: "siempre",
            popular: false,
            color: "gray",
            icon: FiMapPin,
            features: [
                "1 viaje activo",
                "Planificación básica",
                "Control de gastos",
                "100 fotos por viaje",
                "Diario personal",
                "Soporte por email"
            ],
            limitations: [
                "Sin viajes colaborativos",
                "Sin exportación premium",
                "Sin análisis avanzados"
            ]
        },
        {
            name: "Aventurero",
            subtitle: "Para viajeros frecuentes",
            price: "$9.99",
            period: "mes",
            popular: true,
            color: "sage",
            icon: FiStar,
            features: [
                "Viajes ilimitados",
                "Planificación avanzada",
                "Control de gastos completo",
                "Fotos ilimitadas",
                "Diario colaborativo",
                "Viajes en grupo (hasta 10 personas)",
                "Análisis de patrones de gasto",
                "Exportación PDF/Excel",
                "Modo offline",
                "Soporte prioritario 24/7"
            ],
            limitations: []
        },
        {
            name: "Nómada Digital",
            subtitle: "Para viajeros profesionales",
            price: "$19.99",
            period: "mes",
            popular: false,
            color: "vanilla",
            icon: FiZap,
            features: [
                "Todo lo de Aventurero",
                "Viajes en grupo ilimitado",
                "Almacenamiento de fotos ilimitado",
                "Exportación avanzada (PDF detallado)",
                "Análisis de gastos por categorías",
                "Historial completo de viajes",
                "Copias de seguridad automáticas",
                "Acceso prioritario a nuevas funciones",
                "Soporte prioritario 24/7",
                "Sin límite de dispositivos"
            ],
            limitations: []
        }
    ]

    const handleSelectPlan = (planName) => {
        console.log(`Selected plan: ${planName}`)
        onShowRegister()
    }

    return (
        <Box py={{ base: 16, md: 24 }} bg="gray.50">
            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <VStack spacing={{ base: 12, md: 16 }}>
                    {/* Header */}
                    <VStack spacing={4} textAlign="center" maxW="3xl">
                        <Badge
                            colorScheme="sage"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="600"
                        >
                            Precios transparentes
                        </Badge>
                        <Heading
                            size={{ base: "xl", md: "2xl" }}
                            color="gray.800"
                            px={{ base: 4, md: 0 }}
                        >
                            Elige el plan perfecto para tu estilo de viaje
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="2xl"
                            px={{ base: 4, md: 0 }}
                            lineHeight="tall"
                        >
                            Comienza gratis y evoluciona según tus necesidades.
                            Sin contratos, sin sorpresas. Cancela cuando quieras.
                        </Text>
                    </VStack>

                    {/* Pricing Cards */}
                    <SimpleGrid
                        columns={{ base: 1, lg: 3 }}
                        spacing={{ base: 6, md: 8 }}
                        maxW="1200px"
                        w="full"
                    >
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                bg="white"
                                position="relative"
                                transform={plan.popular ? "scale(1.05)" : "scale(1)"}
                                shadow={plan.popular ? "2xl" : "lg"}
                                border={plan.popular ? "2px" : "1px"}
                                borderColor={plan.popular ? "sage.200" : "gray.200"}
                                _hover={{
                                    transform: plan.popular ? "scale(1.07)" : "scale(1.02)",
                                    shadow: "2xl"
                                }}
                                transition="all 0.3s ease"
                            >
                                {plan.popular && (
                                    <Badge
                                        position="absolute"
                                        top="-10px"
                                        left="50%"
                                        transform="translateX(-50%)"
                                        colorScheme="sage"
                                        px={4}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="sm"
                                        fontWeight="700"
                                        zIndex={1}
                                    >
                                        Más Popular
                                    </Badge>
                                )}

                                <CardHeader pb={2}>
                                    <VStack spacing={4} align="start">
                                        <HStack spacing={3}>
                                            <Box
                                                p={2}
                                                bg={`${plan.color}.100`}
                                                borderRadius="lg"
                                            >
                                                <Icon
                                                    as={plan.icon}
                                                    boxSize={6}
                                                    color={`${plan.color}.500`}
                                                />
                                            </Box>
                                            <VStack spacing={0} align="start">
                                                <Text fontSize="xl" fontWeight="700" color="gray.800">
                                                    {plan.name}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500">
                                                    {plan.subtitle}
                                                </Text>
                                            </VStack>
                                        </HStack>

                                        <HStack spacing={1} align="baseline">
                                            <Text fontSize="3xl" fontWeight="900" color="gray.800">
                                                {plan.price}
                                            </Text>
                                            {plan.period && (
                                                <Text fontSize="lg" color="gray.500">
                                                    /{plan.period}
                                                </Text>
                                            )}
                                        </HStack>
                                    </VStack>
                                </CardHeader>

                                <CardBody pt={0}>
                                    <VStack spacing={6} align="stretch">
                                        <Button
                                            size="lg"
                                            bg={plan.popular ? "sage.400" : "gray.100"}
                                            color={plan.popular ? "white" : "gray.700"}
                                            _hover={{
                                                bg: plan.popular ? "sage.500" : "gray.200",
                                                transform: "translateY(-2px)"
                                            }}
                                            onClick={() => handleSelectPlan(plan.name)}
                                            fontWeight="600"
                                        >
                                            {plan.price === "Gratis" ? "Comenzar Gratis" : "Elegir Plan"}
                                        </Button>

                                        <Divider />

                                        <VStack spacing={3} align="stretch">
                                            <Text fontSize="sm" fontWeight="600" color="gray.700">
                                                ✅ Todo incluido:
                                            </Text>
                                            <List spacing={2}>
                                                {plan.features.map((feature, idx) => (
                                                    <ListItem key={idx} fontSize="sm" color="gray.600">
                                                        <ListIcon as={FiCheck} color="green.500" />
                                                        {feature}
                                                    </ListItem>
                                                ))}
                                            </List>

                                            {plan.limitations.length > 0 && (
                                                <>
                                                    <Text fontSize="sm" fontWeight="600" color="gray.500" mt={4}>
                                                        ⚠️ Limitaciones:
                                                    </Text>
                                                    <List spacing={1}>
                                                        {plan.limitations.map((limitation, idx) => (
                                                            <ListItem key={idx} fontSize="sm" color="gray.500">
                                                                <Text as="span">• {limitation}</Text>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </>
                                            )}
                                        </VStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>

                    {/* Features Grid */}
                    <Box w="full" pt={{ base: 8, md: 16 }}>
                        <VStack spacing={8}>
                            <Heading size="lg" color="gray.800" textAlign="center">
                                ¿Por qué elegir Voyaj?
                            </Heading>

                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                                {[
                                    {
                                        icon: FiUsers,
                                        title: "Colaborativo",
                                        description: "Planifica viajes en grupo fácilmente"
                                    },
                                    {
                                        icon: FiShield,
                                        title: "Seguro",
                                        description: "Tus datos protegidos con encriptación"
                                    },
                                    {
                                        icon: FiGlobe,
                                        title: "Offline",
                                        description: "Funciona sin conexión a internet"
                                    },
                                    {
                                        icon: FiHeadphones,
                                        title: "Soporte 24/7",
                                        description: "Asistencia cuando la necesites"
                                    }
                                ].map((benefit, index) => (
                                    <VStack key={index} spacing={3} textAlign="center">
                                        <Box
                                            p={3}
                                            bg="sage.100"
                                            borderRadius="xl"
                                        >
                                            <Icon as={benefit.icon} boxSize={6} color="sage.500" />
                                        </Box>
                                        <Text fontSize="md" fontWeight="600" color="gray.800">
                                            {benefit.title}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600" textAlign="center">
                                            {benefit.description}
                                        </Text>
                                    </VStack>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Box>

                    {/* FAQ teaser */}
                    <Box
                        w="full"
                        bg="white"
                        p={8}
                        borderRadius="2xl"
                        border="1px"
                        borderColor="gray.200"
                        textAlign="center"
                    >
                        <VStack spacing={4}>
                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                ¿Tienes preguntas?
                            </Text>
                            <Text color="gray.600">
                                Consulta nuestras preguntas frecuentes o contáctanos directamente
                            </Text>
                            <HStack spacing={4}>
                                <Button variant="outline" colorScheme="sage">
                                    Ver FAQ
                                </Button>
                                <Button variant="ghost" colorScheme="sage">
                                    Contactar Soporte
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    )
}

export default PricingSection