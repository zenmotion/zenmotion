import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Clock, Dumbbell } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Criar Treino</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              alert('Treino criado com sucesso!');
              router.back();
            }}
          >
            <Plus size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Nome do Treino</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Ex: Treino de Força"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea, isDark && styles.inputDark]}
              placeholder="Descreva seu treino"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Duração (minutos)</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Ex: 45"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Nível</Text>
            <View style={styles.levelButtons}>
              {['Iniciante', 'Intermediário', 'Avançado'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.levelButton,
                    isDark && styles.levelButtonDark,
                    level === 'Intermediário' && styles.levelButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.levelButtonText,
                      isDark && styles.levelButtonTextDark,
                      level === 'Intermediário' && styles.levelButtonTextActive,
                    ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, isDark && styles.labelDark]}>Exercícios</Text>
            {['Agachamento', 'Supino', 'Remada'].map((exercise, index) => (
              <View key={exercise} style={[styles.exerciseItem, isDark && styles.exerciseItemDark]}>
                <View style={styles.exerciseInfo}>
                  <Dumbbell size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.exerciseName, isDark && styles.exerciseNameDark]}>{exercise}</Text>
                </View>
                <View style={styles.exerciseDetails}>
                  <Clock size={16} color={isDark ? '#94a3b8' : '#64748b'} />
                  <Text style={[styles.exerciseTime, isDark && styles.exerciseTimeDark]}>3 x 12</Text>
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
  form: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
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
  levelButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  levelButtonDark: {
    backgroundColor: '#2a2a2a',
  },
  levelButtonActive: {
    backgroundColor: '#6366f1',
  },
  levelButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  levelButtonTextDark: {
    color: '#94a3b8',
  },
  levelButtonTextActive: {
    color: '#ffffff',
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
    gap: 4,
  },
  exerciseTime: {
    fontSize: 14,
    color: '#64748b',
  },
  exerciseTimeDark: {
    color: '#94a3b8',
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
});