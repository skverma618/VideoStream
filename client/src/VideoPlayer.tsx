import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [source, setSource] = useState('');

    const fetchVideo = async (range: string) => {
        try {
            const response = await axios.get(videoUrl, {
                responseType: 'blob', // Ensure the response is treated as a Blob
                headers: {
                    Range: range,
                },
            });

            const videoBlob = new Blob([response.data], { type: 'video/mp4' });
            const video = URL.createObjectURL(videoBlob);
            setSource(video);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    useEffect(() => {
        fetchVideo('bytes=0-'); // Initial request for the video from the start
    }, [videoUrl]);

    // Event handler for seeking in the video
    const handleSeek = async () => {
        if (videoRef.current) {
            const seekTime = videoRef.current.currentTime;
            const rangeStart = Math.floor(seekTime * 1_000_000 / videoRef.current.duration); // Assuming average bitrate
            const range = `bytes=${rangeStart}-`;
            await fetchVideo(range);
            videoRef.current.currentTime = seekTime; // Restore the current time after loading the new chunk
        }
    };

    return (
        <video ref={videoRef} controls src={source} onSeeked={handleSeek} />
    );
};

export default VideoPlayer;
