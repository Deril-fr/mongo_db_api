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
     * Find data that matches a query body
     * URL Params:
     * - database: string
     * - collection: string
     * Request Body:
     * - any
     */
    app.post('/:database/:collection/find', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const body = req.body;
        const documents = yield collection.find(body).toArray();
        res.send({
            message: "Documents fetched",
            status: "OK",
            data: documents
        });
    }));
}
exports.Route = Route;
