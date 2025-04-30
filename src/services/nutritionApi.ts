import { NutritionData } from '../types';

// This function would typically call an actual nutrition API
// For this MVP, we're using a simplified approach with a mock database
export const getNutritionData = async (foodName: string): Promise<NutritionData> => {
  try {
    // First, try to get data from an open nutrition API
    // For this demo, we'll use a mock implementation
    // In a real app, you would use an API like:
    // - USDA FoodData Central
    // - Nutritionix
    // - Edamam
    
    const normalizedFoodName = foodName.toLowerCase().trim();
    
    // Simple food database with nutrition values per 100g
    const foodDatabase: Record<string, NutritionData> = {
      'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
      'banana': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
      'orange': { calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1 },
      'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      'beef': { calories: 250, protein: 26, carbs: 0, fat: 17 },
      'fish': { calories: 206, protein: 22, carbs: 0, fat: 12 },
      'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13 },
      'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
      'pasta': { calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
      'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
      'pizza': { calories: 266, protein: 11, carbs: 33, fat: 10 },
      'burger': { calories: 295, protein: 17, carbs: 30, fat: 14 },
      'salad': { calories: 33, protein: 1.2, carbs: 6, fat: 0.4 },
      'cake': { calories: 257, protein: 4, carbs: 38, fat: 10 },
      'cookie': { calories: 488, protein: 5, carbs: 64, fat: 24 },
      'ice cream': { calories: 207, protein: 3.5, carbs: 24, fat: 11 },
      'chocolate': { calories: 546, protein: 4.9, carbs: 61, fat: 31 },
      'coffee': { calories: 2, protein: 0.1, carbs: 0, fat: 0 },
      'tea': { calories: 1, protein: 0, carbs: 0.2, fat: 0 },
      'soda': { calories: 41, protein: 0, carbs: 10.6, fat: 0 },
      'water': { calories: 0, protein: 0, carbs: 0, fat: 0 },
      'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
      'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33 },
      'yogurt': { calories: 59, protein: 3.5, carbs: 5, fat: 3.3 },
      'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1 },
      'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
      'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
      'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
      'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
      'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
      'avocado': { calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
      'nuts': { calories: 607, protein: 21, carbs: 20, fat: 54 },
      'peanut butter': { calories: 588, protein: 25, carbs: 20, fat: 50 },
      'honey': { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
      'sugar': { calories: 387, protein: 0, carbs: 100, fat: 0 },
      'oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
      'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
      'french fries': { calories: 312, protein: 3.4, carbs: 41, fat: 15 },
      'hamburger': { calories: 295, protein: 17, carbs: 30, fat: 14 },
      'hot dog': { calories: 290, protein: 10, carbs: 31, fat: 15 },
      'sandwich': { calories: 258, protein: 10, carbs: 35, fat: 10 },
      'taco': { calories: 210, protein: 9, carbs: 21, fat: 10 },
      'burrito': { calories: 206, protein: 8, carbs: 27, fat: 8 },
      'sushi': { calories: 150, protein: 6, carbs: 30, fat: 0.7 },
    };
    
    // First, try direct match
    if (normalizedFoodName in foodDatabase) {
      return foodDatabase[normalizedFoodName];
    }
    
    // Try to find a partial match
    for (const [key, value] of Object.entries(foodDatabase)) {
      if (normalizedFoodName.includes(key) || key.includes(normalizedFoodName)) {
        return value;
      }
    }
    
    // If no match is found, return a generic estimate based on food categories
    if (normalizedFoodName.includes('fruit') || 
        normalizedFoodName.includes('berry') || 
        normalizedFoodName.includes('apple') || 
        normalizedFoodName.includes('orange')) {
      return { calories: 60, protein: 0.8, carbs: 15, fat: 0.2 };
    } else if (normalizedFoodName.includes('vegetable') || 
              normalizedFoodName.includes('salad') || 
              normalizedFoodName.includes('greens')) {
      return { calories: 30, protein: 2, carbs: 6, fat: 0.3 };
    } else if (normalizedFoodName.includes('meat') || 
              normalizedFoodName.includes('chicken') || 
              normalizedFoodName.includes('beef') || 
              normalizedFoodName.includes('pork')) {
      return { calories: 200, protein: 25, carbs: 0, fat: 10 };
    } else if (normalizedFoodName.includes('fish') || 
              normalizedFoodName.includes('seafood') || 
              normalizedFoodName.includes('shrimp')) {
      return { calories: 180, protein: 20, carbs: 0, fat: 10 };
    } else if (normalizedFoodName.includes('dessert') || 
              normalizedFoodName.includes('cake') || 
              normalizedFoodName.includes('ice cream')) {
      return { calories: 300, protein: 4, carbs: 40, fat: 15 };
    } else if (normalizedFoodName.includes('fast food') || 
              normalizedFoodName.includes('burger') || 
              normalizedFoodName.includes('pizza')) {
      return { calories: 300, protein: 12, carbs: 35, fat: 15 };
    }
    
    // Default fallback
    return { calories: 150, protein: 5, carbs: 15, fat: 7 };
  } catch (error) {
    console.error('Error getting nutrition data:', error);
    // Return a default fallback if the API fails
    return { calories: 150, protein: 5, carbs: 15, fat: 7 };
  }
};