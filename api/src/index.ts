import express from 'express'
import * as fs from 'fs';


const app = express()
const port = 8000

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
    const filePath = `${videoDirectory}/${videoId}.mp4`;

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