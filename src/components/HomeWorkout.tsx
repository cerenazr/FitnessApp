import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiHeart } from 'react-icons/fi';
import { useWorkoutContext } from '@/contexts/WorkoutContext';
import { useNavigate } from 'react-router-dom';

const HomeWorkout: React.FC = () => {
  const { playlists, loading, error, addFavorite, removeFavorite, isFavorite } = useWorkoutContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded-xl">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center"
      >
        Featured Workout Plans
      </motion.h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {playlists.slice(0, 3).map((playlist, index) => {
          const favorite = isFavorite(playlist.id);
          return (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
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
                      href={`https://www.youtube.com/playlist?list=${playlist.id}`}
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
                      onClick={() =>
                        favorite
                          ? removeFavorite(playlist.id)
                          : addFavorite(playlist)
                      }
                    >
                      <FiHeart className={`text-lg ${favorite ? 'fill-current' : ''}`} />
                      <span>{favorite ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            navigate('/workout');
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-300 to-pink-300 text-white rounded-lg hover:from-rose-400 hover:to-pink-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-sm"
        >
          <span>See More</span>
          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomeWorkout;