import { Express } from "express";
import { MongoClient } from "mongodb";

export function Route(app: Express, client: MongoClient) {
    /**
     * Fetch a Database and its collections and documents
     */
    app.get('/:database/:collection', async (req, res) => {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const documents = await collection.find({}).toArray();
        res.send({
            message: "Documents fetched",
            status: "OK",
            data: documents
        });
    });
    
    /**
     * Delete a collection and its documents
     */

    app.delete('/:database/:collection', async (req, res) => {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const deletedCollection = await collection.drop();
        res.send({
            message: "Collection deleted",
            status: "OK",
            data: deletedCollection
        });
    });
}