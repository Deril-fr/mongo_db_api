import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 2875;

const url = 'mongodb://localhost:25367';

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(async(req, res, next) => {
    const token = req.headers['x-access-token'];
    next();
});



app.get('/', (req, res) => {
    res.send({
        message: "API seem to work",
        status: "OK"
    });
});

// create a new database 

app.post('/:database', async(req, res) => {
    const client = await MongoClient.connect(url);
    const db = client.db(req.params.database);
    res.send({
        message: 'Database created successfully',
        database: req.params.database
    });
});

// create a new collection

app.post('/:database/:collection', async (req, res) => {
    const client = await MongoClient.connect(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    res.send({
        message: 'Collection created successfully',
        collection: req.params.collection
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});