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
/**
 * Fetch a Database and its collections
 * @param {Express} app - Express app
 * @param {MongoClient} client - MongoDB client
 */
function Route(app, client) {
    app.get('/:database', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = client.db(req.params.database);
        const collections = db.listCollections().toArray();
        console.log(collections);
        res.send({
            message: "Collections fetched",
            status: "OK",
            data: collections
        });
    }));
}
exports.Route = Route;
