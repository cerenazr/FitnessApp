import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Icon from '../assets/icon.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleNav = () => {
    setNav(!nav);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/Progress", label: "Your Progress" },
    { path: "/Workout", label: "Workout Programs" },
    { path: "/Recipes", label: "Recipes" },
    { path: "/About", label: "About Me" },
  ];

  return (
    <div className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Link to="/" className="text-2xl font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">
            MadeleineBaid
          </Link>
          <img src={Icon} alt="Logo" className="h-8 w-8" />
        </motion.div>

        <ul className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
          
          {isAuthenticated ? (
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
              >
                <span>{user?.name}</span>
                <AiOutlineDown className={`transition-transform duration-300 ${showAccountMenu ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showAccountMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                  >
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ) : (
            <>
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  to="/Signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  to="/Login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                >
                  Login
                </Link>
              </motion.li>
            </>
          )}
        </ul>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNav}
          className="block md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </motion.button>

        <AnimatePresence>
          {nav && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-0 left-0 w-[280px] h-full bg-white border-r border-gray-200 shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="text-2xl font-medium text-gray-700">
                    MadeleineBaid
                  </Link>
                  <button
                    onClick={handleNav}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={handleNav}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-rose-50 text-rose-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {isAuthenticated ? (
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          handleNav();
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/Signup"
                          onClick={handleNav}
                          className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Login"
                          onClick={handleNav}
                          className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
