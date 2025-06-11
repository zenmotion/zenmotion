import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, UtensilsCrossed, Apple, Beef, Coffee, Scale, Footprints } from 'lucide-react-native';
import { mealApi } from '@/api/api';
import { VictoryPie } from 'victory-native';
import NutritionModal from '@/components/NutritionModal';


type Meal = {
  id: number;
  meal_type: string;
  food_items: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  time: string;
};

export default function Nutrition() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentMeals, setRecentMeals] = useState<Meal[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>(undefined);


  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const response = await mealApi.getAll();
      setRecentMeals(response.map((meal: any) => ({
        ...meal,
        time: new Date(meal.created_at).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })));
    } catch (error) {
      console.error('Falha ao carregar refeições:', error);
    }
  };

  const macroData = [
    { x: 'Carboidratos', y: recentMeals.reduce((sum, meal) => sum + meal.carbs, 0), color: '#4ade80' },
    { x: 'Proteína', y: recentMeals.reduce((sum, meal) => sum + meal.protein, 0), color: '#6366f1' },
    { x: 'Gordura', y: recentMeals.reduce((sum, meal) => sum + meal.fat, 0), color: '#f472b6' },
  ];

  const totalCalories = recentMeals.reduce((sum, meal) => sum + meal.calories, 0);

  const mealTypes = [
    { icon: Coffee, label: 'Café da Manhã' },
    { icon: Apple, label: 'Lanche' },
    { icon: UtensilsCrossed, label: 'Almoço' },
    { icon: Beef, label: 'Jantar' },
  ];

  const handleAddMeal = () => {
    setSelectedMeal(undefined);
    setIsModalVisible(true);
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalVisible(true);
  };

  const handleDeleteMeal = async (id: number) => {
    try {
      await mealApi.delete(id);
      loadMeals();
    } catch (error) {
      console.error('Erro ao excluir refeição:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Nutrição</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Acompanhe suas refeições e nutrientes
        </Text>
      </View>

      {/* <View style={[styles.searchContainer, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
          placeholder="Buscar alimentos..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View> */}

      <View style={[styles.macrosCard, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>  
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Macros de Hoje</Text>
        <View style={styles.macrosChartWrapper}>
          <View style={styles.macrosChart}>
            <VictoryPie
              data={macroData}
              colorScale={macroData.map(d => d.color)}
              innerRadius={70}
              labelRadius={90}
              style={{ labels: { fill: 'none' } }}
              width={200}
              height={200}
              padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            />
            <View style={styles.macrosCenter}>
              <Text style={[styles.calorieValue, { color: colors.text.primary }]}>{totalCalories}</Text>
              <Text style={[styles.calorieLabel, { color: colors.text.secondary }]}>kcal hoje</Text>
            </View>
          </View>
        </View>
        <View style={styles.macrosLegend}>
          {macroData.map((macro) => (
            <View key={macro.x} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: macro.color }]} />
              <Text style={[styles.legendText, { color: colors.text.secondary }]}>{macro.x}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.quickAdd}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Adicionar Rápido</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealTypeScroll}>
          {mealTypes.map((meal) => (
            <TouchableOpacity
              key={meal.label}
              style={[styles.mealTypeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => {
                setSelectedMeal(undefined);
                setIsModalVisible(true);
              }}>
              <meal.icon size={24} color={colors.primary} />
              <Text style={[styles.mealTypeText, { color: colors.text.primary }]}>{meal.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.recentMeals}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Refeições de Hoje</Text>
        {recentMeals.map((meal) => (
          <View
            key={meal.id}
            style={[styles.mealCard, { backgroundColor: colors.card.background, ...colors.card.shadow }]}
          >
            <View style={styles.mealHeader}>
              <View style={styles.mealTypeInfo}>
                <Text style={[styles.mealType, { color: colors.text.primary }]}>{meal.meal_type}</Text>
                <Text style={[styles.mealTime, { color: colors.text.secondary }]}>{meal.time}</Text>
              </View>
              <Text style={[styles.mealCalories, { color: colors.text.primary }]}>{meal.calories} kcal</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity onPress={() => handleEditMeal(meal)} style={{ marginLeft: 8 }}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteMeal(meal.id)} style={{ marginLeft: 8 }}>
                  <Text style={{ color: colors.error, fontWeight: 'bold' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.foodItems, { color: colors.text.secondary }]}>{meal.food_items}</Text>
            <View style={[styles.macroGrid, { flexWrap: 'wrap', justifyContent: 'space-between' }]}> 
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.text.primary }]}>{meal.carbs}g</Text>
                <Text style={[styles.macroLabel, { color: colors.text.secondary }]}>Carboidratos</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.text.primary }]}>{meal.protein}g</Text>
                <Text style={[styles.macroLabel, { color: colors.text.secondary }]}>Proteína</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: colors.text.primary }]}>{meal.fat}g</Text>
                <Text style={[styles.macroLabel, { color: colors.text.secondary }]}>Gordura</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={handleAddMeal}>
        <Plus size={24} color="white" />
        <Text style={styles.addButtonText}>Adicionar Refeição</Text>
      </TouchableOpacity>

      <NutritionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={loadMeals}
        initialData={selectedMeal}
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
  searchContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  searchInput: {
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  macrosCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  macrosChartWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 0,
  },
  macrosChart: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  macrosCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  calorieLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  macrosLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  quickAdd: {
    padding: 16,
  },
  mealTypeScroll: {
    flexDirection: 'row',
  },
  mealTypeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    minWidth: 100,
  },
  mealTypeText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginTop: 8,
  },
  recentMeals: {
    padding: 16,
  },
  mealCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  mealTime: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  mealCalories: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  foodItems: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  macroLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
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
  stepsCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepsLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    flex: 1,
    marginLeft: 8,
  },
  stepsValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginRight: 8,
  },
  stepsAddButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 4,
    backgroundColor: 'white',
  },
});