import React, { useState } from 'react';
import Card from '@/components/Card';
import { useWorkoutContext } from '@/contexts/WorkoutContext';
import { motion } from 'framer-motion';
import { FiHeart, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Workout: React.FC = () => {
  const { playlists, loading, error, addFavorite, removeFavorite, isFavorite } = useWorkoutContext();
  const { isAuthenticated } = useAuth();
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  const handleFavoriteClick = (playlistId: string) => {
    if (!isAuthenticated) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
      return;
    }
    if (isFavorite(playlistId)) {
      removeFavorite(playlistId);
    } else {
      const playlist = playlists.find(p => p.id === playlistId);
      if (playlist) {
        addFavorite(playlist);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-medium text-gray-600 mb-12 pl-4"
        >
          Workout Programs
        </motion.h1>
        
        {showAuthWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-rose-50 p-4 rounded-lg shadow-lg z-50"
          >
            <p className="text-rose-700 text-sm">
              Please <Link to="/login" className="underline font-medium">log in</Link> to add workouts to your favorites.
            </p>
          </motion.div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        )}
        
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-100"
          >
            {error}
          </motion.p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist, index) => {
            const favorite = isFavorite(playlist.id);
            return (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border border-gray-100 overflow-hidden">
                  <div className="flex flex-col">
                    <div className="relative group">
                      <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-medium text-xl text-gray-700 mb-4">{playlist.title}</h3>
                      
                      <div className="flex items-center gap-4">
                        <a
                          href={playlist.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                          <FiExternalLink className="text-lg" />
                          <span>Watch on YouTube</span>
                        </a>
                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                            favorite 
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                          onClick={() => handleFavoriteClick(playlist.id)}
                        >
                          <FiHeart className={`text-lg ${favorite ? 'fill-current' : ''}`} />
                          <span>{favorite ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Workout;