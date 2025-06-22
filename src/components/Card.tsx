import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className={`bg-gray-100 rounded-2xl p-4 relative ${className}`}>
      {children}
      {typeof isFavorite === 'boolean' && onFavoriteToggle && (
        <button
          className={`absolute bottom-3 right-3 text-2xl transition-colors ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={e => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      )}
    </div>
  );
};

export default Card;