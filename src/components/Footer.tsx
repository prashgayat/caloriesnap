import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CalorieSnap</p>
          <p className="mt-1">
            Photos are processed securely; no copies are stored.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;