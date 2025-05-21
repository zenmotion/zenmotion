import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Plus, Apple, Coffee, Pizza } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function NutritionScreen() {
  const { isDark } = useTheme();

  const themeStyles = isDark ? styles.dark : styles.light;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, themeStyles.title]}>Nutrição</Text>
          <Text style={[styles.subtitle, themeStyles.subtitle]}>Acompanhe sua alimentação</Text>
        </View>

        <View style={[styles.calorieCard, themeStyles.calorieCard]}>
          <Text style={[styles.calorieTitle, themeStyles.calorieTitle]}>Calorias Diárias</Text>
          <View style={styles.calorieContent}>
            <View style={styles.calorieItem}>
              <Text style={[styles.calorieValue, themeStyles.calorieValue]}>2000</Text>
              <Text style={[styles.calorieLabel, themeStyles.calorieLabel]}>Meta</Text>
            </View>
            <View style={styles.calorieItem}>
              <Text style={[styles.calorieValue, themeStyles.calorieValue]}>800</Text>
              <Text style={[styles.calorieLabel, themeStyles.calorieLabel]}>Consumido</Text>
            </View>
            <View style={styles.calorieItem}>
              <Text style={[styles.calorieValue, themeStyles.calorieValue]}>1200</Text>
              <Text style={[styles.calorieLabel, themeStyles.calorieLabel]}>Restante</Text>
            </View>
          </View>
          <View style={[styles.progressBar, themeStyles.progressBar]}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
        </View>

        <Link href="/nutrition/add-meal">
          <TouchableOpacity style={[styles.addMealButton, themeStyles.addMealButton]}>
            <Plus size={24} color={themeStyles.iconColor} />
            <Text style={[styles.addMealText, themeStyles.addMealText]}>Adicionar Refeição</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.mealsSection}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Refeições de Hoje</Text>

          <Link href="/nutrition/meals/1">
            <TouchableOpacity style={[styles.mealCard, themeStyles.mealCard]}>
              <View style={[styles.mealIcon, { backgroundColor: '#6366f120' }]}>
                <Coffee size={24} color={themeStyles.iconColor} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={[styles.mealTitle, themeStyles.mealTitle]}>Café da Manhã</Text>
                <Text style={[styles.mealTime, themeStyles.mealTime]}>07:30</Text>
                <Text style={styles.mealCalories}>320 calorias</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/nutrition/meals/2">
            <TouchableOpacity style={[styles.mealCard, themeStyles.mealCard]}>
              <View style={[styles.mealIcon, { backgroundColor: '#f59e0b20' }]}>
                <Apple size={24} color={themeStyles.iconColor} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={[styles.mealTitle, themeStyles.mealTitle]}>Lanche da Manhã</Text>
                <Text style={[styles.mealTime, themeStyles.mealTime]}>10:00</Text>
                <Text style={styles.mealCalories}>150 calorias</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/nutrition/meals/3">
            <TouchableOpacity style={[styles.mealCard, themeStyles.mealCard]}>
              <View style={[styles.mealIcon, { backgroundColor: '#10b98120' }]}>
                <Pizza size={24} color={themeStyles.iconColor} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={[styles.mealTitle, themeStyles.mealTitle]}>Almoço</Text>
                <Text style={[styles.mealTime, themeStyles.mealTime]}>12:30</Text>
                <Text style={styles.mealCalories}>650 calorias</Text>
              </View>
            </TouchableOpacity>
          </Link>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginTop: 4,
  },
  calorieCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  calorieTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  calorieContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calorieItem: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  calorieLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  addMealButton: {
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
  addMealText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#6366f1',
    marginLeft: 8,
  },
  mealsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  mealCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    marginBottom: 2,
  },
  mealCalories: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#6366f1',
  },
  dark: {
    container: {
      backgroundColor: '#1a1a1a',
    },
    title: {
      color: '#fff',
    },
    subtitle: {
      color: '#94a3b8',
    },
    calorieCard: {
      backgroundColor: '#2a2a2a',
    },
    calorieTitle: {
      color: '#fff',
    },
    calorieValue: {
      color: '#fff',
    },
    calorieLabel: {
      color: '#94a3b8',
    },
    progressBar: {
      backgroundColor: '#333333',
    },
    progressFill: {
      backgroundColor: '#6366f1',
    },
    addMealButton: {
      backgroundColor: '#2a2a2a',
    },
    addMealText: {
      color: '#6366f1',
    },
    sectionTitle: {
      color: '#fff',
    },
    mealCard: {
      backgroundColor: '#2a2a2a',
    },
    mealTitle: {
      color: '#fff',
    },
    mealTime: {
      color: '#94a3b8',
    },
    iconColor: '#6366f1',
  },
  light: {
    container: {
      backgroundColor: '#f8fafc',
    },
    iconColor: '#6366f1',
  },
});
