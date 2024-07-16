import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import fs from 'fs';

const convertVideo = (inputPath: string, outputPath: string, resolution: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .videoCodec('libx264')
            .size(resolution)
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            })
            .run();
    });
};

export const upload = async (req: any, res: any) => {
    console.log('req.file:', req.file);
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    const resolutions = [
        { resolution: '640x360', suffix: '360p' },
        { resolution: '854x480', suffix: '480p' },
    ];

    try {
        const promises = resolutions.map((res) => {
            const originalnameArray = file.originalname.split('.');
            const videoType = originalnameArray[originalnameArray.length - 1];
            const outputPath = path.join(__dirname, '..', 'videos', `${file.filename.split('.')[0]}_${res.suffix}.${videoType}`);
            return convertVideo(file.path, outputPath, res.resolution);
        });

        await Promise.all(promises);

        res.send({ message: 'Video uploaded and converted successfully' });
    } catch (error) {
        console.error('Error during conversion:', error);
        res.status(500).send({ message: 'Error during conversion' });
    }
}

const storelink = (videoLink: any) => {

    const newLinkLine = `${videoLink}\n`
    const linkFilePath = './videoLinks.txt';
    fs.appendFileSync(linkFilePath, newLinkLine, 'utf-8');
    console.log('[INFO] video URL stored successfully.')
}

export const uploadVideo = async (req: any, res: any) => {
    console.log("[INFO] File uploaded.");

    const videoId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/hls-videos/${videoId}`
    const hlsPath = `${outputPath}/playlist.m3u8` // HLS is a unstiched video file and index.m3u8 work as index for video chunks

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath, {recursive: true})
    }
    
    // Command ref --- https://medium.com/@peer5/creating-a-production-ready-multi-bitrate-hls-vod-stream-dff1e2f1612c

    const ffmpegCommand = `ffmpeg -hide_banner -y -i ${videoPath} \
    -vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod  -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename ${outputPath}/360p_%03d.ts ${outputPath}/360p.m3u8 \
    -vf scale=w=842:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename ${outputPath}/480p_%03d.ts ${outputPath}/480p.m3u8 \
    -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -hls_segment_filename ${outputPath}/720p_%03d.ts ${outputPath}/720p.m3u8 \
    -vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k -hls_segment_filename ${outputPath}/1080p_%03d.ts ${outputPath}/1080p.m3u8`

    // This is converter code and can be design in distributed way
    exec(ffmpegCommand, (error, stdout, stderr) =>{
        if(error){
            console.error(`[ERROR] exec error: ${error}`)
            res.json({"error": "Error while processing your file. Please try again."});
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        fs.copyFileSync('./playlist.m3u8', `${outputPath}/playlist.m3u8`);

        const videoUrl = `http://localhost:8000/uploads/hls-videos/${videoId}/playlist.m3u8`

        try{
            storelink(videoUrl);
        } catch(error){
            console.error(`[ERROR] error while storing video URL: ${error}`);
            res.json({"error": "Error while processing your file. Please try again."})
        }

        res.json({"message": "File uploaded successfully.", videoUrl: videoUrl, videoId: videoId})
    })
}