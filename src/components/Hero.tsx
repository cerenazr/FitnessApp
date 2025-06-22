import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import strenghtIcon from '../assets/strenght.png';
import cardioIcon from '../assets/cardio.png';
import flexibilityIcon from '../assets/flexibility.png';
import balanceIcon from '../assets/balance.png';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const fullText = "Move with Love";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah",
      text: "Best workout experience ever! 💪",
      rating: 5
    },
    {
      name: "Mike",
      text: "Finally found my perfect routine! 🎯",
      rating: 5
    },
    {
      name: "Emma",
      text: "Love the variety of exercises! 🌟",
      rating: 5
    },
    {
      name: "John",
      text: "The variety of workouts is amazing! 🎉",
      rating: 5
    },
    {
      name: "Lisa",
      text: "Perfect for beginners and pros! ⭐",
      rating: 5
    },
    {
      name: "David",
      text: "Best fitness app I've ever used! 🏆",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-[85vh]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="relative">
              <motion.h1 
                className="text-3xl md:text-4xl font-medium text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block">
                  {text}
                  {showCursor && (
                    <span className="inline-block w-1 h-6 bg-rose-300 ml-1 animate-blink"></span>
                  )}
                </span>
              </motion.h1>
            </div>
            <p className="text-base text-gray-600 mb-6">
              Discover your inner strength and transform your body with our curated collection of workout programs.
            </p>
            <motion.button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <FiArrowRight className="text-base" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl"
          >
            {[
              { title: 'Strength', count: '50+', icon: strenghtIcon },
              { title: 'Cardio', count: '30+', icon: cardioIcon },
              { title: 'Flexibility', count: '25+', icon: flexibilityIcon },
              { title: 'Balance', count: '20+', icon: balanceIcon }
            ].map((item) => (
              <motion.div
                key={item.title}
                className="flex flex-col items-center"
                whileHover={{ y: -3 }}
              >
                <div className="w-28 h-28 bg-white/40 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center mb-2 border border-white/20">
                  <img src={item.icon} alt={item.title} className="w-14 h-14 object-contain mb-1" />
                  <p className="text-xl font-medium text-gray-700">{item.count}</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className="relative h-[100px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full"
                >
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} className="text-rose-400 text-base fill-current" />
                    ))}
                  </div>
                  <p className="text-base text-gray-700 mb-1 font-medium">{testimonials[currentTestimonial].text}</p>
                  <p className="text-sm text-gray-500">- {testimonials[currentTestimonial].name}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-rose-400 w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;