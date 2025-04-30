import React from 'react';
import { RefreshCw } from 'lucide-react';

interface PreviewSectionProps {
  imageUrl: string;
  onAnalyze: () => void;
  onRetake: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  imageUrl,
  onAnalyze,
  onRetake,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Preview & Confirm</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="Selected food photo" 
            className="w-full h-60 object-cover"
          />
          <button
            onClick={onRetake}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:shadow-md transition-shadow"
            aria-label="Retake or replace photo"
          >
            <RefreshCw size={18} className="text-gray-700" />
          </button>
        </div>
        
        <div className="p-4">
          <button
            onClick={onAnalyze}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Analyze Food
          </button>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500">
        Photos are processed securely; no copies are stored.
      </p>
    </div>
  );
};

export default PreviewSection;