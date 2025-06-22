import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      question: "How do I get started with the fitness app?",
      answer: "Getting started is easy! Simply create an account, complete your fitness profile, and choose from our curated workout programs. Our AI will recommend the best routines based on your goals and fitness level.",
      category: "getting-started"
    },
    {
      question: "What types of workouts are available?",
      answer: "We offer a wide variety of workouts including strength training, cardio, flexibility, balance, HIIT, yoga, and pilates. Each category has multiple difficulty levels to suit beginners and advanced users alike.",
      category: "workouts"
    },
    {
      question: "Can I track my progress?",
      answer: "Absolutely! Our app includes comprehensive progress tracking features. Monitor your workouts, track your weight, measurements, and see your fitness journey with detailed analytics and progress charts.",
      category: "progress"
    },
    {
      question: "Are the recipes suitable for all diets?",
      answer: "Yes! Our recipe collection includes options for various dietary preferences including vegetarian, vegan, keto, paleo, and gluten-free. Each recipe comes with detailed nutritional information.",
      category: "nutrition"
    },
    {
      question: "Can I use the app without equipment?",
      answer: "Definitely! Many of our workouts are bodyweight-only and require no equipment. We also offer variations for exercises that can be done with minimal equipment you might have at home.",
      category: "getting-started"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqData.length },
    { id: 'getting-started', name: 'Getting Started', count: faqData.filter(faq => faq.category === 'getting-started').length },
    { id: 'workouts', name: 'Workouts', count: faqData.filter(faq => faq.category === 'workouts').length },
    { id: 'nutrition', name: 'Nutrition', count: faqData.filter(faq => faq.category === 'nutrition').length },
    { id: 'progress', name: 'Progress', count: faqData.filter(faq => faq.category === 'progress').length }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our fitness app, workouts, nutrition, and more.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 rounded-2xl"
              >
                <h3 className="text-base font-medium text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FiChevronDown className="text-rose-500 text-lg" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFAQ;
