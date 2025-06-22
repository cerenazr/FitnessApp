import React from 'react';
import { motion } from 'framer-motion';
import RecipeCard from "@/components/RecipeCard";

const recipes = [
  {
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
  },
  {
    id: 2,
    title: "Greek Yogurt Bowl",
    description: "A protein-rich breakfast bowl with fresh fruits and nuts.",
    image: "src/assets/yogurt.jpg",
    ingredients: [
      "1 cup Greek yogurt",
      "Mixed berries",
      "Honey",
      "Almonds",
      "Chia seeds"
    ],
    calories: 280,
    prepTime: "5 mins"
  },
  {
    id: 3,
    title: "Quinoa Salad",
    description: "A nutritious and filling salad perfect for lunch or dinner.",
    image: "src/assets/Quinoa.jpg",
    ingredients: [
      "1 cup quinoa",
      "Cherry tomatoes",
      "Cucumber",
      "Red onion",
      "Olive oil",
      "Lemon juice"
    ],
    calories: 350,
    prepTime: "20 mins"
  },
  {
    id: 4,
    title: "Grilled Chicken Bowl",
    description: "A protein-packed bowl with grilled chicken and fresh vegetables.",
    image: "src/assets/chicken-bowl.jpg",
    ingredients: [
      "200g chicken breast",
      "Brown rice",
      "Mixed vegetables",
      "Avocado",
      "Lime juice",
      "Cilantro"
    ],
    calories: 450,
    prepTime: "25 mins"
  },
  {
    id: 5,
    title: "Smoothie Bowl",
    description: "A refreshing and colorful smoothie bowl topped with fresh fruits.",
    image: "src/assets/smoothie-bowl.jpg",
    ingredients: [
      "Frozen berries",
      "Banana",
      "Almond milk",
      "Chia seeds",
      "Fresh fruits",
      "Granola"
    ],
    calories: 300,
    prepTime: "10 mins"
  },
  {
    id: 6,
    title: "Mediterranean Wrap",
    description: "A healthy wrap filled with Mediterranean flavors and fresh ingredients.",
    image: "src/assets/wrap.jpg",
    ingredients: [
      "Whole wheat wrap",
      "Hummus",
      "Feta cheese",
      "Cucumber",
      "Tomatoes",
      "Olives",
      "Red onion"
    ],
    calories: 380,
    prepTime: "15 mins"
  }
];

const Recipes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-medium text-gray-700 mb-4">
            Healthy Recipes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover delicious and nutritious recipes that will help you maintain a healthy lifestyle while enjoying your meals.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-4xl">
                <RecipeCard
                  title={recipe.title}
                  description={recipe.description}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  calories={recipe.calories}
                  prepTime={recipe.prepTime}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Recipes;
