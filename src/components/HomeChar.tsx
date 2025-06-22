import React from 'react';
import { motion } from 'framer-motion';
import mainImage from '../assets/main.png';

const HomeChar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row items- justify-end pb-12 px-8 pr-16 ml-8 gap-4"
    >
      {/* Text Content - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 text-center lg:text-left pt-4 lg:pt-8 pl-4 lg:pl-8 flex flex-col justify-center"
      >
        <h3 className="text-xl lg:text-2xl font-medium text-gray-700 mb-4">
          Start Your Journey
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-base leading-relaxed mb-3">
          Transform your life with our fitness programs.
        </p>
        <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-base leading-relaxed">
          Join thousands of people achieving their goals.
        </p>
      </motion.div>

      {/* Image - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex-1 flex justify-center lg:justify-end lg:pr-6"
      >
        <motion.img
          src={mainImage}
          alt="Fitness Character"
          className="w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HomeChar;
