import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [source, setSource] = useState('');
    const [rangeFrom, setRangeFrom] = useState(0);

    const fetchVideo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/video/1', {
                responseType: 'blob', // Ensure the response is treated as a Blob
                headers: {
                    Range: `bytes=${rangeFrom}-`, // Request a specific chunk of the video
                },
            });

            console.log('Fetched video chunk:', response.data);
            console.log('Content-Range:', response.headers);

            const videoBlob = new Blob([response.data], { type: 'video/mp4' });
            const video = URL.createObjectURL(videoBlob);
            setSource(video);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    useEffect(() => {
        fetchVideo(); // Initial request for the video from the start
    }, [videoUrl]);

    // Event handler for seeking in the video
    const handleSeek = async () => {
        if (videoRef.current) {
            const seekTime = videoRef.current.currentTime;
            const rangeStart = Math.floor(seekTime * 1_000_000 / videoRef.current.duration); // Assuming average bitrate
            const range = `bytes=${rangeStart}-`;
            await fetchVideo();
            setRangeFrom(rangeStart);
            videoRef.current.currentTime = seekTime; // Restore the current time after loading the new chunk
        }
    };

    return (
        <div className="video-player" >
            <video ref={videoRef} controls src={source} onSeeked={handleSeek} style={{ maxWidth: '600px', margin: '0 auto' }}/>
        </div>
    );
};

export default VideoPlayer;
