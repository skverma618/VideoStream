import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

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

export const uploadVideo = async (req: any, res: any) => {
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