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
const mongodb_1 = require("mongodb");
function Route(app, client) {
    /**
     * Create a new document in a collection
     * Or create a new collection in a database if the collection does not exist
     * Or create a new database if the database does not exist and the collection does not exist
     */
    app.post('/:database/:collection', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const body = req.body;
        if (JSON.stringify(body).length > 0) {
            collection.insertOne(body);
            res.send({
                message: "Collection created",
                status: "OK",
                data: yield collection.insertOne(body)
            });
        }
        else {
            res.send({
                message: "Collection created",
                status: "OK",
                data: yield collection.insertOne({})
            });
        }
    }));
    // Get a document by its id
    app.get('/:database/:collection/document/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const document = yield collection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        res.send({
            message: "Document fetched",
            status: "OK",
            data: document
        });
    }));
    /**
     * Update a document by its id
     */
    app.put('/:database/:collection/document/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const document = yield collection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        const body = req.body;
        const updatedDocument = yield collection.updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: body });
        res.send({
            message: "Document updated",
            status: "OK",
            data: updatedDocument
        });
    }));
    /**
     * Delete a document by its id
     */
    app.delete('/:database/:collection/document/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const document = yield collection.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (document) {
            const deletedDocument = yield collection.deleteOne({ _id: document._id });
            res.send({
                message: "Document deleted",
                status: "OK",
                data: deletedDocument
            });
        }
        else {
            res.send({
                message: "Document not found",
                status: "OK",
                data: {}
            });
        }
    }));
    /**
     * Delete a document by it's body (query)
     * This is a dangerous operation
     * It will delete all documents that match the query
     * It will delete all documents if the query is {} (empty object)
     */
    app.delete('/:database/:collection', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collection = db.collection(req.params.collection);
        const body = req.body;
        const deletedDocument = yield collection.deleteOne(body);
        res.send({
            message: "Document deleted",
            status: "OK",
            data: deletedDocument
        });
    }));
}
exports.Route = Route;
