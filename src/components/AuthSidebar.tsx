import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Sidebar içeriği
  const SidebarContent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[85%] pt-12 pb-8 px-12 bg-gradient-to-br from-rose-200 via-pink-100 to-pink-50 text-gray-700 rounded-3xl shadow-2xl min-w-[370px] max-w-[440px] mx-auto backdrop-blur-sm -translate-x-8 translate-y-6"
    >
      <motion.div 
        className="relative mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center shadow-xl border-4 border-white/40 backdrop-blur-sm">
          <motion.img
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            src="/src/assets/character.png"
            alt="Fitness Character"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
        </div>
        <motion.div 
          className="absolute bottom-3 right-3 bg-pink-300 border-2 border-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-white shadow"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ❤️
        </motion.div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-4 tracking-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500"
      >
        Welcome Back!
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-base mb-6 opacity-90 font-medium"
      >
        Start your fitness journey with us.<br />
        <span className="text-sm opacity-80">Log in or sign up to access personalized workouts and nutrition tips.</span>
      </motion.p>

      <motion.ul 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-white/30 rounded-2xl p-6 space-y-4 text-base font-medium shadow-inner backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
      >
        {[
          "Track your progress",
          "Get daily motivation",
          "Access exclusive content"
        ].map((item, index) => (
          <motion.li 
            key={index}
            className="flex items-center gap-3"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-200 to-pink-100 shadow-sm"></span>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <>
      {/* Masaüstü görünümü */}
      <div className="hidden lg:flex flex-col items-center w-[420px]">
        <SidebarContent />
      </div>

      {/* Mobil sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`fixed top-0 right-0 h-full w-[420px] bg-transparent z-40 lg:hidden overflow-y-auto pt-8 hidden`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="relative h-full flex flex-col justify-center">
          <SidebarContent />
        </div>
      </motion.div>
    </>
  );
};

export default AuthSidebar;