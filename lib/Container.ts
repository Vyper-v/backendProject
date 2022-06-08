import { writeFile, readFile, mkdir, access } from "fs/promises";
import { constants } from "fs";
import path from "path";
import item from "./item";

class Container {
  JSONSpaces: number;
  dirname: string;
  filename: string;
  lastId: number;

  constructor(name: string, minify: boolean = false) {
    this.JSONSpaces = minify ? 0 : 1;
    this.dirname = path.join(__dirname, "data");
    this.filename = path.join(this.dirname, name + ".json");
    this.lastId = 0;
    this.init();
  }

  async init() {
    await mkdir(this.dirname, { recursive: true });
    const data = await readFile(this.filename, "utf8");
    if ((await this.fileExists()) === false || data === "") {
      await writeFile(this.filename, "[]");
    }
  }

  async fileExists(): Promise<boolean> {
    let exists = true;
    try {
      await access(this.filename, constants.F_OK);
    } catch (e) {
      exists = false;
    }
    return exists;
  }

  async save(Data: object) {
    const parsedData = { ...Data, id: ++this.lastId };

    if (await this.fileExists()) {
      const data = await this.getAll();

      if (data.length > 0) {
        this.lastId = data[data.length - 1].id;
        parsedData.id = ++this.lastId;
      }

      const newData = JSON.stringify(
        [...data, parsedData],
        null,
        this.JSONSpaces
      );

      await writeFile(this.filename, newData);
    } else {
      parsedData.id = this.lastId = 1;
      await writeFile(
        this.filename,
        JSON.stringify([parsedData], null, this.JSONSpaces)
      );
    }
    return this.lastId;
  }

  async replace(ID: number, Data: object) {
    const updated = await (
      await this.getAll()
    ).map((item) => {
      return item.id === ID ? { id: ID, ...Data } : item;
    });

    const json = JSON.stringify(updated, null, this.JSONSpaces);

    await writeFile(this.filename, json);
  }

  async update(ID: number, Data: object) {
    let updatedData = null;

    const updated = await (
      await this.getAll()
    ).map((item) => {
      if (item.id === ID) {
        updatedData = { ...item, ...Data };
        return { ...item, ...Data };
      }
      return item;
    });

    const json = JSON.stringify(updated, null, this.JSONSpaces);

    await writeFile(this.filename, json);
    return updatedData;
  }

  async getById(ID: number) {
    const data = await this.getAll();
    return data.find(({ id }) => id === ID) || null;
  }

  async getAll(): Promise<item[]> {
    const res = await readFile(this.filename, "utf8");
    if (res !== "") return JSON.parse(res);
    await writeFile(this.filename, "[]");
    return await this.getAll();
  }

  async deleteById(ID: number) {
    let removedData = null;
    const oldData = await this.getAll();

    if (oldData.length === 0) {
      return removedData;
    }

    const newData = oldData.filter((item) => {
      if (item.id === this.lastId) {
        removedData = item;
        this.lastId--;
      }
      return item.id !== ID;
    });
    await writeFile(
      this.filename,
      JSON.stringify(newData, null, this.JSONSpaces)
    );
    return removedData;
  }

  async deleteAll() {
    this.lastId = 0;
    await writeFile(this.filename, "[]");
  }
}

export default Container;
