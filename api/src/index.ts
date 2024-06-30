import express from 'express';
import * as fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 8000;

// This is important that you may miss out on
app.use(cors({
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length']
}));

app.use(express.json());

const currentDir = __dirname;

app.get('/', (req, res) => {
    res.send('Video Stream API Running!!');
});

app.get('/video/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const range = req.headers.range;

    if (!videoId) {
        return res.status(400).send('No videoId provided');
    }

    if (!range) {
        return res.status(416).send('Range not satisfied');
    }

    const videoDirectory = 'videos';
    const fileName = `Creating a Powerful Admin Panel with admin.js.mp4`;
    const filePath = path.join(currentDir, videoDirectory, fileName);

    try {
        const stats = await fs.promises.stat(filePath);
        const videoSize = stats.size;

        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = Math.min(start + 1000000 - 1, videoSize - 1); // 1MB chunk size

        const contentLength = (end - start) + 1;

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(filePath, { start, end });

        videoStream.pipe(res);

        videoStream.on('end', () => {
            console.log(`Finished streaming ===> ${fileName}`);
        });

        videoStream.on('error', (error) => {
            console.error(`Error streaming video: ${error}`);
            res.status(500).send('Error streaming video');
        });
    } catch (error) {
        console.error(`Error accessing video file: ${error}`);
        res.status(500).send('Error accessing video file');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});