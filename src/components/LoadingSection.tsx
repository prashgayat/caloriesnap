import React from 'react';

const LoadingSection: React.FC = () => {
  const loadingMessages = [
    "Counting your calories...",
    "Analyzing your plate...",
    "Identifying ingredients...",
    "Calculating macros...",
    "Almost there..."
  ];
  
  const [messageIndex, setMessageIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-12">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
      
      <p className="text-lg font-medium text-gray-700 text-center animate-pulse">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingSection;