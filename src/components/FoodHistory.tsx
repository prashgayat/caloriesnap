import React from 'react';
import { Clock } from 'lucide-react';
import { FoodHistoryItem } from '../types';

interface FoodHistoryProps {
  history: FoodHistoryItem[];
}

const FoodHistory: React.FC<FoodHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          <h3 className="font-medium text-gray-700">Recent Scans</h3>
        </div>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {history.map((item) => (
          <li key={item.id} className="px-4 py-3">
            <div className="flex justify-between items-center">
              <span className="font-medium capitalize">{item.food_name}</span>
              <span className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodHistory;