import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';
import { mealApi } from '@/api/api';

type NutritionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: {
    id?: number;
    meal_type: string;
    food_items: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
};

export default function NutritionModal({ isVisible, onClose, onSave, initialData }: NutritionModalProps) {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    meal_type: initialData?.meal_type || '',
    food_items: initialData?.food_items || '',
    calories: initialData?.calories?.toString() || '',
    carbs: initialData?.carbs?.toString() || '',
    protein: initialData?.protein?.toString() || '',
    fat: initialData?.fat?.toString() || '',
  });

  const handleSave = async () => {
    try {
      const data = {
        user: 1, // Replace with actual user ID
        meal_type: formData.meal_type,
        food_items: formData.food_items,
        calories: parseInt(formData.calories),
        carbs: parseInt(formData.carbs),
        protein: parseInt(formData.protein),
        fat: parseInt(formData.fat),
      };

      if (initialData?.id) {
        await mealApi.update(initialData.id, data);
      } else {
        await mealApi.create(data);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save meal:', error);
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
              {initialData ? 'Edit Meal' : 'Add Meal'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Meal Type (e.g., Breakfast, Lunch)"
            placeholderTextColor={colors.text.secondary}
            value={formData.meal_type}
            onChangeText={(text) => setFormData({ ...formData, meal_type: text })}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
            placeholder="Food Items"
            placeholderTextColor={colors.text.secondary}
            value={formData.food_items}
            onChangeText={(text) => setFormData({ ...formData, food_items: text })}
            multiline
          />

          <View style={styles.macroInputs}>
            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Calories"
              placeholderTextColor={colors.text.secondary}
              value={formData.calories}
              onChangeText={(text) => setFormData({ ...formData, calories: text })}
              keyboardType="numeric"
            />

            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Carbs (g)"
              placeholderTextColor={colors.text.secondary}
              value={formData.carbs}
              onChangeText={(text) => setFormData({ ...formData, carbs: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.macroInputs}>
            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Protein (g)"
              placeholderTextColor={colors.text.secondary}
              value={formData.protein}
              onChangeText={(text) => setFormData({ ...formData, protein: text })}
              keyboardType="numeric"
            />

            <TextInput
              style={[styles.inputHalf, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text.primary }]}
              placeholder="Fat (g)"
              placeholderTextColor={colors.text.secondary}
              value={formData.fat}
              onChangeText={(text) => setFormData({ ...formData, fat: text })}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Meal</Text>
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
  macroInputs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
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