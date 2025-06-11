import axios from 'axios';
import { router } from 'expo-router';

// Defina API_BASE_URL no seu .env para apontar para o backend desejado. Exemplo:
// API_BASE_URL=http://localhost:8000/api
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login/', { email, password });
    // Aqui você pode salvar o estado de usuário autenticado, se necessário
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
    const response = await api.post('/user', userData);
    return response.data;
  },
  logout: async () => {
    router.replace('/login');
  }
};

export const userApi = {
  getAll: async () => {
    const response = await api.get('/user');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/user/id/${id}`);
    return response.data;
  },
  update: async (id: number, userData: Partial<{
    name: string;
    email: string;
    birth_date: string;
    gender: 'M' | 'F' | 'O';
    height_cm: number;
    weight_kg: number;
  }>) => {
    const response = await api.patch(`/user/id/${id}`, userData);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/user/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/user/search/?search=${term}`);
    return response.data;
  },
};

export const preferencesApi = {
  getAll: async () => {
    const response = await api.get('/user_preferences');
    return response.data;
  },
  create: async (data: {
    user: number;
    daily_step_goal: number;
    preferred_units: 'metric' | 'imperial';
    notifications_enabled: boolean;
  }) => {
    const response = await api.post('/user_preferences', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/user_preferences/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    daily_step_goal: number;
    preferred_units: 'metric' | 'imperial';
    notifications_enabled: boolean;
  }>) => {
    const response = await api.patch(`/user_preferences/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/user_preferences/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/user_preferences/search/?search=${term}`);
    return response.data;
  },
};

export const goalApi = {
  getAll: async () => {
    const response = await api.get('/goal');
    return response.data;
  },
  create: async (data: {
    user: number;
    goal_type: string;
    target_value: number;
    current_value: number;
    deadline: string;
    is_completed?: boolean;
  }) => {
    const response = await api.post('/goal', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/goal/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    goal_type: string;
    target_value: number;
    current_value: number;
    deadline: string;
    is_completed: boolean;
  }>) => {
    const response = await api.patch(`/goal/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/goal/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/goal/search/?search=${term}`);
    return response.data;
  },
};

export const healthReportApi = {
  getAll: async () => {
    const response = await api.get('/health_report');
    return response.data;
  },
  create: async (data: {
    user: number;
    period_start: string;
    period_end: string;
    average_calories_consumed: number;
    average_calories_burned: number;
    weight_change: number;
    summary_text: string;
  }) => {
    const response = await api.post('/health_report', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/health_report/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    period_start: string;
    period_end: string;
    average_calories_consumed: number;
    average_calories_burned: number;
    weight_change: number;
    summary_text: string;
  }>) => {
    const response = await api.patch(`/health_report/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/health_report/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/health_report/search/?search=${term}`);
    return response.data;
  },
};

export const mealApi = {
  getAll: async () => {
    const response = await api.get('/meal');
    return response.data;
  },
  create: async (data: {
    user: number;
    meal_type: string;
    food_items: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }) => {
    const response = await api.post('/meal', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/meal/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    meal_type: string;
    food_items: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }>) => {
    const response = await api.patch(`/meal/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/meal/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/meal/search/?search=${term}`);
    return response.data;
  },
};

export const notificationApi = {
  getAll: async () => {
    const response = await api.get('/notification/');
    return response.data;
  },
  create: async (data: {
    user: number;
    title: string;
    message: string;
    is_read?: boolean;
  }) => {
    const response = await api.post('/notification', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/notification/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    title: string;
    message: string;
    is_read: boolean;
  }>) => {
    const response = await api.patch(`/notification/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/notification/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/notification/search/?search=${term}`);
    return response.data;
  },
};

export const predictionHistoryApi = {
  getAll: async () => {
    const response = await api.get('/prediction_history');
    return response.data;
  },
  create: async (data: {
    user: number;
    prediction_type: string;
    input_data: Record<string, any>;
    prediction_result: string;
  }) => {
    const response = await api.post('/prediction_history', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/prediction_history/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    prediction_type: string;
    input_data: Record<string, any>;
    prediction_result: string;
  }>) => {
    const response = await api.patch(`/prediction_history/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/prediction_history/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/prediction_history/search/?search=${term}`);
    return response.data;
  },
};

export const stepRecordApi = {
  getAll: async () => {
    const response = await api.get('/step_record');
    return response.data;
  },
  create: async (data: {
    user: number;
    steps: number;
    recorded_at: string;
  }) => {
    const response = await api.post('/step_record', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/step_record/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    steps: number;
    recorded_at: string;
  }>) => {
    const response = await api.patch(`/step_record/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/step_record/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/step_record/search/?search=${term}`);
    return response.data;
  },
};

export const workoutApi = {
  getAll: async () => {
    const response = await api.get('/workout');
    return response.data;
  },
  create: async (data: {
    user: number;
    type: string;
    duration_minutes: number;
    calories_burned: number;
  }) => {
    const response = await api.post('/workout', data);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/workout/id/${id}`);
    return response.data;
  },
  update: async (id: number, data: Partial<{
    type: string;
    duration_minutes: number;
    calories_burned: number;
  }>) => {
    const response = await api.patch(`/workout/id/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/workout/id/${id}`);
  },
  search: async (term: string) => {
    const response = await api.get(`/workout/search/?search=${term}`);
    return response.data;
  },
};