import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Mail, Calendar, Ruler, Scale, CreditCard as Edit2, Save, Settings, Bell, Moon, ChevronRight, LogOut, Target } from 'lucide-react-native';
import { userApi, authApi, preferencesApi } from '@/api/api';
import { router } from 'expo-router';

export default function Profile() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    birth_date: '1990-05-15',
    height_cm: '165',
    weight_kg: '62',
    gender: 'F',
  });

  const handleSave = async () => {
    try {
      await userApi.update(1, {
        name: userData.name,
        email: userData.email,
        birth_date: userData.birth_date,
        height_cm: parseInt(userData.height_cm),
        weight_kg: parseInt(userData.weight_kg),
        gender: userData.gender as 'M' | 'F' | 'O',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Falha ao atualizar perfil:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.replace('/login');
    } catch (error) {
      console.error('Falha ao sair:', error);
    }
  };

  const updatePreferences = async () => {
    try {
      await preferencesApi.update(1, {
        notifications_enabled: notifications,
        preferred_units: units,
      });
    } catch (error) {
      console.error('Falha ao atualizar preferências:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <Save size={20} color="white" />
              ) : (
                <Edit2 size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/settings')}>
            <Settings size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
          <View style={styles.sectionHeader}>
            <User size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Informações Pessoais</Text>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Nome</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                value={userData.name}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
              />
            ) : (
              <Text style={[styles.value, { color: colors.text.primary }]}>{userData.name}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Email</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                value={userData.email}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
                keyboardType="email-address"
              />
            ) : (
              <Text style={[styles.value, { color: colors.text.primary }]}>{userData.email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Data de Nascimento</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                value={userData.birth_date}
                onChangeText={(text) => setUserData({ ...userData, birth_date: text })}
                placeholder="AAAA-MM-DD"
              />
            ) : (
              <Text style={[styles.value, { color: colors.text.primary }]}>{userData.birth_date}</Text>
            )}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
          <View style={styles.sectionHeader}>
            <Scale size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Medidas Corporais</Text>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Altura (cm)</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                value={userData.height_cm}
                onChangeText={(text) => setUserData({ ...userData, height_cm: text })}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.value, { color: colors.text.primary }]}>{userData.height_cm} cm</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Peso (kg)</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
                value={userData.weight_kg}
                onChangeText={(text) => setUserData({ ...userData, weight_kg: text })}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.value, { color: colors.text.primary }]}>{userData.weight_kg} kg</Text>
            )}
          </View>
        </View>
      <View style={styles.section1}>
        <TouchableOpacity
                    style={[styles.settingItem, { backgroundColor: colors.card.background, ...colors.card.shadow }]}
                    onPress={() => router.push('/goals')}
                  >
                    <View style={styles.settingContent}>
                      <Target size={24} color={colors.primary} />
                      <Text style={[styles.settingText, { color: colors.text.primary }]}>Metas</Text>
                    </View>
                    <ChevronRight size={24} color={colors.text.secondary} />
                  </TouchableOpacity>
      </View>
        {/* <View style={[styles.section, { backgroundColor: colors.card.background, ...colors.card.shadow }]}>
          <View style={styles.sectionHeader}>
            <Settings size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Configurações Rápidas</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Bell size={24} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text.primary }]}>Notificações</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, { backgroundColor: notifications ? colors.primary : colors.surface }]}
              onPress={() => {
                setNotifications(!notifications);
                updatePreferences();
              }}>
              <View style={[styles.toggleKnob, { backgroundColor: 'white' }]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Moon size={24} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text.primary }]}>Modo Escuro</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, { backgroundColor: isDark ? colors.primary : colors.surface }]}
              onPress={toggleTheme}>
              <View style={[styles.toggleKnob, { backgroundColor: 'white' }]} />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ruler size={24} color={colors.primary} />
              <Text style={[styles.settingText, { color: colors.text.primary }]}>Unidades</Text>
            </View>
            <TouchableOpacity
              style={[styles.unitToggle, { backgroundColor: colors.surface }]}
              onPress={() => {
                setUnits(units === 'metric' ? 'imperial' : 'metric');
                updatePreferences();
              }}>
              <Text style={[styles.unitText, { color: colors.text.primary }]}>
                {units === 'metric' ? 'Métrico' : 'Imperial'}
              </Text>
              <ChevronRight size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View> */}

        {isEditing && (
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}>
          <LogOut size={24} color="white" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileHeader: {
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  section1: {
    paddingVertical: 8,
  },
  section: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
    settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
    settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  toggle: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 2,
  },
  toggleKnob: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  unitText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});