import React, { useState } from 'react';
import { motion} from 'framer-motion';
import { FiArrowRight, FiClock, FiActivity, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HomeRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Recipe sayfasından bir tarif seç
  const featuredRecipe = {
    id: 1,
    title: "Avocado Toast",
    description: "A delicious and healthy avocado toast recipe, perfect for breakfast or a quick snack!",
    image: "src/assets/avocado.jpg",
    ingredients: [
      "2 slices of bread",
      "1 ripe avocado",
      "Salt",
      "Pepper",
      "Lemon juice"
    ],
    calories: 320,
    prepTime: "10 mins"
  };

  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Recipe Card - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-[2]"
        >
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              layout
              className={`flex ${isExpanded ? 'flex-col' : 'h-[280px]'}`}
            >
              <div className={`relative overflow-hidden ${isExpanded ? 'w-full h-[300px]' : 'w-2/5 h-full'}`}>
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className={`p-6 flex-1 flex flex-col justify-between ${isExpanded ? 'gap-4' : ''}`}>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-medium text-gray-700">{featuredRecipe.title}</h2>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-300 flex-shrink-0"
                    >
                      {isExpanded ? (
                        <FiChevronUp className="text-lg text-gray-600" />
                      ) : (
                        <FiChevronDown className="text-lg text-gray-600" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{featuredRecipe.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                      <FiClock className="text-rose-400" />
                      <span className="font-medium">{featuredRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                      <FiActivity className="text-rose-400" />
                      <span className="font-medium">{featuredRecipe.calories} cal</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredRecipe.ingredients.slice(0, 4).map((ingredient, index) => (
                      <span 
                        key={index} 
                        className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* See More Button - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center text-center flex-1"
        >
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Discover More Recipes
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm">
              Explore our collection of healthy and delicious recipes designed to support your fitness journey.
            </p>
            
            <motion.button
              onClick={() => {
                navigate('/Recipes');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-lg hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>See More Recipes</span>
              <FiArrowRight className="text-base" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeRecipe;
