import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Trophy, Medal, Star, Target } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function AchievementsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const achievements = [
    {
      id: '1',
      title: 'Primeira Meta',
      description: 'Complete sua primeira meta de treino',
      icon: Trophy,
      color: '#6366f1',
      progress: 100,
    },
    {
      id: '2',
      title: 'Mestre do Cardio',
      description: 'Complete 10 treinos de cardio',
      icon: Medal,
      color: '#f59e0b',
      progress: 70,
    },
    {
      id: '3',
      title: 'Nutrição Perfeita',
      description: 'Mantenha a dieta por 7 dias seguidos',
      icon: Star,
      color: '#10b981',
      progress: 40,
    },
    {
      id: '4',
      title: 'Super Dedicação',
      description: 'Treine 5 dias seguidos',
      icon: Target,
      color: '#ef4444',
      progress: 20,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Conquistas</Text>
        </View>

        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  isDark && styles.achievementCardDark
                ]}
              >
                <View 
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${achievement.color}20` }
                  ]}
                >
                  <Icon size={24} color={achievement.color} />
                </View>
                <Text style={[styles.achievementTitle, isDark && styles.achievementTitleDark]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, isDark && styles.achievementDescriptionDark]}>
                  {achievement.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar,
                      { width: `${achievement.progress}%`, backgroundColor: achievement.color }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
                  {achievement.progress}%
                </Text>
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
  achievementsGrid: {
    gap: 16,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCardDark: {
    backgroundColor: '#2a2a2a',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  achievementTitleDark: {
    color: '#fff',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  achievementDescriptionDark: {
    color: '#94a3b8',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  progressTextDark: {
    color: '#94a3b8',
  },
});