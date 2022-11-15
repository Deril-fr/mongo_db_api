"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
/**
 * Entry point for the REST API.
 * @param app Express app
 */
function Route(app) {
    app.get('/', (req, res) => {
        res.send({
            message: "API seem to work",
            status: "OK"
        });
    });
}
exports.Route = Route;
