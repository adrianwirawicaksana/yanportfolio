"use client";

import { videos } from "@/constants/cardMediaConstants";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const MediaSource = () => {
  return (
    <div className="w-full grid md:grid-cols-2 px-5 py-8 gap-4">
      {/* Main Video */}
      <div className="w-full overflow-hidden rounded-xl aspect-video">
        <LiteYouTubeEmbed
          id={videos.main.youtubeId}
          title="Main Video Showcase"
          wrapperClass="yt-lite w-full h-full"
        />
      </div>

      {/* Secondary Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.secondary.map((video) => (
          <div key={video.youtubeId} className="w-full overflow-hidden rounded-xl aspect-video">
            <LiteYouTubeEmbed
              id={video.youtubeId}
              title={`Video Showcase ${video.youtubeId}`}
              wrapperClass="yt-lite w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSource;