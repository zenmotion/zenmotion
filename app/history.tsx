import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, Dumbbell, Utensils } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const activities = [
    {
      id: '1',
      type: 'workout',
      title: 'Treino HIIT',
      date: '2024-02-20',
      time: '07:30',
      details: '30 minutos • 320 calorias',
      icon: Dumbbell,
      color: '#6366f1',
    },
    {
      id: '2',
      type: 'meal',
      title: 'Café da Manhã',
      date: '2024-02-20',
      time: '08:15',
      details: '420 calorias • 4 itens',
      icon: Utensils,
      color: '#10b981',
    },
    {
      id: '3',
      type: 'workout',
      title: 'Yoga',
      date: '2024-02-19',
      time: '18:00',
      details: '45 minutos • 180 calorias',
      icon: Dumbbell,
      color: '#6366f1',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Histórico</Text>
        </View>

        <View style={styles.timeline}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isLastItem = index === activities.length - 1;

            return (
              <View key={activity.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View 
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${activity.color}20` }
                    ]}
                  >
                    <Icon size={20} color={activity.color} />
                  </View>
                  {!isLastItem && <View style={styles.timelineLine} />}
                </View>
                <View 
                  style={[
                    styles.timelineContent,
                    isDark && styles.timelineContentDark
                  ]}
                >
                  <Text style={[styles.activityTitle, isDark && styles.activityTitleDark]}>
                    {activity.title}
                  </Text>
                  <View style={styles.timeRow}>
                    <Calendar size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                    <Text style={[styles.timeText, isDark && styles.timeTextDark]}>
                      {activity.date}
                    </Text>
                    <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                    <Text style={[styles.timeText, isDark && styles.timeTextDark]}>
                      {activity.time}
                    </Text>
                  </View>
                  <Text style={[styles.activityDetails, isDark && styles.activityDetailsDark]}>
                    {activity.details}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  titleDark: {
    color: '#fff',
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 40,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e2e8f0',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineContentDark: {
    backgroundColor: '#2a2a2a',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  activityTitleDark: {
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
  },
  timeTextDark: {
    color: '#94a3b8',
  },
  activityDetails: {
    fontSize: 14,
    color: '#64748b',
  },
  activityDetailsDark: {
    color: '#94a3b8',
  },
});