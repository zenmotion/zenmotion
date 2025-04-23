import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Search } from 'lucide-react-native';

export default function AddMealScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.title}>Adicionar Refeição</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Plus size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimentos..."
          />
        </View>

        <View style={styles.mealTypeSection}>
          <Text style={styles.sectionTitle}>Tipo de Refeição</Text>
          <View style={styles.mealTypes}>
            {[
              'Café da Manhã',
              'Lanche da Manhã',
              'Almoço',
              'Lanche da Tarde',
              'Jantar',
              'Ceia',
            ].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mealTypeButton,
                  type === 'Almoço' && styles.mealTypeButtonActive,
                ]}>
                <Text
                  style={[
                    styles.mealTypeText,
                    type === 'Almoço' && styles.mealTypeTextActive,
                  ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentFoodsSection}>
          <Text style={styles.sectionTitle}>Alimentos Recentes</Text>
          {[
            { name: 'Arroz Integral', calories: 130, portion: '100g' },
            { name: 'Peito de Frango', calories: 165, portion: '100g' },
            { name: 'Brócolis', calories: 55, portion: '100g' },
          ].map((food) => (
            <TouchableOpacity key={food.name} style={styles.foodItem}>
              <View>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodPortion}>{food.portion}</Text>
              </View>
              <Text style={styles.foodCalories}>{food.calories} kcal</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customFoodSection}>
          <Text style={styles.sectionTitle}>Adicionar Manualmente</Text>
          <TouchableOpacity style={styles.addCustomButton}>
            <Plus size={20} color="#6366f1" />
            <Text style={styles.addCustomText}>Novo Alimento</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  mealTypeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  mealTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  mealTypeButtonActive: {
    backgroundColor: '#6366f1',
  },
  mealTypeText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  mealTypeTextActive: {
    color: '#ffffff',
  },
  recentFoodsSection: {
    marginBottom: 24,
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
  foodName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    marginBottom: 4,
  },
  foodPortion: {
    fontSize: 14,
    color: '#64748b',
  },
  foodCalories: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
  },
  customFoodSection: {
    marginBottom: 24,
  },
  addCustomButton: {
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
  addCustomText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
});