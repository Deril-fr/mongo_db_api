import { Express } from "express";
import { MongoClient } from "mongodb";

export function Route(app: Express, client: MongoClient) {
    /**
     * Search for documents in a collection
     * URL Params:
     * - database: string
     * - collection: string
     * Query Params:
     * - query: string
     * 
     * Response:
     * - message: string
     * - status: string
     * - data: any[]
     */
    app.get('/:database/:collection/search', async (req, res) => {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const query = req.query.query;
        if (!query) {
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

}