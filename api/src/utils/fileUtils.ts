import { promisify } from 'util';
import * as fs from 'fs';

// Promisify the fs functions for easier async/await usage
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const appendFile = promisify(fs.appendFile);
export const unlink = promisify(fs.unlink);
export const statFile = promisify(fs.stat);
