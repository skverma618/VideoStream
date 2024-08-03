import React, { useState } from "react";
import { format } from "date-fns"; // To format the date
import { formatViews, formatReleaseDate } from "../../utils/formatData";

const VideoDescription = ({ snippet, statistics }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const description = snippet.description;
  const maxLength = 150; // Max length before showing "Show More"

  return (
    <div className="description mt-2 mb-6 bg-gray-200 p-3 rounded-xl text-sm leading-6">
      <div className="flex items-center mb-2">
        <div className="font-bold mr-2">{formatViews(statistics.viewCount)} views</div>
        <div className="text-gray-600 mr-2">{formatReleaseDate(snippet.publishedAt)}</div>
        {snippet.hashtags.map((hashtag, index) => (
          <div key={index} className="text-blue-500">
            {hashtag}{" "}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {showFullDescription || description.length <= maxLength ? (
          <p>{description}</p>
        ) : (
          <p>{description.substring(0, maxLength) + "..."}</p>
        )}
      </div>
      {description.length > maxLength && (
        <button
          onClick={toggleDescription}
          className="block mt-3 font-semibold text-blue-500"
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default VideoDescription;
