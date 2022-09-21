const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");
const { Response } = require("../common/response");
const createHttpError = require("http-errors");
const { request, response } = require("express");

module.exports.ProductsController = {
  getProducts: async (request, response) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(response, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
  getProduct: async (request, response) => {
    try {
      const {
        params: { id },
      } = request;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(response, new createHttpError.NotFound());
      } else {
        Response.success(response, 200, "Product", product);
      }
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
  createProduct: async (request, response) => {
    try {
      const { body } = request;
      if (!body || Object.keys(body).length === 0) {
        Response.error(response, new createHttpError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(response, 200, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
  generateReport: (request, response) => {
    try {
      ProductsService.generateReport("Inventario", response);
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
};
