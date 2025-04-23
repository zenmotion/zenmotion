import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, Calendar, Target, Bell, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const { isDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, isDark && styles.userNameDark]}>Sarah Wilson</Text>
              <Text style={[styles.userEmail, isDark && styles.userEmailDark]}>sarah.wilson@example.com</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.settingsButton, isDark && styles.settingsButtonDark]}
            onPress={() => router.push('/profile/settings')}
          >
            <Settings size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {[
            { value: '24', label: 'Treinos' },
            { value: '12.4k', label: 'Calorias' },
            { value: '5.2', label: 'Horas' },
          ].map((stat, index) => (
            <View key={index} style={[styles.statCard, isDark && styles.statCardDark]}>
              <Text style={[styles.statValue, isDark && styles.statValueDark]}>{stat.value}</Text>
              <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.menuSection, isDark && styles.menuSectionDark]}>
          {[
            { icon: Award, title: 'Conquistas', color: '#6366f1', link: '/achievements' },
            { icon: Calendar, title: 'Histórico', color: '#f59e0b', link: '/history' },
            { icon: Target, title: 'Metas', color: '#10b981', link: '/profile/goals' },
            { icon: Bell, title: 'Notificações', color: '#ef4444', link: '/notifications' },
          ].map(({ icon: Icon, title, color, link }) => (
            <Link key={title} href={link} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                    <Icon size={20} color={color} />
                  </View>
                  <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>{title}</Text>
                </View>
                <ChevronRight size={20} color={isDark ? "#cbd5e1" : "#64748b"} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <TouchableOpacity style={[styles.logoutButton, isDark && styles.logoutButtonDark]}>
          <Text style={[styles.logoutText, isDark && styles.logoutTextDark]}>Sair</Text>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  userNameDark: {
    color: '#f8fafc',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  userEmailDark: {
    color: '#94a3b8',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButtonDark: {
    backgroundColor: '#6366f140',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardDark: {
    backgroundColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statValueDark: {
    color: '#f8fafc',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statLabelDark: {
    color: '#94a3b8',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  menuSectionDark: {
    backgroundColor: '#2a2a2a',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuItemText: {
    fontSize: 16,
    color: '#1e293b',
  },

  menuItemTextDark: {
    color: '#f8fafc',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonDark: {
    backgroundColor: '#7f1d1d',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutTextDark: {
    color: '#fecaca',
  },
});