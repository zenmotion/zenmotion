import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Activity, TrendingUp, Utensils, Target } from 'lucide-react-native';
import {
  VictoryPie,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory-native';
import { workoutApi, mealApi, stepRecordApi } from '@/api/api';
import NutritionModal from '@/components/NutritionModal';
import GoalModal from '@/components/GoalModal';

export default function Dashboard() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [steps, setSteps] = useState(0);
  const [activityData, setActivityData] = useState([]);
  const [isNutritionModalVisible, setIsNutritionModalVisible] = useState(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const meals = await mealApi.getAll();
      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      setCaloriesConsumed(totalCalories);

      const workouts = await workoutApi.getAll();
      const totalBurned = workouts.reduce(
        (sum, workout) => sum + workout.calories_burned,
        0
      );
      setCaloriesBurned(totalBurned);

      const stepRecords = await stepRecordApi.getAll();
      if (stepRecords.length > 0) {
        setSteps(stepRecords[stepRecords.length - 1].steps);
      }

      setActivityData(
        stepRecords.map((record, index) => ({
          x: index + 1,
          y: record.steps,
        }))
      );
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleAddMeal = () => setIsNutritionModalVisible(true);
  const handleSetGoal = () => setIsGoalModalVisible(true);

  const calorieData = [
    { x: 'Consumidas', y: caloriesConsumed, color: colors.primary },
    { x: 'Restantes', y: 2500 - caloriesConsumed, color: colors.secondary },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text.primary }]}>
          Bem-vindo(a), Sarah!
        </Text>
        <Text style={[styles.date, { color: colors.text.secondary }]}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card.background, ...colors.card.shadow },
          ]}
        >
          <Activity size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {steps.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            Passos Hoje
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card.background, ...colors.card.shadow },
          ]}
        >
          <TrendingUp size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {caloriesBurned}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            Calorias Queimadas
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card.background, ...colors.card.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Visão Geral de Calorias
        </Text>
        <View style={styles.calorieChart}>
          <VictoryPie
            width={width * 0.9}
            height={200}
            data={calorieData}
            colorScale={calorieData.map((d) => d.color)}
            innerRadius={width * 0.18}
            labelRadius={width * 0.28}
            style={{ labels: { fill: 'none' } }}
          />
          <View style={styles.calorieCenter}>
            <Text style={[styles.calorieValue, { color: colors.text.primary }]}>
              {caloriesConsumed}
            </Text>
            <Text style={[styles.calorieLabel, { color: colors.text.secondary }]}>
              de 2500 kcal
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card.background, ...colors.card.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Atividade Semanal
        </Text>
        <VictoryChart
          height={200}
          padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
          width={width * 0.95}
        >
          <VictoryAxis
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary },
            }}
          />
          <VictoryLine
            data={activityData}
            style={{
              data: { stroke: colors.primary },
            }}
          />
        </VictoryChart>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={handleAddMeal}
        >
          <Utensils size={24} color="white" />
          <Text style={styles.actionButtonText}>Registrar Refeição</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={handleSetGoal}
        >
          <Target size={24} color="white" />
          <Text style={styles.actionButtonText}>Definir Meta</Text>
        </TouchableOpacity>
      </View>

      <NutritionModal
        isVisible={isNutritionModalVisible}
        onClose={() => setIsNutritionModalVisible(false)}
        onSave={() => {
          loadDashboardData();
          setIsNutritionModalVisible(false);
        }}
      />

      <GoalModal
        isVisible={isGoalModalVisible}
        onClose={() => setIsGoalModalVisible(false)}
        onSave={() => setIsGoalModalVisible(false)}
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
  greeting: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  calorieChart: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calorieCenter: {
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    flexGrow: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
