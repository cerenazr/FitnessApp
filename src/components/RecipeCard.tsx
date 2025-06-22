import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiActivity, FiChevronDown, FiChevronUp } from "react-icons/fi";

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  image,
  ingredients,
  calories,
  prepTime
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const preparationSteps = [
    "Prepare all ingredients and have them ready.",
    "Follow the recipe instructions carefully.",
    "Cook according to the specified time.",
    "Let it rest for a few minutes before serving.",
    "Enjoy your healthy meal!"
  ];

  return (
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
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className={`p-6 flex-1 flex flex-col justify-between ${isExpanded ? 'gap-4' : ''}`}>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-medium text-gray-700">{title}</h2>
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
            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                <FiClock className="text-rose-400" />
                <span className="font-medium">{prepTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full text-sm">
                <FiActivity className="text-rose-400" />
                <span className="font-medium">{calories} cal</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2 text-sm">
              <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.slice(0, 4).map((ingredient, index) => (
                <span 
                  key={index} 
                  className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    Preparation Steps
                  </h3>
                  <div className="space-y-4">
                    {preparationSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-medium text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-600 text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeCard;