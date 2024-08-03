import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatViews, formatReleaseDate } from "../../utils/formatData";

const SideVideos = ({ video }) => {
  console.log(video);

  // Helper function to format large numbers (like view count)
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  // Helper function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="sideVideo mt-5 my-4 flex justify-evenly">
      <Link to={"/watch?v=" + video?.id?.videoId} className="w-[40%]">
        <div className="imgBox relative w-fit">
          <img
            src={video?.snippet?.thumbnails?.medium?.url}
            alt={video?.snippet?.title}
            className="h-25 w-full rounded-lg"
          />
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-lg m-1">
            {video?.snippet?.videoLength}
          </div>
        </div>
      </Link>
      <div className="w-[55%] flex flex-col gap-2">
        <Link to={"/watch?v=" + video?.id?.videoId}>
          <p className="video-title font-semibold text-sm">
            {video?.snippet?.title.length > 50
              ? video.snippet.title.substring(0, 50) + "..."
              : video?.snippet?.title}
          </p>
        </Link>
        <Link to={"/channelPage?id=" + video?.snippet?.channelId}>
          <p className="flex items-center" style={{
            fontSize: "0.8rem",
          }}>
            {video?.snippet?.channelTitle}
            <IoMdCheckmarkCircle className="text-gray-700" />
          </p>
        </Link>
        <div className="text-xs text-gray-500 flex">
          <span className="mr-2">{formatViews(video?.snippet?.viewCount)} views</span>
          <span className="mr-1">•</span>
          <span>{formatReleaseDate(video?.snippet?.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default SideVideos;
