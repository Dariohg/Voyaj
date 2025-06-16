import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    HStack,
    Icon,
    Text
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiDollarSign,
    FiBookOpen,
    FiCamera
} from 'react-icons/fi'
import PlanningTab from './tabs/PlanningTab'
import ExpensesTab from './tabs/ExpensesTab'
import DiaryTab from './tabs/DiaryTab'
import PhotosTab from './tabs/PhotosTab'

const TripTabs = ({
                      activities,
                      expenses,
                      diaryEntries,
                      tripData,
                      onActivityOpen,
                      onExpenseOpen,
                      onDiaryOpen
                  }) => {
    return (
        <Tabs colorScheme="sage" size={{ base: "md", md: "lg" }} variant="line">
            <Box
                overflowX="auto"
                pb={2}
                sx={{
                    '&::-webkit-scrollbar': {
                        height: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'gray.100',
                        borderRadius: '2px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'sage.300',
                        borderRadius: '2px',
                        '&:hover': {
                            backgroundColor: 'sage.400',
                        },
                    },
                }}
            >
                <TabList borderColor="gray.200" minW="max-content">
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 3, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={2}>
                            <Icon as={FiCalendar} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Planificación</Text>
                        </HStack>
                    </Tab>
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 3, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={2}>
                            <Icon as={FiDollarSign} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Gastos</Text>
                        </HStack>
                    </Tab>
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 3, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={2}>
                            <Icon as={FiBookOpen} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Diario</Text>
                        </HStack>
                    </Tab>
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 3, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={2}>
                            <Icon as={FiCamera} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Fotos</Text>
                        </HStack>
                    </Tab>
                </TabList>
            </Box>

            <TabPanels>
                <TabPanel px={0} pt={6}>
                    <PlanningTab
                        activities={activities}
                        tripData={tripData}
                        onActivityOpen={onActivityOpen}
                    />
                </TabPanel>

                <TabPanel px={0} pt={6}>
                    <ExpensesTab
                        expenses={expenses}
                        tripData={tripData}
                        onExpenseOpen={onExpenseOpen}
                    />
                </TabPanel>

                <TabPanel px={0} pt={6}>
                    <DiaryTab
                        diaryEntries={diaryEntries}
                        onDiaryOpen={onDiaryOpen}
                    />
                </TabPanel>

                <TabPanel px={0} pt={6}>
                    <PhotosTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TripTabs