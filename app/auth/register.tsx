import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Lock, User, Calendar, Ruler, Scale } from 'lucide-react-native';

export default function RegisterScreen() {
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

  const handleRegister = async () => {
    try {
      setError('');
      await register({
        ...formData,
        height_cm: parseInt(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
      });
    } catch (err) {
      setError('Registro falhou. Verifique seus dados.');
    }
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
          <View style={styles.inputContainer}>
            <User size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Nome completo"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Email"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Senha"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Calendar size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Data de nascimento (YYYY-MM-DD)"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.birth_date}
              onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
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

          <View style={styles.inputContainer}>
            <Ruler size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Altura (cm)"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.height_cm}
              onChangeText={(text) => setFormData({ ...formData, height_cm: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Scale size={20} color={isDark ? '#94a3b8' : '#64748b'} />
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Peso (kg)"
              placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
              value={formData.weight_kg}
              onChangeText={(text) => setFormData({ ...formData, weight_kg: text })}
              keyboardType="numeric"
            />
          </View>

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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1e293b',
  },
  inputDark: {
    color: '#fff',
    backgroundColor: '#2a2a2a',
  },
  genderContainer: {
    gap: 8,
  },
  genderLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
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
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  genderButtonDark: {
    backgroundColor: '#2a2a2a',
  },
  genderButtonActive: {
    backgroundColor: '#6366f1',
  },
  genderButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748b',
  },
  genderButtonTextDark: {
    color: '#94a3b8',
  },
  genderButtonTextActive: {
    color: '#ffffff',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  registerButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
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