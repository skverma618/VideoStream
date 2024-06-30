import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const VideoPlayer: React.FC<{ videoId: string| Number }> = ({videoId}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [source, setSource] = useState('');
    const [rangeFrom, setRangeFrom] = useState(0);

    const videoUrl = `http://localhost:8000/video/${videoId}`;
    const fetchVideo = async (rangeStart: number) => {
        try {
            const response = await axios.get(videoUrl, {
                responseType: 'blob', // Ensure the response is treated as a Blob
                headers: {
                    Range: `bytes=${rangeStart}-`, // Request a specific chunk of the video
                },
            });
    
            console.log('Fetched video chunk:', response.data);
            console.log('Content-Range:', response.headers['content-range'] || response.headers['Content-Range']);
    
            const videoBlob = new Blob([response.data], { type: 'video/mp4' });
            const video = URL.createObjectURL(videoBlob);
            setSource(video);
    
            // Calculate the next start byte based on the chunk received
            const contentRange = response.headers['content-range'] || response.headers['Content-Range'];
            if (contentRange) {
                const rangeEnd = parseInt(contentRange.split('/')[0].split('-')[1], 10);
                setRangeFrom(rangeEnd + 1);
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };    

    useEffect(() => {
        fetchVideo(rangeFrom); // Initial request for the video from the start
    }, []);

    // Event handler for seeking in the video
    const handleSeek = async () => {
        if (videoRef.current) {
            const seekTime = videoRef.current.currentTime;
            const rangeStart = Math.floor((seekTime * 1_000_000) / videoRef.current.duration); // Assuming average bitrate
            setRangeFrom(rangeStart);
            await fetchVideo(rangeStart);
            videoRef.current.currentTime = seekTime; // Restore the current time after loading the new chunk
        }
    };

    return (
        <div className="video-player">
            <video ref={videoRef} controls src={source} onSeeked={handleSeek} style={{ maxWidth: '600px', margin: '0 auto' }} />
        </div>
    );
};

export default VideoPlayer;