import multer from 'multer';
import fs from 'fs';
import path from 'path';


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('destination:');
        const uploadPath = path.join(__dirname, '..', 'videos');
        console.log('uploadPath:', uploadPath);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log('filename:');
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });