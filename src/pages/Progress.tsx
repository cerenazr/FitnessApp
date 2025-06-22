import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useWorkoutContext } from '@/contexts/WorkoutContext';
import ProgressCard from '@/components/ProgressCard';

const Progress = () => {
  const { isAuthenticated } = useAuth();
  const { favorites, loading, removeFavorite } = useWorkoutContext();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please log in to access your progress tracking features.</p>
          <Link 
            to="/login" 
            className="inline-block px-6 py-3 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Progress Yet
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                You haven't added any videos yet. 💔
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Start your fitness journey by adding some workout videos to track your progress!
              </p>
            </div>
            <div className="mt-8">
              <Link 
                to="/workout" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-300 to-pink-300 text-white rounded-lg hover:from-rose-400 hover:to-pink-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Explore Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-8 flex flex-col items-center gap-8">
        {favorites.map((playlist) => (
          <div 
            key={playlist.id}
            className="w-full max-w-4xl mx-auto"
            style={{ 
              transition: 'none',
              transform: 'none'
            }}
          >
            <ProgressCard
              thumbnail={playlist.thumbnail}
              playlistId={playlist.id}
              playlistTitle={playlist.title}
              onDelete={() => removeFavorite(playlist.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;