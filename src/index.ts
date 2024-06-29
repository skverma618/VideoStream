import express from 'express'
import * as fs from 'fs';
import { promisify } from 'util';

// Promisify the fs functions for easier async/await usage
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const unlink = promisify(fs.unlink);

const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
}
)

async function readFileExample(filePath: string): Promise<void> {
    try {
        const data = await readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}


async function writeFileExample(filePath: string, content: string): Promise<void> {
    try {
        await writeFile(filePath, content, 'utf8');
        console.log('File written successfully');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}


async function appendFileExample(filePath: string, content: string): Promise<void> {
    try {
        await appendFile(filePath, content, 'utf8');
        console.log('Content appended successfully');
    } catch (err) {
        console.error('Error appending to file:', err);
    }
}

async function deleteFileExample(filePath: string): Promise<void> {
    try {
        await unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
}


async function main() {
    const filePath = './src/example.txt';
    const content = 'Hello, TypeScript with Node.js!';

    await writeFileExample(filePath, content);
    await appendFileExample(filePath, '\nAppended content.');
    await readFileExample(filePath);
    await deleteFileExample(filePath);
}

main().catch(console.error);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)