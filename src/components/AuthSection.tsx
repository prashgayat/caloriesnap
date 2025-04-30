import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface AuthSectionProps {
  onAuthSuccess: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });

        if (error) throw error;
        setMessage('Please check your email for verification link.');
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        
        if (data.user?.email_confirmed_at) {
          onAuthSuccess();
        } else {
          setError('Please verify your email before logging in.');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading
            ? 'Please wait...'
            : isSignUp
            ? 'Create Account'
            : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-gray-600 hover:text-green-600 transition-colors"
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default AuthSection;