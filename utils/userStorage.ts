import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';

export const userStorage = {
  async getUserId(): Promise<number | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      if (!userData) return null;

      const parsed = JSON.parse(userData);
      return parsed.user_id ?? null;
    } catch (error) {
      console.error('Erro ao buscar user_id do AsyncStorage', error);
      return null;
    }
  }
};