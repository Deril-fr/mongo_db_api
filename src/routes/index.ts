import { Express } from "express";

/**
 * Entry point for the REST API.
 * @param app Express app
 */

export function Route(app: Express) {
    app.get('/', (req, res) => {
        res.send({
            message: "API seem to work",
            status: "OK"
        });
    });
}