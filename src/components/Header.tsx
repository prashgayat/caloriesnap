import React from 'react';
import { Salad, LogOut } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  resetApp: () => void;
  user: User | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ resetApp, user, onSignOut }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={resetApp}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <Salad size={28} />
            <span className="text-xl font-bold">CalorieSnap</span>
          </button>
          
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button 
                onClick={resetApp}
                className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors"
              >
                New Scan
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;