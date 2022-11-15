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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const app = (0, express_1.default)();
const port = 2875;
const url = 'mongodb://localhost:25367';
const client = new mongodb_1.MongoClient(url);
app.use(express_1.default.json());
/**
 * Middleware to allow cross-origin requests
 * @param req
 * @param res
 * @param next
 * @constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * @see https://expressjs.com/en/resources/middleware/cors.html
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
/**
 * Middleware to check token
 * @param req
 * @param res
 * @param next
 */
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-access-token'];
    next();
}));
/**
 * Load all routes
 * @param app Express app instance
 * @param client MongoDB client instance
 */
fs_1.default.readdirSync((0, path_1.join)(__dirname, 'routes')).forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Loading route ${file}`);
    if (file.endsWith('.js')) {
        const route = (yield Promise.resolve().then(() => __importStar(require(`./routes/${file}`)))).Route;
        route(app, client);
    }
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
