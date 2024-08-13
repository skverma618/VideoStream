import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// FOR MORE VIDEO PLAYER OPTIONS, VISIT: https://videojs.com/guides/options/

export const VideoPlayer = () => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const thumbnail = 'https://www.animenewsnetwork.com/hotlink/thumbnails/crop1200x630gNE/youtube/wm0pDk3HChM.jpg';
  const videoUrl = 'http://localhost:8000/videos/587a4d55-661f-4a2c-b3d1-b3c4dfbfbfde/playlist.m3u8';

  const onReady = (player) => {
    console.log('Player is ready');
  };

  const myClickHandler = (event) => {
    // `this` is the player in this context

    if (this.isFullscreen()) {
      this.exitFullscreen();
    } else {
      this.requestFullscreen();
    }
  };

  const options = {
    autoplay: false,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    // height: 400,
    width: 950,
    responsive: true,
    breakpoints: {
      tiny: 300,
      xsmall: 400,
      small: 500,
      medium: 600,
      large: 700,
      xlarge: 800,
      huge: 900
    },
    enableSmoothSeeking: true,
    poster: thumbnail,
    controlBar: {
      playToggle: true,
      volumePanel: {
        inline: false
      },
      skipButtons: {
        forward: 10,
        backward: 10
      },
      fullscreenToggle: true
    },
    sources: [{
      src: videoUrl,
      type: 'application/x-mpegURL'
    }],
    userActions: {
      hotkeys: function (event) {
        // key reference: https://docstore.mik.ua/orelly/webprog/DHTML_javascript/0596004672_jvdhtmlckbk-app-b.html

        // if playing, `space` key = pause
        if (event.which === 32) {
          if (!this.paused()) {
            this.pause();
          } else {
            this.play();
          }
        }

        // `f` key = fullscreen
        if (event.which === 70) {
          if (this.isFullscreen()) {
            this.exitFullscreen();
          } else {
            this.requestFullscreen();
          }
        }

        // `m` key = mute
        if (event.which === 77) {
          if (this.muted()) {
            this.muted(false);
          } else {
            this.muted(true);
          }
        }

        // arrow keys to seek video and adjust volume
        if (event.which === 37) {
          this.currentTime(this.currentTime() - 10);
        }

        if (event.which === 39) {
          this.currentTime(this.currentTime() + 10);
        }

        if (event.which === 38) {
          this.volume(this.volume() + 0.1);
        }

        if (event.which === 40) {
          this.volume(this.volume() - 0.1);
        }
      }
    }
    // preload: false, // Suggests to the browser whether or not the video data should begin downloading as soon as the <video> element is loaded.
    // aspectRatio: '16:9',
    // preferFullWindow: true,// If true, the player will always be in full window mode, usefull for iphone
    // userActions: { click: myClickHandler },
    // fluid: true,
    // spatialNavigation: { enabled: true }
  };

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
        marginBottom: '14px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}>
      <div
        ref={videoRef}
        className=''
      />
    </div>
  );
}

export default VideoPlayer;
