import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorSectionProps {
  message: string;
  onRetry: () => void;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto text-center pt-8">
      <div className="flex justify-center mb-6">
        <AlertCircle size={64} className="text-orange-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-3">Oops! Something went wrong</h2>
      
      <p className="text-gray-600 mb-8">
        {message}
      </p>
      
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    </div>
  );
};

export default ErrorSection;