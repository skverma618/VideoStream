import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const VideoPlayer: React.FC<{ videoId: string | Number }> = ({ videoId }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [source, setSource] = useState('');
    const [rangeFrom, setRangeFrom] = useState(0);

    const videoUrl = `http://localhost:8000/video/${videoId}`;

    const handleCanPlayThrough = () => {
        // Video is ready to start playing
        console.log('Video can play through');
    };
    return (
        <div className="video-player" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <video
                ref={videoRef}
                controls
                src={videoUrl}
                style={{ maxWidth: '600px', margin: '0 auto' }}
                onCanPlayThrough={handleCanPlayThrough}
            />
    </div>
    );
};

export default VideoPlayer;