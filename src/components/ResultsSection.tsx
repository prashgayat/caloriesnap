import React from 'react';
import { Camera } from 'lucide-react';
import { FoodData } from '../types';
import { getBurnTimeForAllActivities } from '../utils/burnCalculator';
import { getHealthyTip } from '../utils/healthySubstitute';
import { getConsumptionRisk } from '../utils/consumptionRisk';

interface ResultsSectionProps {
  foodData: FoodData;
  onNewPhoto: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ foodData, onNewPhoto }) => {
  const totalCalories = foodData.calories || 0;
  const proteinPercentage = totalCalories > 0 ? ((foodData.protein * 4) / totalCalories) * 100 : 0;
  const carbsPercentage = totalCalories > 0 ? ((foodData.carbs * 4) / totalCalories) * 100 : 0;
  const fatPercentage = totalCalories > 0 ? ((foodData.fat * 9) / totalCalories) * 100 : 0;
  const burnTimes = getBurnTimeForAllActivities(totalCalories);
  const healthyTip = getHealthyTip(foodData.name);
  const risk = getConsumptionRisk(totalCalories, foodData.sugar || 0, foodData.fat, foodData.name);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Results</h2>
        <button
          onClick={onNewPhoto}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Camera size={16} />
          <span>New Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identification */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-1">Identified as</h3>
          <div className="text-2xl font-bold text-gray-800 mb-2 capitalize">
            {foodData.name}
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(foodData.confidence * 100)}% confidence
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-3">Nutrition (per 100g)</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">
            {totalCalories} kcal
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Protein</span>
                <span>{foodData.protein}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Carbs</span>
                <span>{foodData.carbs}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${Math.min(carbsPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Fat</span>
                <span>{foodData.fat}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${Math.min(fatPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Burn Time */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-3">Time to Burn This</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {burnTimes.map((item) => (
              <li key={item.activity}>{item.label}</li>
            ))}
          </ul>
        </div>

        {/* Healthy Substitute */}
        {healthyTip && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-3 text-green-700">Healthy Substitute / Modification</h3>
            <p className="text-sm text-gray-800">{healthyTip}</p>
          </div>
        )}

        {/* Excess Consumption Warning */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <h3 className="text-lg font-medium mb-2 text-yellow-700">Consumption Warning</h3>
          <p className="text-sm text-gray-800">{risk.message}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-100">
        <h3 className="font-medium text-green-800 mb-2">Your Food Analysis</h3>
        <p className="text-green-700">
          {foodData.name} is {totalCalories < 150 ? 'a low' : totalCalories < 300 ? 'a moderate' : 'a high'} calorie food with {foodData.protein}g of protein per 100g.
          {foodData.protein > 15 ? ' It\'s a good source of protein!' : ''}
          {foodData.carbs > 30 ? ' It\'s relatively high in carbohydrates.' : ''}
          {foodData.fat > 15 ? ' It contains significant amounts of fat.' : ''}
        </p>
      </div>
    </div>
  );
};

export default ResultsSection;
