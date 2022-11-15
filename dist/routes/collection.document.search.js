"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
function Route(app, client) {
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
    app.get('/:database/:collection/search', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const index = yield collection.createIndex({ "$**": "text" });
        const documents = yield collection.find({ $text: { $search: query } }).toArray();
        res.send({
            message: "Documents fetched",
            status: "OK",
            data: documents
        });
    }));
}
exports.Route = Route;
