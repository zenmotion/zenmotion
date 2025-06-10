import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';
import { goalApi } from '@/api/api';

type GoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function GoalModal({ isVisible, onClose, onSave }: GoalModalProps) {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    goal_type: '',
    target_value: '',
    current_value: '',
    deadline: '',
  });

  const handleSave = async () => {
    try {
      const data = {
        user: 1, // Substituir pelo ID do usuário atual
        goal_type: formData.goal_type,
        target_value: parseFloat(formData.target_value),
        current_value: parseFloat(formData.current_value),
        deadline: formData.deadline,
        is_completed: false,
      };

      await goalApi.create(data);
      onSave();
      onClose();
      
      // Limpar formulário
      setFormData({
        goal_type: '',
        target_value: '',
        current_value: '',
        deadline: '',
      });
    } catch (error) {
      console.error('Falha ao salvar meta:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.card.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
              Definir Nova Meta
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Tipo de Meta (ex: Peso, Passos, Calorias)"
            placeholderTextColor={colors.text.secondary}
            value={formData.goal_type}
            onChangeText={(text) => setFormData({ ...formData, goal_type: text })}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Valor Alvo"
            placeholderTextColor={colors.text.secondary}
            value={formData.target_value}
            onChangeText={(text) => setFormData({ ...formData, target_value: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Valor Atual"
            placeholderTextColor={colors.text.secondary}
            value={formData.current_value}
            onChangeText={(text) => setFormData({ ...formData, current_value: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Data Limite (AAAA-MM-DD)"
            placeholderTextColor={colors.text.secondary}
            value={formData.deadline}
            onChangeText={(text) => setFormData({ ...formData, deadline: text })}
          />

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Meta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  saveButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});