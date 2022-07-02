import Container from "./Container";
import { ContainerId } from "./types/ContainerId";
import mongoose from "mongoose";

export default class ContainerMongodb implements Container {
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
    schema: mongoose.SchemaType
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
    return await this.Model.findById(ID).exec();
  }

  async getAll(): Promise<object[]> {
    return await this.Model.find().exec();
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    return await this.Model.findByIdAndDelete(ID).exec();
  }

  async deleteAll(): Promise<object> {
    return await this.Model.deleteMany().exec();
  }
}
