import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const titleText = "Hey I'm Madeleine";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= titleText.length) {
        setDisplayedTitle(titleText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 2000);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-4 sm:p-8 pt-10 sm:pt-16">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 mb-8"
        >
          <motion.div 
            className="w-full max-w-xs mx-auto lg:mx-0 lg:translate-x-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-medium mb-4 text-center text-gray-600">About Me</h1>
            <div className="relative">
              <motion.img 
                src="src/assets/mad.png" 
                alt="Madeleine"
                className="w-full h-72 rounded-2xl object-cover shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
          <motion.div 
            className="flex-1 w-full lg:ml-8 mt-8 lg:mt-16 pt-6 lg:pt-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-medium mb-4 relative inline-block text-gray-600">
              {displayedTitle}
              <span className="animate-pulse text-pink-400">|</span>
              {showHearts && (
                <div className="absolute top-0" style={{ left: `${displayedTitle.length * 0.49}em` }}>
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-pink-400 text-base"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: [-20, -40],
                        x: [0, Math.random() * 20 - 10]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        repeat: 0
                      }}
                    >
                      ❤️
                    </motion.span>
                  ))}
                </div>
              )}
            </h2>
            <motion.p 
              className="text-base leading-relaxed pt-4 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I'm passionate about sports, exercise, and health education. Through my work, I aim to make a positive impact on our community by promoting wellness and bringing people together.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Mission and Vision Cards */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-medium text-gray-600 mb-3">My Mission</h3>
            <p className="text-gray-600 text-base leading-relaxed">To inspire and empower individuals to achieve their fitness goals through personalized guidance and support.</p>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-medium text-gray-600 mb-3">My Vision</h3>
            <p className="text-gray-600 text-base leading-relaxed">Creating a healthier, happier community through the power of fitness and wellness education.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;