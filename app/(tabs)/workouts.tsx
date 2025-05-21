import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Play, Clock, BarChart as BarChart2, Filter, Plus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

const workouts = [
  {
    id: '1',
    name: 'HIIT Cardio',
    duration: '30 min',
    level: 'Intermediário',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Força Total',
    duration: '45 min',
    level: 'Avançado',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Yoga Flow',
    duration: '25 min',
    level: 'Iniciante',
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function WorkoutsScreen() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, isDark && styles.titleDark]}>Treinos</Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Escolha seu treino de hoje
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={[styles.filterButton, isDark && styles.filterButtonDark]}>
              <Filter size={24} color="#6366f1" />
            </TouchableOpacity>
            <Link href="/workouts/create">
              <TouchableOpacity style={[styles.addButton, isDark && styles.addButtonDark]}>
                <Plus size={24} color="#6366f1" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Todos', 'Cardio', 'Força', 'Yoga', 'Pilates'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  isDark && styles.categoryButtonDark,
                  category === 'Todos' && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isDark && styles.categoryTextDark,
                    category === 'Todos' && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.workoutsGrid}>
          {workouts.map((workout) => (
            <Link key={workout.id} href={`/workouts/${workout.id}`}>
              <View style={[styles.workoutCard, isDark && styles.workoutCardDark]}>
                <Image source={{ uri: workout.image }} style={styles.workoutImage} resizeMode="cover" />
                <View style={styles.workoutContent}>
                  <Text style={[styles.workoutName, isDark && styles.workoutNameDark]}>
                    {workout.name}
                  </Text>
                  <View style={styles.workoutDetails}>
                    <View style={styles.detailItem}>
                      <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                      <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
                        {workout.duration}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <BarChart2 size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                      <Text style={[styles.detailText, isDark && styles.detailTextDark]}>
                        {workout.level}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Play size={20} color="#ffffff" />
                    <Text style={styles.playButtonText}>Começar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Link>
          ))}
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
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginTop: 4,
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonDark: {
    backgroundColor: '#6366f140',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDark: {
    backgroundColor: '#6366f140',
  },
  categories: {
    marginBottom: 24,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButtonDark: {
    backgroundColor: '#2a2a2a',
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
  },
  categoryTextDark: {
    color: '#94a3b8',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  workoutsGrid: {
    flexDirection: 'column',
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  workoutCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutCardDark: {
    width: '100%',
    backgroundColor: '#2a2a2a',
  },
  workoutImage: {
    width: '100%', // Garantir que a imagem ocupe toda a largura
    height: 200,
  },
  workoutContent: {
    padding: 16,
  },
  workoutName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  workoutNameDark: {
    color: '#fff',
  },
  workoutDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  detailTextDark: {
    color: '#94a3b8',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
});
