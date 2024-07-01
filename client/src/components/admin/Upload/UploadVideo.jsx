import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/Constants";

const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a video file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("video", selectedFile);

        try {
            const response = await axios.post(API_URL + `upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error uploading video.");
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
            <input
                type="file"
                // accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-violet-50 file:text-violet-700
                           hover:file:bg-violet-100"
            />
            <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Upload
            </button>
            {uploadProgress > 0 && (
                <div className="mt-4">
                    <div className="relative w-full bg-gray-200 h-6 rounded">
                        <div
                            className="absolute top-0 left-0 h-6 bg-blue-500 rounded"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-center mt-2">{uploadProgress}%</p>
                </div>
            )}
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
    );
};

export default UploadVideo;
