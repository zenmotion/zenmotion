import { Tabs } from 'expo-router';
import { Chrome as Home, Dumbbell, UtensilsCrossed, ChartLine as LineChart, User, Target } from 'lucide-react-native';

const ICON_SIZE = 24;
const ACTIVE_COLOR = '#6366f1';
const INACTIVE_COLOR = '#94a3b8';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Home size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Dumbbell size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <UtensilsCrossed size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <LineChart size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <User size={ICON_SIZE} color={color} />,
        }}
      />

    </Tabs>
  );
}
