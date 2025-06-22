import React from 'react';
import { FiInstagram, FiYoutube, FiHeart } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 w-full">
      <div className="w-full px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/madeleineabeid/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-rose-500 transition-colors duration-300"
            >
              <FiInstagram className="text-xl" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-rose-500 transition-colors duration-300"
            >
              <FiYoutube className="text-xl" />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © 2024 Fitness App. All rights reserved.
          </p>
          
          {/* Designer Credit */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>Designed with</span>
            <FiHeart className="text-rose-400" />
            <span>by</span>
            <span className="font-medium text-gray-600">Ceren</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 