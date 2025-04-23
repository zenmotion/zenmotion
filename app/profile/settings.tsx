import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Moon, Bell, Lock, Globe, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Configurações</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Aparência</Text>
          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#6366f120' }]}>
                <Moon size={20} color="#6366f1" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Modo Escuro</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#6366f1' }}
              thumbColor={isDark ? '#fff' : '#f4f3f4'} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Notificações</Text>
          <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#ef444420' }]}>
                <Bell size={20} color="#ef4444" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Notificações Push</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Privacidade e Segurança</Text>
          <TouchableOpacity style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#10b98120' }]}>
                <Lock size={20} color="#10b981" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Configurações de Privacidade</Text>
            </View>
            <ChevronLeft size={20} color={isDark ? '#fff' : '#64748b'} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#f59e0b20' }]}>
                <Globe size={20} color="#f59e0b" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Idioma</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, isDark && styles.settingValueDark]}>Português</Text>
              <ChevronLeft size={20} color={isDark ? '#fff' : '#64748b'} style={{ transform: [{ rotate: '180deg' }] }} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Suporte</Text>
          <TouchableOpacity style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#6366f120' }]}>
                <HelpCircle size={20} color="#6366f1" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Central de Ajuda</Text>
            </View>
            <ChevronLeft size={20} color={isDark ? '#fff' : '#64748b'} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, isDark && styles.settingItemDark]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#64748b20' }]}>
                <Info size={20} color="#64748b" />
              </View>
              <Text style={[styles.settingText, isDark && styles.settingTextDark]}>Sobre</Text>
            </View>
            <ChevronLeft size={20} color={isDark ? '#fff' : '#64748b'} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Excluir Conta</Text>
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
  settingItem: {
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
  settingItemDark: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1e293b',
  },
  settingTextDark: {
    color: '#fff',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  settingValueDark: {
    color: '#94a3b8',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});