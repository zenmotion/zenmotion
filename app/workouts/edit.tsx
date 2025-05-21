import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useSearchParams } from 'expo-router';
import { ChevronLeft, Save, Clock, Dumbbell, Plus, Trash2 } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function EditWorkoutScreen() {
  const router = useRouter();
  const { id } = useSearchParams();
  const { isDark } = useTheme();

  const workout = {
    id: '1',
    name: 'HIIT Cardio',
    description: 'Treino intenso de cardio com intervalos',
    duration: '30',
    level: 'Intermediário',
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=400&fit=crop',
    exercises: [
      { id: '1', name: 'Burpees', sets: '3', reps: '12' },
      { id: '2', name: 'Mountain Climbers', sets: '3', reps: '20' },
      { id: '3', name: 'Jump Squats', sets: '3', reps: '15' },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Editar Treino</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              alert('Alterações salvas com sucesso!');
              router.back();
            }}
          >
            <Save size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: workout.image }} style={styles.workoutImage} />

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Nome do Treino</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              defaultValue={workout.name}
              placeholder="Ex: Treino de Força"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea, isDark && styles.inputDark]}
              defaultValue={workout.description}
              placeholder="Descreva seu treino"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.label, isDark && styles.labelDark]}>Duração (min)</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                defaultValue={workout.duration}
                keyboardType="numeric"
                placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.label, isDark && styles.labelDark]}>Nível</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                defaultValue={workout.level}
                placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Exercícios</Text>
            {workout.exercises.map((exercise) => (
              <View key={exercise.id} style={[styles.exerciseItem, isDark && styles.exerciseItemDark]}>
                <View style={styles.exerciseInfo}>
                  <Dumbbell size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.exerciseName, isDark && styles.exerciseNameDark]}>
                    {exercise.name}
                  </Text>
                </View>
                <View style={styles.exerciseDetails}>
                  <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.exerciseTime, isDark && styles.exerciseTimeDark]}>
                    {exercise.sets} x {exercise.reps}
                  </Text>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => {
                      alert('Exercício removido: ' + exercise.name);
                    }}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity 
              style={[styles.addExerciseButton, isDark && styles.addExerciseButtonDark]}
              onPress={() => {
                alert('Adicionar novo exercício');
              }}
            >
              <Plus size={20} color="#6366f1" />
              <Text style={styles.addExerciseText}>Adicionar Exercício</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteWorkoutButton}
          onPress={() => {
            alert('Treino excluído com sucesso!');
            router.back();
          }}
        >
          <Text style={styles.deleteWorkoutText}>Excluir Treino</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  titleDark: {
    color: '#fff',
  },
  saveButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  form: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  labelDark: {
    color: '#94a3b8',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseItemDark: {
    backgroundColor: '#2a2a2a',
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exerciseName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  exerciseNameDark: {
    color: '#fff',
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exerciseTime: {
    fontSize: 14,
    color: '#64748b',
  },
  exerciseTimeDark: {
    color: '#94a3b8',
  },
  deleteButton: {
    padding: 4,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  addExerciseButtonDark: {
    backgroundColor: '#2a2a2a',
  },
  addExerciseText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  deleteWorkoutButton: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  deleteWorkoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});