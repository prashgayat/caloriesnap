import { ApiResult } from '../types';

const GOOGLE_API_KEY = 'AIzaSyD-kT-PwcQFbwK7SHnPUMQcDAFaihyRbbM';
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

export const analyzeImage = async (imageDataUrl: string): Promise<ApiResult[]> => {
  try {
    // Remove the data URL prefix
    const base64Image = imageDataUrl.split(',')[1];
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 10
            },
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 5
            },
            {
              type: 'WEB_DETECTION',
              maxResults: 5
            }
          ]
        }
      ]
    };
    
    const response = await fetch(`${VISION_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and filter food-related labels
    let results: ApiResult[] = [];
    
    // First check object localization for food items
    if (data.responses[0].localizedObjectAnnotations) {
      const foodObjects = data.responses[0].localizedObjectAnnotations
        .filter((obj: any) => {
          const name = obj.name.toLowerCase();
          return name === 'food' || 
                 name === 'fruit' || 
                 name === 'vegetable' || 
                 name === 'dessert' ||
                 name === 'bread' ||
                 name === 'meal' ||
                 name === 'dish';
        })
        .map((obj: any) => ({
          description: obj.name,
          confidence: obj.score
        }));
      
      results = [...foodObjects];
    }
    
    // Then check web detection results
    if (data.responses[0].webDetection) {
      const webEntities = data.responses[0].webDetection.webEntities || [];
      const foodEntities = webEntities
        .filter((entity: any) => entity.score > 0.5)
        .map((entity: any) => ({
          description: entity.description,
          confidence: entity.score
        }));
      
      results = [...results, ...foodEntities];
    }
    
    // Then check labels
    if (data.responses[0].labelAnnotations) {
      // Expanded food categories and descriptors
      const foodKeywords = [
        // Meals and courses
        'food', 'dish', 'cuisine', 'meal', 'breakfast', 'lunch', 'dinner',
        'appetizer', 'snack', 'dessert', 'side dish', 'main course',
        
        // Food categories
        'fruit', 'vegetable', 'meat', 'seafood', 'dairy', 'grain',
        'bread', 'pasta', 'rice', 'noodle', 'soup', 'salad', 'sandwich',
        
        // Specific dishes
        'pizza', 'burger', 'steak', 'chicken', 'fish', 'pork', 'beef',
        'cake', 'cookie', 'pie', 'pastry', 'donut', 'muffin',
        
        // Beverages
        'drink', 'beverage', 'coffee', 'tea', 'juice', 'smoothie',
        
        // Cooking methods
        'grilled', 'baked', 'fried', 'roasted', 'steamed', 'sautéed',
        
        // Cuisines
        'italian', 'chinese', 'japanese', 'mexican', 'indian', 'thai',
        'mediterranean', 'french', 'american',
        
        // Common ingredients
        'cheese', 'egg', 'milk', 'yogurt', 'butter', 'cream',
        'chocolate', 'sugar', 'honey', 'sauce', 'spice', 'herb'
      ];
      
      const foodLabels = data.responses[0].labelAnnotations
        .filter((label: any) => {
          const description = label.description.toLowerCase();
          // Check if the label matches food keywords
          const isFood = foodKeywords.some(keyword => 
            description.includes(keyword) || keyword.includes(description)
          );
          
          // Check for compound food terms (e.g., "chicken curry", "fruit salad")
          const words = description.split(' ');
          const hasMultipleFoodWords = words.length <= 3 && 
            words.filter(word => 
              foodKeywords.some(keyword => keyword.includes(word))
            ).length >= 1;
          
          return (isFood || hasMultipleFoodWords) && label.score > 0.6;
        })
        .map((label: any) => ({
          description: label.description,
          confidence: label.score
        }));
      
      // Combine results, removing duplicates and prioritizing by confidence
      const combined = [...results, ...foodLabels];
      const uniqueResults = combined.reduce((acc: ApiResult[], current) => {
        const existing = acc.find(item => 
          item.description.toLowerCase() === current.description.toLowerCase()
        );
        
        if (!existing) {
          acc.push(current);
        } else if (current.confidence > existing.confidence) {
          existing.confidence = current.confidence;
        }
        
        return acc;
      }, []);
      
      // Sort by confidence (highest first) and filter out generic terms
      results = uniqueResults
        .filter(result => {
          const description = result.description.toLowerCase();
          return !['food', 'dish', 'meal', 'cuisine'].includes(description);
        })
        .sort((a, b) => b.confidence - a.confidence);
    }
    
    return results;
  } catch (error) {
    console.error('Error analyzing image with Vision API:', error);
    throw error;
  }
};