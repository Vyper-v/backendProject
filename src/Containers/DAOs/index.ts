type dbchoice = {
  [key: string]: any;
};

export default async function USEDB() {
  const db: dbchoice = {
    MONGODB: {
      CartContainer: await (
        await import("./Cart/CartContainerMongodb")
      ).default,
      ProductContainer: await (
        await import("./Product/ProductContainerMongodb")
      ).default,
    },
    FIREBASE: {
      CartContainer: await (
        await import("./Cart/CartContainerFirebase")
      ).default,
      ProductContainer: await (
        await import("./Product/ProductContainerFirebase")
      ).default,
    },
  };
  return db[process.env.USE_DB || "MONGODB"];
}
