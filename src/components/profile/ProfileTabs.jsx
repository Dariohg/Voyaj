import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    HStack,
    Icon,
    Text
} from '@chakra-ui/react'
import {
    FiFlag,
    FiAward,
    FiSettings,
    FiActivity
} from 'react-icons/fi'
import TripsTab from './tabs/TripsTab'
import AchievementsTab from './tabs/AchievementsTab'
import ActivityTab from './tabs/ActivityTab'
import SettingsTab from './tabs/SettingsTab'

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
            size="lg"
            variant="line"
            index={activeTab}
            onChange={onTabChange}
        >
            <TabList borderColor="gray.200">
                <Tab _selected={{ color: "sage.600", borderColor: "sage.400" }}>
                    <HStack spacing={2}>
                        <Icon as={FiFlag} />
                        <Text>Mis Viajes</Text>
                    </HStack>
                </Tab>
                <Tab _selected={{ color: "sage.600", borderColor: "sage.400" }}>
                    <HStack spacing={2}>
                        <Icon as={FiAward} />
                        <Text>Logros</Text>
                    </HStack>
                </Tab>
                <Tab _selected={{ color: "sage.600", borderColor: "sage.400" }}>
                    <HStack spacing={2}>
                        <Icon as={FiActivity} />
                        <Text>Actividad</Text>
                    </HStack>
                </Tab>
                <Tab _selected={{ color: "sage.600", borderColor: "sage.400" }}>
                    <HStack spacing={2}>
                        <Icon as={FiSettings} />
                        <Text>Configuración</Text>
                    </HStack>
                </Tab>
            </TabList>

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

                <TabPanel px={0} pt={6}>
                    <SettingsTab
                        user={user}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ProfileTabs