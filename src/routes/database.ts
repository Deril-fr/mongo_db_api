import { Express } from "express";
import { MongoClient } from "mongodb";
/**
 * Fetch a Database and its collections
 * @param {Express} app - Express app
 * @param {MongoClient} client - MongoDB client
 */
export function Route(app: Express, client: MongoClient) {
    app.get('/:database', async (req, res) => {
        const db = client.db(req.params.database);
        const collections = db.listCollections().toArray();
        console.log(collections);
        res.send({
            message: "Collections fetched",
            status: "OK",
            data: collections
        });
    });
}