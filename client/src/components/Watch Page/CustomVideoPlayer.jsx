import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdVolumeOff } from 'react-icons/md';
import 'tailwindcss/tailwind.css';

const CustomVideoPlayer = ({ }) => {
    const videoUrl = 'http://localhost:8000/video/1';
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            setProgress((video.currentTime / video.duration) * 100);
        };

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                setBuffered((bufferedEnd / video.duration) * 100);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('progress', handleProgress);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('progress', handleProgress);
        };
    }, []);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        setVolume(volume);
        videoRef.current.volume = volume;
        setIsMuted(volume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    };

    const handleFullscreen = () => {
        if (!isFullscreen) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleProgressChange = (event) => {
        const newProgress = event.target.value;
        videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
        setProgress(newProgress);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handlePlaybackRateChange = (rate) => {
        setPlaybackRate(rate);
        videoRef.current.playbackRate = rate;
        setShowSettings(false);
    };

    return (
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'max-w-4xl mx-auto'}`}>
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-auto"
                onClick={handlePlayPause}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-75 text-white p-2">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-600 appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #e5e7eb ${progress}%, #4b5563 ${progress}%, #a0aec0 ${buffered}%, #4b5563 ${buffered}%)`
                    }}
                />
                <div className="flex items-center justify-between mt-2">
                    <div className='flex items-center'>
                        {/* Play/Pause */}
                        <button onClick={handlePlayPause} className="p-2">
                            {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                        </button>

                        {/* Volume */}
                        <div className='flex items-center'>
                            <button onClick={toggleMute} className="p-2">
                                {isMuted || volume === 0 ? <MdVolumeOff className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-1 bg-gray-700 appearance-none cursor-pointer"
                                style={{ background: `linear-gradient(to right, #e5e7eb ${volume * 100}%, #4b5563 ${volume * 100}%)` }}
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={toggleSettings} className="p-2">
                            <IoMdSettings className="text-xl" />
                        </button>
                        <button onClick={handleFullscreen} className="p-2">
                            {isFullscreen ? <FaCompress className="text-xl" /> : <FaExpand className="text-xl" />}
                        </button>
                    </div>
                </div>
                {showSettings && (
                    <div className="absolute bottom-14 right-2 bg-gray-800 text-white rounded-md p-2 shadow-lg">
                        <div className="flex flex-col">
                            <button onClick={() => handlePlaybackRateChange(0.5)} className="p-1">0.5x</button>
                            <button onClick={() => handlePlaybackRateChange(1)} className="p-1">1x</button>
                            <button onClick={() => handlePlaybackRateChange(1.5)} className="p-1">1.5x</button>
                            <button onClick={() => handlePlaybackRateChange(2)} className="p-1">2x</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
