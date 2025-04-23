import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Clock, Calendar, Trophy, Heart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function NotificationsScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Notificações</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Lembretes de Treino
          </Text>
          <View style={[styles.notificationItem, isDark && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#6366f120' }]}>
                <Clock size={20} color="#6366f1" />
              </View>
              <View>
                <Text style={[styles.notificationTitle, isDark && styles.notificationTitleDark]}>
                  Lembrete Diário
                </Text>
                <Text style={[styles.notificationDescription, isDark && styles.notificationDescriptionDark]}>
                  Receba lembretes para seus treinos
                </Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Nutrição
          </Text>
          <View style={[styles.notificationItem, isDark && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#10b98120' }]}>
                <Calendar size={20} color="#10b981" />
              </View>
              <View>
                <Text style={[styles.notificationTitle, isDark && styles.notificationTitleDark]}>
                  Registro de Refeições
                </Text>
                <Text style={[styles.notificationDescription, isDark && styles.notificationDescriptionDark]}>
                  Lembretes para registrar suas refeições
                </Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Conquistas
          </Text>
          <View style={[styles.notificationItem, isDark && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#f59e0b20' }]}>
                <Trophy size={20} color="#f59e0b" />
              </View>
              <View>
                <Text style={[styles.notificationTitle, isDark && styles.notificationTitleDark]}>
                  Novas Conquistas
                </Text>
                <Text style={[styles.notificationDescription, isDark && styles.notificationDescriptionDark]}>
                  Seja notificado sobre novas conquistas
                </Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Saúde
          </Text>
          <View style={[styles.notificationItem, isDark && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#ef444420' }]}>
                <Heart size={20} color="#ef4444" />
              </View>
              <View>
                <Text style={[styles.notificationTitle, isDark && styles.notificationTitleDark]}>
                  Alertas de Saúde
                </Text>
                <Text style={[styles.notificationDescription, isDark && styles.notificationDescriptionDark]}>
                  Receba alertas sobre sua saúde
                </Text>
              </View>
            </View>
            <Switch value={true} onValueChange={() => {}} />
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
  titleDark: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionTitleDark: {
    color: '#94a3b8',
  },
  notificationItem: {
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
  notificationItemDark: {
    backgroundColor: '#2a2a2a',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  notificationTitleDark: {
    color: '#fff',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  notificationDescriptionDark: {
    color: '#94a3b8',
  },
});