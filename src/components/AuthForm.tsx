// src/components/AuthForm.tsx

import React, { useState } from 'react';
import { signUp, signIn, signOut, isEmailVerified } from '../services/AuthService';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setMessage('Signup successful! Please check your email to verify your account.');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      const verified = await isEmailVerified();
      if (!verified) {
        setMessage('Please verify your email before continuing.');
        return;
      }
      setMessage('Logged in successfully!');
      setIsLoggedIn(true);
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMessage('Logged out');
    setIsLoggedIn(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">CalorieSnap Login</h2>

      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div className="flex gap-2 mb-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignIn}>
          Sign In
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>

      {isLoggedIn && (
        <button className="bg-red-500 text-white px-4 py-2 rounded mb-2" onClick={handleSignOut}>
          Sign Out
        </button>
      )}

      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

export default AuthForm;
