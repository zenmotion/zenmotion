import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Trophy, TrendingUp, Target, Heart, Calendar, Clock } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardScreen() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, isDark && styles.greetingDark]}>Olá, Sarah!</Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Vamos alcançar seus objetivos hoje
            </Text>
          </View>
          <Link href="/profile/settings" asChild>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </Link>
        </View>
        
        <View style={styles.progressSection}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Progresso Diário
          </Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Heart size={20} color="#ef4444" />
              <Text style={[styles.statValue, isDark && styles.statValueDark]}>2.345</Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Passos</Text>
              <View style={[styles.progressBar, { width: '70%', backgroundColor: '#ef4444' }]} />
            </View>
            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <TrendingUp size={20} color="#6366f1" />
              <Text style={[styles.statValue, isDark && styles.statValueDark]}>320</Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Calorias</Text>
              <View style={[styles.progressBar, { width: '45%', backgroundColor: '#6366f1' }]} />
            </View>
            <View style={[styles.statCard, isDark && styles.statCardDark]}>
              <Clock size={20} color="#10b981" />
              <Text style={[styles.statValue, isDark && styles.statValueDark]}>45</Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Minutos</Text>
              <View style={[styles.progressBar, { width: '60%', backgroundColor: '#10b981' }]} />
            </View>
          </View>
        </View>

        <View style={styles.goalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Suas Metas</Text>
            <Link href="/profile/goals" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Ver Todas</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.goalsScroll}>
            <TouchableOpacity style={[styles.goalCard, isDark && styles.goalCardDark]}>
              <Target size={24} color="#6366f1" />
              <Text style={[styles.goalTitle, isDark && styles.goalTitleDark]}>Meta de Peso</Text>
              <Text style={[styles.goalValue, isDark && styles.goalValueDark]}>65kg</Text>
              <Text style={[styles.goalProgress, isDark && styles.goalProgressDark]}>Faltam 2,5kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.goalCard, isDark && styles.goalCardDark]}>
              <Trophy size={24} color="#f59e0b" />
              <Text style={[styles.goalTitle, isDark && styles.goalTitleDark]}>Meta de Treinos</Text>
              <Text style={[styles.goalValue, isDark && styles.goalValueDark]}>4/5</Text>
              <Text style={[styles.goalProgress, isDark && styles.goalProgressDark]}>Treinos semanais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.goalCard, isDark && styles.goalCardDark]}>
              <Heart size={24} color="#ef4444" />
              <Text style={[styles.goalTitle, isDark && styles.goalTitleDark]}>Meta de Passos</Text>
              <Text style={[styles.goalValue, isDark && styles.goalValueDark]}>10.000</Text>
              <Text style={[styles.goalProgress, isDark && styles.goalProgressDark]}>Passos diários</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Treino de Hoje</Text>
            <Link href="/workouts" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Ver Todos</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <TouchableOpacity style={[styles.workoutCard, isDark && styles.workoutCardDark]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop' }}
              style={styles.workoutImage}
            />
            <View style={styles.workoutContent}>
              <Text style={[styles.workoutTitle, isDark && styles.workoutTitleDark]}>
                Treino Completo
              </Text>
              <View style={styles.workoutDetails}>
                <View style={styles.workoutDetail}>
                  <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.workoutDetailText, isDark && styles.workoutDetailTextDark]}>
                    45 min
                  </Text>
                </View>
                <View style={styles.workoutDetail}>
                  <Calendar size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.workoutDetailText, isDark && styles.workoutDetailTextDark]}>
                    8 exercícios
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              Visão Nutricional
            </Text>
            <Link href="/nutrition" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Ver Mais</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={[styles.nutritionCard, isDark && styles.nutritionCardDark]}>
            <View style={styles.nutritionHeader}>
              <Text style={[styles.nutritionTitle, isDark && styles.nutritionTitleDark]}>
                Calorias Restantes
              </Text>
              <Text style={styles.calorieCount}>1.200</Text>
            </View>
            <View style={[styles.calorieBar, isDark && styles.calorieBarDark]}>
              <View style={styles.calorieBarFill} />
            </View>
            <View style={styles.nutritionDetails}>
              <View style={styles.nutritionDetail}>
                <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>
                  Meta
                </Text>
                <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>
                  2.000
                </Text>
              </View>
              <View style={styles.nutritionDetail}>
                <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>
                  Consumido
                </Text>
                <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>
                  800
                </Text>
              </View>
              <View style={styles.nutritionDetail}>
                <Text style={[styles.nutritionLabel, isDark && styles.nutritionLabelDark]}>
                  Exercício
                </Text>
                <Text style={[styles.nutritionValue, isDark && styles.nutritionValueDark]}>
                  +320
                </Text>
              </View>
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  greetingDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  sectionTitleDark: {
    color: '#fff',
  },
  seeAllText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardDark: {
    backgroundColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginVertical: 4,
  },
  statValueDark: {
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  statLabelDark: {
    color: '#94a3b8',
  },
  progressBar: {
    height: 3,
    borderRadius: 1.5,
  },
  goalsSection: {
    marginBottom: 24,
  },
  goalsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  goalCardDark: {
    backgroundColor: '#2a2a2a',
  },
  goalTitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 12,
  },
  goalTitleDark: {
    color: '#94a3b8',
  },
  goalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 4,
  },
  goalValueDark: {
    color: '#fff',
  },
  goalProgress: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  goalProgressDark: {
    color: '#94a3b8',
  },
  section: {
    marginBottom: 24,
  },
  workoutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutCardDark: {
    backgroundColor: '#2a2a2a',
  },
  workoutImage: {
    width: '100%',
    height: 160,
  },
  workoutContent: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  workoutTitleDark: {
    color: '#fff',
  },
  workoutDetails: {
    flexDirection: 'row',
  },
  workoutDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutDetailText: {
    marginLeft: 4,
    color: '#64748b',
    fontSize: 14,
  },
  workoutDetailTextDark: {
    color: '#94a3b8',
  },
  nutritionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  nutritionCardDark: {
    backgroundColor: '#2a2a2a',
  },
  nutritionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  nutritionTitleDark: {
    color: '#fff',
  },
  calorieCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
  },
  calorieBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginBottom: 16,
  },
  calorieBarDark: {
    backgroundColor: '#333333',
  },
  calorieBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  nutritionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionDetail: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  nutritionLabelDark: {
    color: '#94a3b8',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  nutritionValueDark: {
    color: '#fff',
  },
});