import {
    HStack,
    Button,
    Card,
    CardBody,
    Box
} from '@chakra-ui/react'

const PhotosFilters = ({ selectedFilter, onFilterChange, photos }) => {
    const filters = [
        { id: 'todas', label: 'Todas', count: photos.length },
        { id: 'mias', label: 'Mis Fotos', count: photos.filter(p => p.uploadedBy === 'Tú').length },
        { id: 'grupo', label: 'Del Grupo', count: photos.filter(p => p.uploadedBy !== 'Tú').length },
        { id: 'dia2', label: 'Día 2', count: photos.filter(p => p.tripDay === 'Día 2').length },
        { id: 'dia3', label: 'Día 3', count: photos.filter(p => p.tripDay === 'Día 3').length }
    ]

    return (
        <Card bg="white" border="1px" borderColor="gray.200">
            <CardBody py={4}>
                <Box overflowX="auto">
                    <HStack spacing={3} minW="max-content">
                        {filters.map((filter) => (
                            <Button
                                key={filter.id}
                                variant={selectedFilter === filter.id ? "solid" : "outline"}
                                colorScheme={selectedFilter === filter.id ? "sage" : "gray"}
                                size="sm"
                                onClick={() => onFilterChange(filter.id)}
                                bg={selectedFilter === filter.id ? "sage.400" : "white"}
                                color={selectedFilter === filter.id ? "white" : "gray.600"}
                                borderColor={selectedFilter === filter.id ? "sage.400" : "gray.300"}
                                _hover={{
                                    bg: selectedFilter === filter.id ? "sage.500" : "gray.50",
                                    borderColor: selectedFilter === filter.id ? "sage.500" : "gray.400"
                                }}
                                flexShrink={0}
                            >
                                {filter.label} ({filter.count})
                            </Button>
                        ))}
                    </HStack>
                </Box>
            </CardBody>
        </Card>
    )
}

export default PhotosFilters