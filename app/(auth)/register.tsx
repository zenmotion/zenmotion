import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { Link, router } from 'expo-router';
import { authApi, preferencesApi } from '@/api/api';
import { useTheme } from '@/contexts/ThemeContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

const windowWidth = Dimensions.get('window').width;

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birth_date: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
  });
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGenderPickerVisible, setGenderPickerVisibility] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        router.replace('/(tabs)');
      }
    };
    checkLoggedIn();
  }, []);

  const genderOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' },
  ];

  const handleRegister = async () => {
    try {
      // Cria o usuário
      const user = await authApi.register({
        ...formData,
        gender: formData.gender as 'M' | 'F' | 'O',
        height_cm: Number(formData.height_cm),
        weight_kg: Number(formData.weight_kg),
      });

      // Cria preferências padrão para o usuário recém-criado
      try {
        await preferencesApi.create({
          user: user.id,
          daily_step_goal: 10000,
          daily_calorie_goal: 2000,
          preferred_units: 'metric',
          notifications_enabled: true,
        });
      } catch (prefErr) {
        // Não bloqueia o cadastro se falhar, mas loga
        console.error('Falha ao criar preferências iniciais:', prefErr);
      }

      router.replace('/login');
    } catch (err) {
      setError('Falha no cadastro. Por favor, tente novamente.');
    }
  };


  // Formata a data para exibir no mobile
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    return dayjs(dateStr).format('DD/MM/YYYY');
  };

  // Handle data selecionada no mobile
  const handleConfirmDate = (date: Date) => {
    const isoDate = dayjs(date).format('YYYY-MM-DD'); // formato correto p/ web input também
    setFormData({ ...formData, birth_date: isoDate });
    setDatePickerVisibility(false);
  };

  const handleGenderSelect = (value: string) => {
    setFormData({ ...formData, gender: value });
    setGenderPickerVisibility(false);
  };

  const getGenderLabel = () => {
    const option = genderOptions.find(opt => opt.value === formData.gender);
    return option ? option.label : 'Selecione seu gênero';
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Crie sua conta</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Junte-se ao ZenMotion e comece sua jornada de bem-estar
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
          placeholder="Nome Completo"
          placeholderTextColor={colors.text.secondary}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
          placeholder="Email"
          placeholderTextColor={colors.text.secondary}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
          placeholder="Senha"
          placeholderTextColor={colors.text.secondary}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        {/* Campo Data de Nascimento */}
        {Platform.OS === 'web' ? (
          <input
            type="date"
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text.primary,
              fontSize: 16,
              fontFamily: 'Inter_400Regular',
              marginBottom: 16,
            }}
            placeholder="Data de nascimento"
            value={formData.birth_date}
            max={dayjs().format('YYYY-MM-DD')}
            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)}
              style={[styles.input, { justifyContent: 'center', backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={{ color: formData.birth_date ? colors.text.primary : colors.text.secondary, fontSize: 16 }}>
                {formData.birth_date ? formatDisplayDate(formData.birth_date) : 'Data de nascimento'}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisibility(false)}
              headerTextIOS="Selecione a data de nascimento"
              locale="pt_BR"
            />
          </>
        )}

        {/* Campo Gênero */}
        <TouchableOpacity
          onPress={() => setGenderPickerVisibility(true)}
          style={[styles.input, { justifyContent: 'center', backgroundColor: colors.surface, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={{ color: formData.gender ? colors.text.primary : colors.text.secondary, fontSize: 16 }}>
            {getGenderLabel()}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={isGenderPickerVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setGenderPickerVisibility(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setGenderPickerVisibility(false)}
          >
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                Selecione seu gênero
              </Text>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.modalOption,
                    { borderBottomColor: colors.border },
                    formData.gender === option.value && { backgroundColor: colors.primary + '20' },
                  ]}
                  onPress={() => handleGenderSelect(option.value)}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: colors.text.primary },
                      formData.gender === option.value && { color: colors.primary, fontWeight: '600' },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.modalCancel, { backgroundColor: colors.border }]}
                onPress={() => setGenderPickerVisibility(false)}
              >
                <Text style={[styles.modalCancelText, { color: colors.text.primary }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Altura e Peso */}
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Altura (cm)"
              placeholderTextColor={colors.text.secondary}
              value={formData.height_cm}
              onChangeText={(text) => setFormData({ ...formData, height_cm: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Peso (kg)"
              placeholderTextColor={colors.text.secondary}
              value={formData.weight_kg}
              onChangeText={(text) => setFormData({ ...formData, weight_kg: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Botão Criar Conta */}
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        <Link href="/login" style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Já tem uma conta? Faça login</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: windowWidth,
    height: '100%',
    opacity: 0.1,
  },
  content: {
    padding: 20,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 12,
    marginHorizontal: 40,
    paddingVertical: 20,
    minWidth: 280,
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  modalCancel: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputHalf: {
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
    width: '100%',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  link: {
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
});
