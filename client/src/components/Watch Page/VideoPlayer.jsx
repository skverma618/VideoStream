import React, {useEffect} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const onReady = (player) => {
    console.log('Player is ready');
  };

  const options = {
    autoplay: false,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      playToggle: true,
      volumePanel: {
        inline: false
      },
      fullscreenToggle: true
    },
    sources: [{
      src: 'http://localhost:8000/videos/587a4d55-661f-4a2c-b3d1-b3c4dfbfbfde/playlist.m3u8',
      type: 'application/x-mpegURL'
    }]
  };
  const videoUrl = 'http://localhost:8000/videos/587a4d55-661f-4a2c-b3d1-b3c4dfbfbfde/playlist.m3u8';

  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player
    style={{
      width: '600px',
    }}>
      <div 
      ref={videoRef} 
      className=''
      />
    </div>
  );
}

export default VideoPlayer;
