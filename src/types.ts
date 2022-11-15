import { Express } from "express";
import { MongoClient } from "mongodb";

export type Route = (app: Express, client: MongoClient) => void;