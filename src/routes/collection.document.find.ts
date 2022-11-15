import { Express } from "express";
import { MongoClient } from "mongodb";

export function Route(app: Express, client: MongoClient) {
    /**
     * Find data that matches a query body 
     * URL Params:
     * - database: string
     * - collection: string
     * Request Body:
     * - any
     */
    app.post('/:database/:collection/find', async (req, res) => {
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
}