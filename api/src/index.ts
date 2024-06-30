import express from 'express'
import * as fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express()
const port = 8000

app.use(cors());
app.use(express.json());

const currentDir = __dirname;

app.get('/', (req, res) => {
    res.send('Video Stream API Running!!')
})

app.get('/video/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const range = req.headers.range;

    if (!videoId) {
        return res.status(400).send('No videoId provided')
    }

    if (!range) {
        return res.status(416).send('Range not satisfied');
    }

    const videoDirectory = 'videos';
    const fileName = `Creating a Powerful Admin Panel with admin.js.mp4`;
    const filePath = path.join(currentDir, videoDirectory, fileName);

    const stats = await fs.statSync(filePath);
    const videoSize = stats.size;
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(filePath, { start, end });

    videoStream.pipe(res);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})