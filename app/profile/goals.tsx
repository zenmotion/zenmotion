import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Target, Trophy, Heart, TrendingUp, Plus } from 'lucide-react-native';

export default function GoalsScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.title}>Suas Metas</Text>
        </View>

        <TouchableOpacity style={styles.addGoalButton}>
          <Plus size={24} color="#6366f1" />
          <Text style={styles.addGoalText}>Adicionar Nova Meta</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metas Ativas</Text>
          
          <TouchableOpacity style={styles.goalCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#6366f120' }]}>
              <Target size={24} color="#6366f1" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Meta de Peso</Text>
              <Text style={styles.goalDescription}>Perder 5kg até Março 2025</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '50%' }]} />
              </View>
              <Text style={styles.progressText}>Faltam 2,5kg</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.goalCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#f59e0b20' }]}>
              <Trophy size={24} color="#f59e0b" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Frequência de Treinos</Text>
              <Text style={styles.goalDescription}>5 treinos por semana</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '80%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.progressText}>4 de 5 treinos completados</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.goalCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#ef444420' }]}>
              <Heart size={24} color="#ef4444" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Meta de Passos</Text>
              <Text style={styles.goalDescription}>10.000 passos por dia</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '70%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.progressText}>7.000 passos hoje</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.goalCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#10b98120' }]}>
              <TrendingUp size={24} color="#10b981" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Progresso de Força</Text>
              <Text style={styles.goalDescription}>Aumentar supino em 20kg</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '30%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.progressText}>6kg aumentados até agora</Text>
            </View>
          </TouchableOpacity>
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
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  addGoalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
});