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


async function writeFileExample(filePath: string, content: string): Promise<void> {
    try {
      await writeFile(filePath, content, 'utf8');
      console.log('File written successfully');
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)