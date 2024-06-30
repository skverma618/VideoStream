import React from "react";

const VideoFrame = ({ videoId }) => {
  const videoUrl = `http://localhost:8000/video/${videoId}`;
  const handleCanPlayThrough = () => {
    // Video is ready to start playing
    console.log("Video can play through");
  };
  return (
    <div
      className="video-player"
      style={{ maxWidth: "810px", margin: "0 auto" }}
    >
      <video
        controls
        src={videoUrl}
        style={{ maxWidth: "810px", margin: "0 auto" }}
        onCanPlayThrough={handleCanPlayThrough}
      />
    </div>
    // <iframe
    //   width="810"
    //   height="500"
    //   src={videoUrl}
    //   title="YouTube video player"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //   allowFullScreen
    //   className="videoPlayer bg-gray-100 rounded-xl my-5"
    // ></iframe>
  );
};

export default VideoFrame;
