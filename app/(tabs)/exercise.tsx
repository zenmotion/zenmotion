import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Play, Pause, Plus, Timer, Flame } from 'lucide-react-native';
import { workoutApi } from '@/api/api';
import ExerciseModal from '@/components/ExerciseModal';
import { userStorage } from '@/utils/userStorage';

type WorkoutType = {
  id: number;
  type: string;
  duration_minutes: number;
  calories_burned: number;
  date: string;
};

export default function Exercise() {
  const { colors } = useTheme();
  const [isTracking, setIsTracking] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutType | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutType[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTracking) {
      interval = setInterval(() => {
        setWorkoutTime((prev) => prev + 1);
      }, 1000) as unknown as NodeJS.Timeout;
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  const loadWorkouts = async () => {
    try {
      const userId = await userStorage.getUserId();
      if (!userId) return;
      const todayStr = new Date().toISOString().slice(0, 10);
      const todayWorkouts = await workoutApi.getByUserAndDate(userId, todayStr);
      setRecentWorkouts(todayWorkouts.map((workout: any) => ({
        ...workout,
        date: new Date(workout.date || workout.created_at).toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
        })
      })));
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    }
  };

  const handleSaveWorkout = async () => {
    try {
      const minutes = Math.floor(workoutTime / 60);
      const calories = Math.round(minutes * 8);

      const userId = await userStorage.getUserId();
      if (!userId) throw new Error('Usuário não autenticado');
      await workoutApi.create({
        user: userId,
        type: 'Treino',
        duration_minutes: minutes,
        calories_burned: calories,
      });

      setWorkoutTime(0);
      setIsTracking(false);
      loadWorkouts();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Exercícios</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Monitore seus treinos e progresso
        </Text>
      </View>

      <View style={styles.recentWorkouts}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Treinos Recentes</Text>
        {recentWorkouts.map((workout) => (
          <View
            key={workout.id}
            style={[styles.workoutCard, { backgroundColor: colors.card.background, ...colors.card.shadow }]}
          >
            <View style={styles.workoutHeader}>
              <Text style={[styles.workoutType, { color: colors.text.primary }]}>{workout.type}</Text>
              <Text style={[styles.workoutDate, { color: colors.text.secondary }]}>{workout.date}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => { setEditingWorkout(workout); setIsModalVisible(true); }}
                  style={{ marginLeft: 8 }}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => { await workoutApi.delete(workout.id); loadWorkouts(); }}
                  style={{ marginLeft: 8 }}>
                  <Text style={{ color: colors.error, fontWeight: 'bold' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.workoutStats}>
              <View style={styles.workoutStat}>
                <Timer size={16} color={colors.text.secondary} />
                <Text style={[styles.workoutStatText, { color: colors.text.secondary }]}>
                  {workout.duration_minutes} min
                </Text>
              </View>
              <View style={styles.workoutStat}>
                <Flame size={16} color={colors.text.secondary} />
                <Text style={[styles.workoutStatText, { color: colors.text.secondary }]}>
                  {workout.calories_burned} cal
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => { setEditingWorkout(null); setIsModalVisible(true); }}>
        <Plus size={24} color="white" />
        <Text style={styles.addButtonText}>Adicionar Manualmente</Text>
      </TouchableOpacity>

      <ExerciseModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={loadWorkouts}
        initialData={editingWorkout || undefined}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  trackingCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  trackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  trackingButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  recentWorkouts: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  workoutCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutType: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  workoutDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 16,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutStatText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});