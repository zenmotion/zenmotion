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
import { Activity, TrendingUp, Utensils, Target, Footprints } from 'lucide-react-native';
import {
  VictoryPie,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from 'victory-native';
import { workoutApi, mealApi, stepRecordApi, userApi, preferencesApi } from '@/api/api';
import { userStorage } from '@/utils/userStorage';
import NutritionModal from '@/components/NutritionModal';
import GoalModal from '@/components/GoalModal';
import StepModal from '@/components/StepModal';

export default function Dashboard() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [steps, setSteps] = useState(0);
  const [activityData, setActivityData] = useState<{ x: number; y: number }[]>([]);
  const [isNutVisible, setIsNutVisible] = useState(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [isStepModalVisible, setIsStepModalVisible] = useState(false);

  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState<'M'|'F'|'O'|undefined>(undefined);
  const [userId, setUserId] = useState<number | null>(null);
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number>(2000);
  const [dailyStepGoal, setDailyStepGoal] = useState<number>(10000);

  useEffect(() => {
    userStorage.getUserId().then(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      loadDashboardData();
      loadUser();
      loadUserPreferences();
    }
  }, [userId]);

  const loadUserPreferences = async () => {
    if (typeof userId !== 'number') return;
    try {
      const prefs = await preferencesApi.getById(userId);
      if (prefs) {
        setDailyCalorieGoal(prefs.daily_calorie_goal ?? 2000);
        setDailyStepGoal(prefs.daily_step_goal ?? 10000);
      } else {
        setDailyCalorieGoal(2000);
        setDailyStepGoal(10000);
      }
    } catch (error) {
      setDailyCalorieGoal(2000);
      setDailyStepGoal(10000);
    }
  };

  const loadUser = async () => {
    try {
      const user = await userApi.getById(userId);
      setUserName(user.name);
      setUserGender(user.gender);
    } catch (error) {
      setUserName('Usuário');
      setUserGender(undefined);
    }
  };

  const loadDashboardData = async () => {
    if (typeof userId !== 'number') return;
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      if (typeof userId !== 'number') return;
      const mealsToday = await mealApi.getByUserAndDate(userId as number, todayStr);
      const totalCalories = mealsToday.reduce((sum: number, meal: any) => sum + meal.calories, 0);
      setCaloriesConsumed(totalCalories);

      const workoutsToday = await workoutApi.getByUserAndDate(userId as number, todayStr);
      const totalBurned = workoutsToday.reduce(
        (sum: number, workout: any) => sum + workout.calories_burned,
        0
      );
      setCaloriesBurned(totalBurned);

      const stepRecords = await stepRecordApi.getAll();
      const stepRecordsToday = stepRecords.filter((record: any) => {
        const recordDate = (record.recorded_at || record.date || '').slice(0, 10);
        return recordDate === todayStr && record.user === userId;
      });
      if (stepRecordsToday.length > 0) {
        setSteps(stepRecordsToday[stepRecordsToday.length - 1].steps);
      } else {
        setSteps(0);
      }
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
      });
      const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
      const activityDataWeek = last7Days.map((date, idx) => {
        const dateStr = date.toISOString().slice(0, 10);
        const record = stepRecords.find((r: any) => (r.recorded_at || r.date || '').slice(0, 10) === dateStr && r.user === userId);
        return {
          x: idx + 1,
          y: record ? record.steps : 0,
        };
      });
      setActivityData(activityDataWeek);
      (window as any).weekDaysForChart = last7Days.map(d => weekDays[d.getDay()]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleAddMeal = () => setIsNutVisible(true);
  const handleSetGoal = () => setIsGoalModalVisible(true);

  const handleAddSteps = () => setIsStepModalVisible(true);

  const handleSaveSteps = async (newSteps: number) => {
    try {
      if (typeof userId !== 'number') throw new Error('Usuário não autenticado');
      await stepRecordApi.create({ user: userId, steps: newSteps, recorded_at: new Date().toISOString().slice(0, 10) });
      setSteps(newSteps);
      loadDashboardData();
    } catch (error) {
      console.error('Erro ao adicionar passos:', error);
    }
    setIsStepModalVisible(false);
  };

  const calorieData = [
    { x: 'Consumidas', y: caloriesConsumed, color: colors.primary },
    { x: 'Restantes', y: Math.max(dailyCalorieGoal - caloriesConsumed, 0), color: colors.secondary },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text.primary }]}>{userGender === 'M' && `Bem-vindo, ${userName}!`}
          {userGender === 'F' && `Bem-vinda, ${userName}!`}
          {userGender === 'O' && `Bem-vindo(a), ${userName}!`}
          {!userGender && `Bem-vindo, ${userName}!`}
        </Text>
        <Text style={[styles.date, { color: colors.text.secondary }]}>{new Date().toLocaleDateString('pt-BR', {
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
            { backgroundColor: colors.card.background,  },
          ]}
        >
          <Activity size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text.primary }]}>{steps.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{'Passos Hoje'}</Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card.background,  },
          ]}
        >
          <TrendingUp size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text.primary }]}>{caloriesBurned}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{'Calorias Queimadas'}</Text>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card.background,  },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{'Visão Geral de Calorias'}</Text>
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
            <Text style={[styles.calorieValue, { color: colors.text.primary }]}>{caloriesConsumed}</Text>
            <Text style={[styles.calorieLabel, { color: colors.text.secondary }]}>{' de '}{dailyCalorieGoal}{''}{'kcal'}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.activityCard, { backgroundColor: colors.card.background,  }]}>
        <Text style={[styles.activityTitle, { color: colors.text.primary, textAlign: 'center' }]}>{'Atividade Semanal'}</Text>
        <VictoryChart
          height={220}
          padding={{ top: 16, bottom: 36, left: 56, right: 16 }}
          width={width * 0.98}
          domainPadding={{ x: 20, y: 20 }}
        >
          <VictoryAxis
            label="Dia"
            tickFormat={(t) => (window as any).weekDaysForChart ? (window as any).weekDaysForChart[t - 1] : t}
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary, fontFamily: 'Inter_400Regular', fontSize: 13 },
              axisLabel: { fill: colors.text.secondary, fontSize: 14, padding: 24, fontFamily: 'Inter_500Medium' },
              grid: { stroke: '#e5e7eb', strokeDasharray: '4,4' },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Passos"
            domain={[0, Math.max(...activityData.map(d => d.y), 10000) * 1.1]}
            tickFormat={(t) => t >= 1000 ? `${Math.round(t/1000)}k` : t}
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary, fontFamily: 'Inter_400Regular', fontSize: 13 },
              axisLabel: { fill: colors.text.secondary, fontSize: 14, padding: 28, fontFamily: 'Inter_500Medium' },
              grid: { stroke: '#e5e7eb', strokeDasharray: '4,4' },
            }}
          />
          <VictoryLine
            data={activityData}
            style={{
              data: { stroke: colors.primary, strokeWidth: 3 },
            }}
            interpolation="monotoneX"
          />
          <VictoryScatter
            data={activityData}
            size={5}
            style={{ data: { fill: colors.primary } }}
          />
        </VictoryChart>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={handleAddMeal}
        >
          <Utensils size={24} color="white" />
          <Text style={styles.actionButtonText}>{'Registrar Refeição'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: (colors as any).tertiary ?? '#06b6d4' }]}
          onPress={handleAddSteps}
        >
          <Footprints size={24} color="white" />
          <Text style={styles.actionButtonText}>{'Adicionar Passos'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={handleSetGoal}
        >
          <Target size={24} color="white" />
          <Text style={styles.actionButtonText}>{'Definir Meta'}</Text>
        </TouchableOpacity>
      </View>

      <NutritionModal
        isVisible={isNutVisible}
        onClose={() => setIsNutVisible(false)}
        onSave={() => {
          setIsNutVisible(false);
          loadDashboardData();
        }}
      />

      <GoalModal
        isVisible={isGoalModalVisible}
        onClose={() => setIsGoalModalVisible(false)}
        onSave={() => setIsGoalModalVisible(false)}
      />
      <StepModal
        visible={isStepModalVisible}
        onClose={() => setIsStepModalVisible(false)}
        onSave={handleSaveSteps}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
    textAlign: 'center',
  },
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
