import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useSearchParams } from 'expo-router';
import { ChevronLeft, Save, Plus, Trash2 } from 'lucide-react-native';

export default function EditMealScreen() {
  const router = useRouter();
  const { id } = useSearchParams();

  const meal = {
    id: '1',
    name: 'Café da Manhã',
    time: '07:30',
    items: [
      { id: '1', name: 'Pão Integral', amount: '2', unit: 'fatias', calories: 160 },
      { id: '2', name: 'Ovos', amount: '2', unit: 'unidades', calories: 140 },
      { id: '3', name: 'Café', amount: '200', unit: 'ml', calories: 20 },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.title}>Editar Refeição</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Save size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome da Refeição</Text>
            <TextInput
              style={styles.input}
              defaultValue={meal.name}
              placeholder="Ex: Café da Manhã"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Horário</Text>
            <TextInput
              style={styles.input}
              defaultValue={meal.time}
              placeholder="Ex: 07:30"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Alimentos</Text>
            {meal.items.map((item) => (
              <View key={item.id} style={styles.foodItem}>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodDetails}>
                    {item.amount} {item.unit} • {item.calories} kcal
                  </Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addFoodButton}>
              <Plus size={20} color="#6366f1" />
              <Text style={styles.addFoodText}>Adicionar Alimento</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Total de Calorias</Text>
          <Text style={styles.summaryValue}>
            {meal.items.reduce((total, item) => total + item.calories, 0)} kcal
          </Text>
        </View>

        <TouchableOpacity style={styles.deleteMealButton}>
          <Text style={styles.deleteMealText}>Excluir Refeição</Text>
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
  foodItem: {
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
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    marginBottom: 4,
  },
  foodDetails: {
    fontSize: 14,
    color: '#64748b',
  },
  deleteButton: {
    padding: 4,
  },
  addFoodButton: {
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
  addFoodText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
  },
  deleteMealButton: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  deleteMealText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});