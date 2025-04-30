// src/utils/consumptionRisk.ts

interface RiskInfo {
    level: 'low' | 'moderate' | 'high';
    message: string;
  }
  
  export function getConsumptionRisk(
    calories: number,
    sugar: number,
    fat: number,
    foodName: string
  ): RiskInfo {
    const name = foodName.toLowerCase();
    const isProcessed = ['samosa', 'chips', 'soda', 'chocolate bar', 'pizza'].includes(name);
  
    if (calories > 400 || sugar > 20 || fat > 20 || isProcessed) {
      return {
        level: 'high',
        message: '⚠️ High risk if consumed frequently due to high calories or processed nature.',
      };
    } else if (calories > 250 || sugar > 10 || fat > 10) {
      return {
        level: 'moderate',
        message: '⚠️ Moderate risk — best consumed occasionally.',
      };
    } else {
      return {
        level: 'low',
        message: '✅ Safe for regular consumption.',
      };
    }
  }
  