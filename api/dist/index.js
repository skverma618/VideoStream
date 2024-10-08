"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var Admin_1 = require("./controllers/Admin");
var MulterMiddleware_1 = require("./middlewares/MulterMiddleware");
var serve_index_1 = __importDefault(require("serve-index"));
var app = (0, express_1.default)();
var port = 8000;
// Enable CORS for all origins
app.use((0, cors_1.default)({
    origin: '*',
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length']
}));
app.use(express_1.default.json());
var currentDir = __dirname;
// Make the videos folder publicly accessible
var videoDirectory = path_1.default.join(currentDir, '..', 'media', 'videos');
app.use('/videos', express_1.default.static(videoDirectory), (0, serve_index_1.default)(videoDirectory, { icons: true }));
// app.use('/videos', express.static(path.join(currentDir, 'videos')));
app.get('/', function (req, res) {
    res.send('Video Stream API Running!!');
});
app.get('/api/video/:videoId/:resolution?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var videoId, resolution, range, type, videoDirectory, fileName, filePath, stats, videoSize, parts, start, end, contentLength, headers, videoStream, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                videoId = req.params.videoId || '1';
                resolution = req.params.resolution || '480p';
                console.log("resolution: ".concat(resolution));
                range = req.headers.range;
                if (!videoId) {
                    return [2 /*return*/, res.status(400).send('No videoId provided')];
                }
                if (!range) {
                    return [2 /*return*/, res.status(416).send('Range not satisfied')];
                }
                type = "mp4";
                videoDirectory = 'videos';
                fileName = "".concat(resolution, ".").concat(type);
                console.log("fileName: ".concat(fileName));
                filePath = path_1.default.join(currentDir, videoDirectory, videoId, fileName);
                console.log("filePath: ".concat(filePath));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.promises.stat(filePath)];
            case 2:
                stats = _a.sent();
                videoSize = stats.size;
                parts = range.replace(/bytes=/, "").split("-");
                start = parseInt(parts[0], 10);
                end = Math.min(start + 1000000 - 1, videoSize - 1);
                contentLength = (end - start) + 1;
                headers = {
                    'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(videoSize),
                    'Accept-Ranges': 'bytes',
                    'Content-Length': contentLength,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(206, headers);
                videoStream = fs.createReadStream(filePath, { start: start, end: end });
                videoStream.pipe(res);
                videoStream.on('end', function () {
                    // console.log(`Finished streaming ===> ${fileName}`);
                });
                videoStream.on('error', function (error) {
                    console.error("Error streaming video: ".concat(error));
                    res.status(500).send('Error streaming video');
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error accessing video file: ".concat(error_1));
                res.status(500).send('Error accessing video file');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/upload', MulterMiddleware_1.upload.single('video'), Admin_1.uploadVideo);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
