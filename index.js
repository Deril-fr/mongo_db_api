import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

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

// create a new collection

app.post('/:database/:collection', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const body = req.body;
    if(JSON.stringify(body).length > 0) {
        collection.insertOne(body);
        res.send({
            message: "Collection created",
            status: "OK",
            data: await collection.insertOne(body)
        });
    }else{
        res.send({
            message: "Collection created",
            status: "OK",
            data: await collection.insertOne({})
        });
    }
});

// get all collections

app.get('/:database', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collections = db.listCollections().toArray();
    console.log(collections);
    res.send({
        message: "Collections fetched",
        status: "OK",
        data: collections
    });
});

// get all documents in a collection

app.get('/:database/:collection', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const documents = await collection.find({}).toArray();
    res.send({
        message: "Documents fetched",
        status: "OK",
        data: documents
    });
});

// get a document by id

app.get('/:database/:collection/document/:id', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const document = await collection.findOne({_id: new ObjectId(req.params.id)});
    res.send({
        message: "Document fetched",
        status: "OK",
        data: document
    });

});

// search for a document

app.get('/:database/:collection/search', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const query = req.query.query;
    if(!query){
         return res.send({
        message: "Document fetched",
        status: "OK",
        data: collection.find({})
    });
}

    // create text index
    const index = await collection.createIndex({ "$**": "text" });
    const documents = await collection.find({ $text: { $search: query } }).toArray();
    res.send({
        message: "Documents fetched",
        status: "OK",
        data: documents
    });
});

// finds documents by a body

app.post('/:database/:collection/find', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const body = req.body;
    const documents = await collection.find(body).toArray();
    res.send({
        message: "Documents fetched",
        status: "OK",
        data: documents
    });
});

// update a document by id

app.put('/:database/:collection/document/:id', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const document = await collection.findOne({_id: new ObjectId(req.params.id)});
    const body = req.body;
    const updatedDocument = await collection.updateOne({_id: new ObjectId(req.params.id)}, {$set: body});
    res.send({
        message: "Document updated",
        status: "OK",
        data: updatedDocument
    });

});

// delete a document by id

app.delete('/:database/:collection/document/:id', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const document = await collection.findOne({_id: new ObjectId(req.params.id)});
    const deletedDocument = await collection.deleteOne({_id: document._id });
    res.send({
        message: "Document deleted",
        status: "OK",
        data: deletedDocument
    });

});

// delete a collection by data 

app.delete('/:database/:collection', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const body = req.body;
    const deletedDocument = await collection.deleteOne(body);
    res.send({
        message: "Document deleted",
        status: "OK",
        data: deletedDocument
    });
});

// delete a collection

app.delete('/:database/:collection', async (req, res) => {
    const client = new MongoClient(url);
    const db = client.db(req.params.database);
    const collection = db.collection(req.params.collection);
    const deletedCollection = await collection.drop();
    res.send({
        message: "Collection deleted",
        status: "OK",
        data: deletedCollection
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
