import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface StepModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (steps: number) => void;
}

export default function StepModal({ visible, onClose, onSave }: StepModalProps) {
  const { colors } = useTheme();
  const [steps, setSteps] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const num = parseInt(steps);
    if (isNaN(num) || num < 0) {
      setError('Digite um número válido de passos.');
      return;
    }
    setError(null);
    onSave(num);
    setSteps('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.card.background }]}>  
          <Text style={[styles.title, { color: colors.text.primary }]}>Adicionar Passos</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Quantidade de passos"
            placeholderTextColor={colors.text.secondary}
            keyboardType="numeric"
            value={steps}
            onChangeText={setSteps}
          />
          {error && <Text style={{ color: colors.error, marginTop: 8 }}>{error}</Text>}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.border }]} onPress={onClose}>
              <Text style={[styles.buttonText, { color: colors.text.primary }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    padding: 12,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
