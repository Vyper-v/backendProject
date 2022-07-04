import AbstractContainer from "./AbstractContainer";
import { ContainerId } from "./types/ContainerId";
import {
  getFirestore,
  Firestore,
  CollectionReference,
} from "firebase-admin/firestore";
import { App, initializeApp, cert } from "firebase-admin/app";

export default class ContainerFirebase implements AbstractContainer {
  app: App;
  db: Firestore;
  collection: CollectionReference;

  constructor(credential: object, collection: string) {
    this.app = initializeApp(
      {
        credential: cert(credential),
      },
      collection
    );

    this.db = getFirestore(this.app);
    this.collection = this.db.collection(collection);
  }

  async save(Data: object): Promise<object> {
    try {
      return await this.collection.add(Data);
    } catch (error) {
      return { error };
    }
  }

  async update(ID: ContainerId, Data: object): Promise<object | null> {
    try {
      const response = await this.collection.doc(String(ID)).update(Data);
      return { ...response, ...Data };
    } catch (error) {
      return null;
    }
  }

  async getById(ID: ContainerId): Promise<object | null> {
    const response = await this.collection.doc(String(ID)).get();
    return response.data() || null;
  }

  async getAll(): Promise<object[]> {
    const response = await this.collection.get();
    const data = response.docs.map((doc) => doc.data());
    return data;
  }

  async deleteById(ID: ContainerId): Promise<object | null> {
    try {
      const response = await this.collection.doc(String(ID)).delete();
      return { ...response, ...{ ID } };
    } catch (error) {
      return null;
    }
  }

  async deleteAll(): Promise<object> {
    const snapshot = await this.collection.get();
    const batch = this.db.batch();
    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
    }
    return await batch.commit();
  }
}
