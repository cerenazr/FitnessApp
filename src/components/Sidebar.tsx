import { useState, useEffect } from "react";
import { FiArrowRight, FiX, FiInstagram, FiHeart, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type InstaPost = {
  id: number;
  type: "image" | "video";
  url: string;
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col items-center space-y-6 w-[240px] bg-white border-r border-gray-100/50"
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/5 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-100/50 z-50 lg:hidden overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
            <h3 className="text-lg font-medium text-gray-700">Instagram Feed</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
            >
              <FiX className="text-lg text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </motion.div>

      {/* Mobile Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-300 lg:hidden bg-gray-50/90 hover:bg-gray-100/80 text-rose-400 p-3 rounded-l-full border border-gray-200/50 z-50
          ${isOpen ? "translate-x-[-256px]" : "translate-x-0"}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowRight size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

const SidebarContent = () => {
  const [posts, setPosts] = useState<InstaPost[]>([]);

  useEffect(() => {
    fetch("/mock/instagram.json")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Instagram verisi alınamadı:", err));
  }, []);

  return (
    <div className="flex flex-col items-center p-6 space-y-8 w-full">
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center text-center space-y-4"
      >
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200/60">
            <img
              src="src/assets/character.png"
              alt="character"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h6 className="text-lg font-medium text-gray-700 mb-1">Move with ❤️</h6>
          <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
            Fitness tips, balanced nutrition & daily wellness
          </p>
          <p className="text-xs text-gray-400 mt-2">—by Madeleine Baid</p>
        </div>
      </motion.div>

      {/* Instagram Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full"
      >
        {/* Instagram Grid */}
        <div className="grid grid-cols-3 gap-2">
          {posts
            .filter((post) => post.type === "image")
            .slice(0, 6)
            .map((post, index) => (
              <motion.a
                key={post.id}
                href="https://www.instagram.com/madeleineabeid/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-md bg-gray-100/50"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <img
                  src={post.url}
                  alt={`insta-${post.id}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <FiInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm" />
                </div>
              </motion.a>
            ))}
        </div>

        {/* Follow Button */}
        <motion.a
          href="https://www.instagram.com/madeleineabeid/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full bg-transparent border border-gray-300 text-gray-600 py-2.5 px-4 rounded-lg text-center font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <FiInstagram className="text-base" />
          Follow on Instagram
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Sidebar;
