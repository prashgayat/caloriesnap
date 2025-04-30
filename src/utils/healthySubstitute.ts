// src/utils/healthySubstitute.ts

const SUBSTITUTE_MAP: Record<string, string> = {
    "chocolate bar": "Try dark chocolate (>70%) or protein bars with no added sugar.",
    "samosa": "Try air-fried samosas or use whole wheat wrap with baked filling.",
    "pizza": "Use thin whole wheat crust, add veggies, and avoid processed meats.",
    "chips": "Try roasted chickpeas, air-popped popcorn, or baked veggie crisps.",
    "soda": "Replace with sparkling water, lemon water, or coconut water.",
    "white bread": "Switch to multigrain or whole wheat bread for more fiber.",
    "ice cream": "Try Greek yogurt with berries or frozen banana 'nice cream'."
  };
  
  export function getHealthyTip(foodName: string): string | null {
    const key = foodName.toLowerCase().trim();
    return SUBSTITUTE_MAP[key] || null;
  }
  