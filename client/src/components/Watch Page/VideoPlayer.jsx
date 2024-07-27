import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const videoUrl = 'http://localhost:8000/videos/587a4d55-661f-4a2c-b3d1-b3c4dfbfbfde/playlist.m3u8';


  return (
    <ReactPlayer
      ref={videoRef}
      url={videoUrl}
      playing={true}
      controls={true}
      width='100%'
      height='100%'
      forceHLS={true}
    />

  );
};

export default VideoPlayer;
