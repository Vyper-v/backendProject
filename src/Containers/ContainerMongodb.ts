import AbstractContainer from "./AbstractContainer";
import { ContainerId } from "./types/ContainerId";
import mongoose from "mongoose";

export default class ContainerMongodb implements AbstractContainer {
  collection: string;
  connectionURL: string;
  db: mongoose.Connection;
  modelName: string;
  schema: mongoose.Schema;
  Model: mongoose.Model<mongoose.Document>;

  constructor(
    collection: string,
    connectionURL: string,
    modelName: string,
    schema: mongoose.SchemaDefinition
  ) {
    this.collection = collection;
    this.connectionURL = connectionURL;
    this.modelName = modelName;
    this.schema = new mongoose.Schema(schema);
    this.db = mongoose.createConnection(connectionURL);
    this.Model = this.db.model(modelName, this.schema, collection);
  }

  async save(Data: object): Promise<object> {
    return await this.Model.create(Data);
  }

  async update(ID: ContainerId, Data: object): Promise<object | null> {
    return await this.Model.findByIdAndUpdate(ID, Data).exec();
  }

  async getById(ID: ContainerId): Promise<object | null> {
    try {
      return await this.Model.findById(ID).exec();
    } catch (error) {
      return null;
    }
  }

  async getAll(): Promise<object[]> {
    try {
      return await this.Model.find().exec();
    } catch (e) {
      return [];
    }
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    try {
      return await this.Model.findByIdAndDelete(ID).exec();
    } catch {
      return null;
    }
  }

  async deleteAll(): Promise<object> {
    try {
      return await this.Model.deleteMany().exec();
    } catch (e) {
      return {};
    }
  }
}
