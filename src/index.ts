import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import { Route } from './types';
import { join } from 'path';
const app = express();
const port = 2875;

const url = 'mongodb://localhost:25367';

const client = new MongoClient(url);
app.use(express.json());

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

app.use(async(req, res, next) => {
    const token = req.headers['x-access-token'];
    next();
});

/**
 * Load all routes
 * @param app Express app instance
 * @param client MongoDB client instance
 */
fs.readdirSync(join(__dirname, 'routes')).forEach(async file => {
    console.log(`Loading route ${file}`);
    if (file.endsWith('.js')) {
        const route =  (await import(`./routes/${file}`)).Route as Route;
        route(app, client);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
