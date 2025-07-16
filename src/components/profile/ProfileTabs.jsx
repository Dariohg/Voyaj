import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    HStack,
    Icon,
    Text,
    Box
} from '@chakra-ui/react'
import {
    FiFlag,
    FiAward,
    FiActivity
} from 'react-icons/fi'
import TripsTab from './tabs/TripsTab'
import AchievementsTab from './tabs/AchievementsTab'
import ActivityTab from './tabs/ActivityTab'

const ProfileTabs = ({
                         user,
                         stats,
                         recentTrips,
                         achievements,
                         activeTab,
                         onTabChange
                     }) => {
    return (
        <Tabs
            colorScheme="sage"
            size={{ base: "md", md: "lg" }}
            variant="line"
            index={activeTab}
            onChange={onTabChange}
        >
            {/* TabList con scroll horizontal en móvil */}
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
                        px={{ base: 2, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={{ base: 1, md: 2 }}>
                            <Icon as={FiFlag} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>
                                {/* Texto corto en móvil */}
                                <Box display={{ base: "block", sm: "none" }}>Viajes</Box>
                                <Box display={{ base: "none", sm: "block" }}>Mis Viajes</Box>
                            </Text>
                        </HStack>
                    </Tab>
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 2, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={{ base: 1, md: 2 }}>
                            <Icon as={FiAward} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Logros</Text>
                        </HStack>
                    </Tab>
                    <Tab
                        _selected={{ color: "sage.600", borderColor: "sage.400" }}
                        px={{ base: 2, md: 4 }}
                        minW="max-content"
                    >
                        <HStack spacing={{ base: 1, md: 2 }}>
                            <Icon as={FiActivity} boxSize={{ base: 4, md: 5 }} />
                            <Text fontSize={{ base: "sm", md: "md" }}>Actividad</Text>
                        </HStack>
                    </Tab>
                </TabList>
            </Box>

            <TabPanels>
                <TabPanel px={0} pt={6}>
                    <TripsTab
                        trips={recentTrips}
                        stats={stats}
                    />
                </TabPanel>

                <TabPanel px={0} pt={6}>
                    <AchievementsTab
                        achievements={achievements}
                    />
                </TabPanel>

                <TabPanel px={0} pt={6}>
                    <ActivityTab
                        user={user}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ProfileTabs