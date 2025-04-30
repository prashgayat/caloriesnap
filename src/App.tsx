import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingSection from './components/LandingSection';
import AuthSection from './components/AuthSection';
import CaptureSection from './components/CaptureSection';
import PreviewSection from './components/PreviewSection';
import LoadingSection from './components/LoadingSection';
import ResultsSection from './components/ResultsSection';
import ErrorSection from './components/ErrorSection';
import FoodHistory from './components/FoodHistory';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppState, FoodData, ApiResult, User, FoodHistoryItem } from './types';
import { analyzeImage } from './services/visionApi';
import { getNutritionData } from './services/nutritionApi';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [apiResults, setApiResults] = useState<ApiResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [foodHistory, setFoodHistory] = useState<FoodHistoryItem[]>([]);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          emailVerified: session.user.email_confirmed_at !== null
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          emailVerified: session.user.email_confirmed_at !== null
        });
      } else {
        setUser(null);
        setAppState('landing');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      loadFoodHistory();
    }
  }, [user]);

  const loadFoodHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('food_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setFoodHistory(data || []);
    } catch (err) {
      console.error('Error loading food history:', err);
    }
  };

  const saveFoodHistory = async (foodName: string) => {
    if (!user?.id) return;

    try {
      // Insert new record
      const { error: insertError } = await supabase
        .from('food_history')
        .insert([{ user_id: user.id, food_name: foodName }]);

      if (insertError) throw insertError;

      // Reload history
      await loadFoodHistory();
    } catch (err) {
      console.error('Error saving food history:', err);
    }
  };

  const handleImageSelect = (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    setAppState('preview');
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    
    setAppState('loading');
    setError(null);
    
    try {
      const results = await analyzeImage(selectedImage);
      setApiResults(results);
      
      if (results.length === 0) {
        setError("We couldn't identify any food in this image. Try another photo with better lighting or angle.");
        setAppState('error');
        return;
      }
      
      const highConfidenceResult = results.find(result => result.confidence >= 0.7);
      
      if (highConfidenceResult) {
        const nutrition = await getNutritionData(highConfidenceResult.description);
        const foodData = {
          name: highConfidenceResult.description,
          confidence: highConfidenceResult.confidence,
          ...nutrition
        };
        setFoodData(foodData);
        await saveFoodHistory(highConfidenceResult.description);
        setAppState('results');
      } else if (results.length > 0) {
        setAppState('multipleOptions');
      } else {
        setError("We couldn't identify the food with high confidence. Try another photo.");
        setAppState('error');
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError("Something went wrong. Please try again.");
      setAppState('error');
    }
  };

  const handleSelectFood = async (foodName: string) => {
    setAppState('loading');
    try {
      const nutrition = await getNutritionData(foodName);
      const selectedResult = apiResults.find(result => result.description === foodName);
      
      const foodData = {
        name: foodName,
        confidence: selectedResult?.confidence || 0,
        ...nutrition
      };
      setFoodData(foodData);
      await saveFoodHistory(foodName);
      setAppState('results');
    } catch (err) {
      console.error('Error getting nutrition:', err);
      setError("Something went wrong. Please try again.");
      setAppState('error');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAppState('landing');
  };

  const resetApp = () => {
    setSelectedImage(null);
    setFoodData(null);
    setApiResults([]);
    setError(null);
    setAppState(user ? 'capture' : 'landing');
  };

  const handleRetry = () => {
    setSelectedImage(null);
    setAppState('capture');
  };

  const handleAuthSuccess = () => {
    setAppState('capture');
  };

  const renderContent = () => {
    if (!user && appState !== 'landing') {
      return <AuthSection onAuthSuccess={handleAuthSuccess} />;
    }

    switch (appState) {
      case 'landing':
        return (
          <LandingSection 
            onGetStarted={() => setAppState(user ? 'capture' : 'auth')} 
          />
        );
      case 'capture':
        return (
          <>
            <CaptureSection onImageSelect={handleImageSelect} />
            <FoodHistory history={foodHistory} />
          </>
        );
      case 'preview':
        return (
          <PreviewSection 
            imageUrl={selectedImage || ''} 
            onAnalyze={handleAnalyzeImage}
            onRetake={handleRetry}
          />
        );
      case 'loading':
        return <LoadingSection />;
      case 'multipleOptions':
        return (
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">We found multiple possibilities</h2>
            <p className="mb-6">Please select the correct food item:</p>
            <div className="space-y-3">
              {apiResults.slice(0, 3).map((result, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-white rounded-lg shadow hover:shadow-md border-2 border-transparent hover:border-green-500 transition-all"
                  onClick={() => handleSelectFood(result.description)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{result.description}</span>
                    <span className="text-sm text-gray-500">
                      {Math.round(result.confidence * 100)}% sure
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <button
              className="mt-6 w-full py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={handleRetry}
            >
              Try again with a new photo
            </button>
          </div>
        );
      case 'results':
        return foodData && (
          <ResultsSection 
            foodData={foodData} 
            onNewPhoto={() => setAppState('capture')} 
          />
        );
      case 'error':
        return (
          <ErrorSection 
            message={error || "Something went wrong"} 
            onRetry={handleRetry} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        resetApp={resetApp} 
        user={user} 
        onSignOut={handleSignOut}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;