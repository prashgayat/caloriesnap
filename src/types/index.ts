export type AppState = 
  | 'landing' 
  | 'auth'
  | 'capture' 
  | 'preview' 
  | 'loading' 
  | 'results' 
  | 'error'
  | 'multipleOptions';

export interface FoodData {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ApiResult {
  description: string;
  confidence: number;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
}

export interface FoodHistoryItem {
  id: string;
  food_name: string;
  created_at: string;
}