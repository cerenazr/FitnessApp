import React, { useEffect, useState } from 'react';
import { useWorkoutContext } from '@/contexts/WorkoutContext';
import { FiCheck, FiCircle, FiChevronDown, FiChevronUp, FiPlay, FiX } from 'react-icons/fi';

interface Video {
  id: string;
  title: string;
}

interface ProgressCardProps {
  thumbnail: string;
  playlistId: string;
  playlistTitle: string;
  className?: string;
  onDelete?: () => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  thumbnail,
  playlistId,
  playlistTitle,
  className = '',
  onDelete
}) => {
  const { getVideos, completed, toggleCompleted } = useWorkoutContext();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVideos(playlistId).then((v) => {
      setVideos(v);
      setLoading(false);
    });
  }, [playlistId, getVideos]);

  const completedCount = videos.filter(video => completed[video.id]).length;
  const progress = (completedCount / videos.length) * 100;

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${className}`}>
      {/* Silme Butonu */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-rose-500"
        >
          <FiX size={20} />
        </button>
      )}

      <div className="p-6">
        {/* Üst Kısım */}
        <div className="flex gap-6">
          {/* Sol Kısım - Thumbnail ve İlerleme */}
          <div className="flex-shrink-0">
            <img
              src={thumbnail}
              alt={playlistTitle}
              className="w-64 h-48 rounded-xl object-cover shadow-md"
            />
          </div>

          {/* Sağ Kısım - Başlık ve İlerleme Bilgisi */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{playlistTitle}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiPlay className="text-rose-500" size={20} />
                <span className="text-base text-gray-600">
                  {completedCount} of {videos.length} videos completed
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-rose-500 transition-all duration-300"
                  />
                </div>
                <span className="text-base font-medium text-rose-500">{Math.round(progress)}%</span>
              </div>
              {progress === 100 && (
                <div className="mt-2 text-rose-500 font-medium animate-bounce">
                  🎉 Congratulations! You've completed all videos!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Listesi */}
        <div className="mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Video Listesi</span>
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-0'}`}>
            <div className="space-y-2 mt-2">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500" />
                </div>
              ) : (
                videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => toggleCompleted(video.id)}
                    className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    style={{ transform: 'none' }}
                  >
                    <span className={`text-sm ${
                      completed[video.id] ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                      {video.title}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      completed[video.id] 
                        ? 'border-rose-500 bg-rose-500 text-white' 
                        : 'border-gray-300 group-hover:border-rose-500'
                    }`}>
                      {completed[video.id] && <FiCheck size={14} />}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;