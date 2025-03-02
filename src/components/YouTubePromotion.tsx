import React, { useState } from 'react';
import { YoutubeIcon, ExternalLinkIcon, PlayIcon } from 'lucide-react';

interface YouTubePromotionProps {
  channelId: string;
  videoIds: string[];
}

const YouTubePromotion: React.FC<YouTubePromotionProps> = ({ 
  channelId, 
  videoIds
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleThumbnailClick = (videoId: string) => {
    setActiveVideo(videoId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <YoutubeIcon className="w-6 h-6 text-red-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            <a 
              href={`https://www.youtube.com/@${channelId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
            >
              @{channelId}
            </a>
          </h2>
        </div>
        <a 
          href={`https://www.youtube.com/@${channelId}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
        >
          <span className="mr-1">Visit Channel</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 flex flex-row space-x-4">
        {videoIds.map((videoId, index) => (
          <div key={index} className="flex-1 aspect-video bg-gray-100 rounded-md overflow-hidden relative">
            {activeVideo === videoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={`YouTube video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                className="cursor-pointer relative w-full h-full"
                onClick={() => handleThumbnailClick(videoId)}
              >
                {/* High-quality thumbnail */}
                <img 
                  src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={`Video thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality if maxres is not available
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                  }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 bg-opacity-80 rounded-full p-3 text-white hover:bg-opacity-100 transition-all transform hover:scale-110">
                    <PlayIcon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-sm text-gray-600 flex justify-between items-center">
        <p>Check out more Git and programming tutorials on our YouTube channel!</p>
        <a 
          href={`https://www.youtube.com/@${channelId}?sub_confirmation=1`}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          <YoutubeIcon className="w-4 h-4 mr-1" />
          Subscribe
        </a>
      </div>
    </div>
  );
};

export default YouTubePromotion;
