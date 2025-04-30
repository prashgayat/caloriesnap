import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';

interface LandingSectionProps {
  onGetStarted: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-3xl mx-auto pt-12 pb-20 px-4 text-center">
      <div className="flex justify-center mb-8">
        <Camera size={64} className="text-green-500" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Snap • Identify • Track
      </h1>
      
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Instantly identify any food and get accurate calories and macronutrients with a simple photo.
      </p>
      
      <button
        onClick={onGetStarted}
        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Get Started
        <ArrowRight size={20} />
      </button>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-green-500 font-bold text-lg mb-2">Quick</div>
          <p className="text-gray-600">Results in seconds, no account needed</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-green-500 font-bold text-lg mb-2">Private</div>
          <p className="text-gray-600">Photos are never stored or shared</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-green-500 font-bold text-lg mb-2">Accurate</div>
          <p className="text-gray-600">Powered by advanced AI recognition</p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;