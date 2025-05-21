import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Mail, Lock, User, Calendar, Ruler, Scale } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { register } = useAuth();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birth_date: '',
    gender: 'M' as 'M' | 'F' | 'O',
    height_cm: '',
    weight_kg: '',
  });
  const [error, setError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleRegister = async () => {
    try {
      setError('');
      setHeightError('');
      setWeightError('');

      if (!formData.height_cm || isNaN(Number(formData.height_cm)) || Number(formData.height_cm) < 50 || Number(formData.height_cm) > 250) {
        setHeightError('Altura inválida. Informe um valor entre 50 e 250 cm.');
        return;
      }

      if (!formData.weight_kg || isNaN(Number(formData.weight_kg)) || Number(formData.weight_kg) < 10 || Number(formData.weight_kg) > 300) {
        setWeightError('Peso inválido. Informe um valor entre 10 e 300 kg.');
        return;
      }

      await register({
        ...formData,
        height_cm: parseInt(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
      });
    } catch (err) {
      setError('Registro falhou. Verifique seus dados.');
    }
  };


const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
  if (event.type === 'dismissed') {
    setShowDatePicker(false);
    return;
  }

  const currentDate = selectedDate || formData.birth_date;
  setShowDatePicker(false);
  setSelectedDate(currentDate);
  setFormData({
    ...formData,
    birth_date: currentDate.toISOString().split('T')[0], // formato: 'YYYY-MM-DD'
  });
};

  const handleHeightChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setFormData({ ...formData, height_cm: cleanText });
  };

  const handleWeightChange = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setFormData({ ...formData, weight_kg: cleanText });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Criar Conta</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Comece sua jornada fitness hoje
          </Text>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'name' && styles.inputContainerFocused,
            ]}
          >
            <User size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Nome completo"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.name}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'email' && styles.inputContainerFocused,
            ]}
          >
            <Mail size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Email"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              keyboardType="email-address"
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'password' && styles.inputContainerFocused,
            ]}
          >
            <Lock size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Senha"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'birth_date' && styles.inputContainerFocused,
            ]}
          >
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Calendar size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Data de nascimento"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.birth_date}
              onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
              onFocus={() => setFocusedInput('birth_date')}
            />         
          </View>

          <View style={styles.genderContainer}>
            <Text style={[styles.genderLabel, isDark && styles.genderLabelDark]}>Gênero</Text>
            <View style={styles.genderButtons}>
              {[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Feminino' },
                { value: 'O', label: 'Outro' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderButton,
                    isDark && styles.genderButtonDark,
                    formData.gender === option.value && styles.genderButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, gender: option.value as 'M' | 'F' | 'O' })}
                >
                  <Text
                    style={[
                      styles.genderButtonText,
                      isDark && styles.genderButtonTextDark,
                      formData.gender === option.value && styles.genderButtonTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'height' && styles.inputContainerFocused,
            ]}
          >
            <Ruler size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Altura (cm)"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.height_cm}
              onFocus={() => setFocusedInput('height_cm')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={handleHeightChange}
              keyboardType="numeric"
            />
          </View>
          {heightError ? <Text style={styles.errorText}>{heightError}</Text> : null}

          <View
            style={[
              styles.inputContainer,
              isDark && styles.inputContainerDark,
              focusedInput === 'weight' && styles.inputContainerFocused,
            ]}
          >
            <Scale size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Peso (kg)"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.weight_kg}
              onFocus={() => setFocusedInput('weight_kg')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={handleWeightChange}
              keyboardType="numeric"
            />
          </View>
          {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, isDark && styles.loginTextDark]}>
              Já tem uma conta?{' '}
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Entrar</Text>
              </TouchableOpacity>
            </Link>
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
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  form: {
    gap: 12,
  },

  // ===== INPUT CONTAINERS =====
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputContainerDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#334155',
  },
  inputContainerFocused: {
    borderColor: '#6366f1',
  },

  // ===== INPUTS =====
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
    backgroundColor: 'transparent',
  },
  inputDark: {
    color: '#ffffff',
  },

  // ===== GÊNERO =====
  genderContainer: {
    marginTop: 12,
  },
  genderLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
    marginBottom: 6,
  },
  genderLabelDark: {
    color: '#94a3b8',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  genderButtonDark: {
    backgroundColor: '#334155',
  },
  genderButtonActive: {
    backgroundColor: '#6366f1',
  },
  genderButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#475569',
  },
  genderButtonTextDark: {
    color: '#cbd5e1',
  },
  genderButtonTextActive: {
    color: '#ffffff',
  },

  errorText: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
  },
  registerButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },

  // ===== LOGIN LINK =====
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  loginTextDark: {
    color: '#94a3b8',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6366f1',
  },
});
