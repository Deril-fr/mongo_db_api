import { Express } from "express";
import { MongoClient, ObjectId } from "mongodb";

export function Route(app: Express, client: MongoClient) {

    /**
     * Create a new document in a collection
     * Or create a new collection in a database if the collection does not exist
     * Or create a new database if the database does not exist and the collection does not exist
     */
    app.post('/:database/:collection', async (req, res) => {
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

    // Get a document by its id
    app.get('/:database/:collection/document/:id', async (req, res) => {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const document = await collection.findOne({_id: new ObjectId(req.params.id)});
        res.send({
            message: "Document fetched",
            status: "OK",
            data: document
        });
    
    });

    /**
     * Update a document by its id
     */
    app.put('/:database/:collection/document/:id', async (req, res) => {
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

    /**
     * Delete a document by its id
     */
    app.delete('/:database/:collection/document/:id', async (req, res) => {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const document = await collection.findOne({_id: new ObjectId(req.params.id)});
        if(document){
        const deletedDocument = await collection.deleteOne({_id: document._id });
        res.send({
            message: "Document deleted",
            status: "OK",
            data: deletedDocument
        });
        }else{
            res.send({
            message: "Document not found",
            status: "OK",
            data: {}
        });
        }
    });

    /**
     * Delete a document by it's body (query)
     * This is a dangerous operation 
     * It will delete all documents that match the query
     * It will delete all documents if the query is {} (empty object)
     */

    app.delete('/:database/:collection', async (req, res) => {
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

}