import {
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

const ExpensesTab = ({ expenses, tripData, onExpenseOpen }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatCurrency = (amount) => {
        return `${tripData.moneda === 'USD' ? '$' : tripData.moneda === 'EUR' ? '€' : ''}${amount.toLocaleString()}`
    }

    const getExpensesByCategory = () => {
        const categories = {
            transporte: 0,
            alojamiento: 0,
            comida: 0,
            actividades: 0,
            compras: 0
        }

        expenses.forEach(expense => {
            categories[expense.category] += expense.amount
        })

        return categories
    }

    const expenseCategories = getExpensesByCategory()

    return (
        <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
                <Heading size="md" color="gray.800">Control de Gastos</Heading>
                <Button
                    leftIcon={<FiPlus />}
                    bg="sage.400"
                    color="white"
                    onClick={onExpenseOpen}
                    _hover={{ bg: "sage.500" }}
                >
                    Nuevo Gasto
                </Button>
            </HStack>

            {/* Resumen por categorías */}
            <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
                {Object.entries(expenseCategories).map(([category, amount]) => (
                    <Card key={category} bg="white" border="1px" borderColor="gray.200">
                        <CardBody p={4} textAlign="center">
                            <VStack spacing={2}>
                                <Text fontSize="xs" color="gray.500" textTransform="capitalize">
                                    {category}
                                </Text>
                                <Text fontSize="lg" fontWeight="600" color="gray.800">
                                    {formatCurrency(amount)}
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>

            {/* Lista de gastos */}
            <Card bg="white" border="1px" borderColor="gray.200">
                <CardHeader>
                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                        Gastos Recientes
                    </Text>
                </CardHeader>
                <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                        {expenses.map((expense) => (
                            <HStack key={expense.id} justify="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.50" }}>
                                <VStack spacing={1} align="start">
                                    <Text fontWeight="500" color="gray.800">
                                        {expense.description}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {formatDate(expense.date)} • {expense.category}
                                    </Text>
                                </VStack>
                                <Text fontWeight="600" color="gray.800">
                                    {formatCurrency(expense.amount)}
                                </Text>
                            </HStack>
                        ))}
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    )
}

export default ExpensesTab