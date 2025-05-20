import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.example.com'; // Replace with your API URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await api.post('/refresh/', { refresh: refreshToken });
        const { access } = response.data;

        await AsyncStorage.setItem('accessToken', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;

        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // Redirect to login
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login/', { email, password });
    return response.data;
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    birth_date: string;
    gender: 'M' | 'F' | 'O';
    height_cm: number;
    weight_kg: number;
  }) => {
    const response = await api.post('/user/', userData);
    return response.data;
  },
  logout: async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    await api.post('/logout/', { refresh: refreshToken });
  },
  getProfile: async () => {
    const response = await api.get('/user/');
    return response.data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get('/user/');
    return response.data;
  },
  updateProfile: async (userId: number, userData: Partial<{
    name: string;
    email: string;
    birth_date: string;
    gender: 'M' | 'F' | 'O';
    height_cm: number;
    weight_kg: number;
  }>) => {
    const response = await api.patch(`/user/id/${userId}`, userData);
    return response.data;
  },
};

export const workoutApi = {
  getWorkouts: async () => {
    const response = await api.get('/workout/');
    return response.data;
  },
  createWorkout: async (workoutData: {
    type: string;
    duration_minutes: number;
    calories_burned: number;
  }) => {
    const response = await api.post('/workout/', workoutData);
    return response.data;
  },
};

export const mealApi = {
  getMeals: async () => {
    const response = await api.get('/meal/');
    return response.data;
  },
  createMeal: async (mealData: {
    meal_type: string;
    food_items: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }) => {
    const response = await api.post('/meal/', mealData);
    return response.data;
  },
};

export const goalApi = {
  getGoals: async () => {
    const response = await api.get('/goal/');
    return response.data;
  },
  createGoal: async (goalData: {
    goal_type: string;
    target_value: number;
    current_value: number;
    deadline: string;
  }) => {
    const response = await api.post('/goal/', goalData);
    return response.data;
  },
};