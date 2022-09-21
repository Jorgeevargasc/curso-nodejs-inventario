const { ObjectId } = require("mongodb");

const { Database } = require("../database");
const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const generateReport = async (name, response) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, response);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport
};
