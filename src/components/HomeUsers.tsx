import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTrendingUp, FiTarget, FiAward, FiHeart, FiActivity } from 'react-icons/fi';

interface UserStat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  change?: string;
}

const HomeUsers: React.FC = () => {
  const userStats: UserStat[] = [
    {
      icon: <FiUsers className="text-2xl" />,
      value: '15,234',
      label: 'Active Users',
      color: 'text-blue-500',
      change: '+456 this week'
    },
    {
      icon: <FiTarget className="text-2xl" />,
      value: '12,847',
      label: 'Goals Achieved',
      color: 'text-green-500',
      change: '+289 this month'
    },
    {
      icon: <FiActivity className="text-2xl" />,
      value: '67,892',
      label: 'Workouts Completed',
      color: 'text-purple-500',
      change: '+2,156 this week'
    },
    {
      icon: <FiAward className="text-2xl" />,
      value: '3,456',
      label: 'Success Stories',
      color: 'text-orange-500',
      change: '+234 this month'
    }
  ];

  const recentUsers = [
    { name: 'Sarah M.', achievement: 'Lost 15kg in 3 months', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
    { name: 'Mike R.', achievement: 'Completed 100 workouts', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    { name: 'Emma L.', achievement: 'Ran first 5K', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
    { name: 'David K.', achievement: 'Gained 8kg muscle', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' }
  ];

  return (
    <div className="bg-white p-8 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          Our Growing Community
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Join thousands of people who are transforming their lives through fitness. 
          Every day, more people are achieving their goals with us.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`${stat.color} mb-3 flex justify-center`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              {stat.label}
            </div>
            {stat.change && (
              <div className="text-xs text-green-500 font-medium">
                {stat.change}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeUsers;
