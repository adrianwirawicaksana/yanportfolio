"use client";

import { videos } from "@/src/constants/cardMediaConstants";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

const MediaSource = () => {
  const getCachedThumbnail = (youtubeId: string) => {
    const originalUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
    return `/_next/image?url=${encodeURIComponent(originalUrl)}&w=1080&q=85`;
  };

  return (
    <div className="w-full grid md:grid-cols-2 px-5 py-8 gap-4">
      <div className="w-full overflow-hidden rounded-xl aspect-video">
        <LiteYouTubeEmbed
          id={videos.main.youtubeId}
          title="Main Video Showcase"
          wrapperClass="yt-lite w-full h-full"
          thumbnail={getCachedThumbnail(videos.main.youtubeId)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.secondary.map((video) => (
          <div key={video.youtubeId} className="w-full overflow-hidden rounded-xl aspect-video">
            <LiteYouTubeEmbed
              id={video.youtubeId}
              title={`Video Showcase ${video.youtubeId}`}
              wrapperClass="yt-lite w-full h-full"
              thumbnail={getCachedThumbnail(video.youtubeId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSource;