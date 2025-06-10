import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';
import { workoutApi } from '@/api/api';

type ExerciseModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: {
    id?: number;
    type: string;
    duration_minutes: number;
    calories_burned: number;
  };
};

export default function ExerciseModal({ isVisible, onClose, onSave, initialData }: ExerciseModalProps) {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    type: initialData?.type || '',
    duration_minutes: initialData?.duration_minutes?.toString() || '',
    calories_burned: initialData?.calories_burned?.toString() || '',
  });

  const handleSave = async () => {
    try {
      const data = {
        user: 1, // Replace with actual user ID
        type: formData.type,
        duration_minutes: parseInt(formData.duration_minutes),
        calories_burned: parseInt(formData.calories_burned),
      };

      if (initialData?.id) {
        await workoutApi.update(initialData.id, data);
      } else {
        await workoutApi.create(data);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save workout:', error);
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
              {initialData ? 'Edit Workout' : 'Add Workout'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Workout Type (e.g., Running, Cycling)"
            placeholderTextColor={colors.text.secondary}
            value={formData.type}
            onChangeText={(text) => setFormData({ ...formData, type: text })}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Duration (minutes)"
            placeholderTextColor={colors.text.secondary}
            value={formData.duration_minutes}
            onChangeText={(text) => setFormData({ ...formData, duration_minutes: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Calories Burned"
            placeholderTextColor={colors.text.secondary}
            value={formData.calories_burned}
            onChangeText={(text) => setFormData({ ...formData, calories_burned: text })}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Workout</Text>
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