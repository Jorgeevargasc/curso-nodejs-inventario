const debug = require("debug")("app:module-users-controller");
const createHttpError = require("http-errors");

const { UsersService } = require("./services");
const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (request, response) => {
    try {
      let products = await UsersService.getAll();
      Response.success(response, 200, "Lista de usuarios", products);
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
  getUser: async (request, response) => {
    try {
      const {
        params: { id },
      } = request;
      let product = await UsersService.getById(id);
      if (!product) {
        Response.error(response, new createHttpError.NotFound());
      } else {
        Response.success(response, 200, "User", product);
      }
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  },
  createUser: async (request, response) => {
    try {
      const { body } = request;
      if (!body || Object.keys(body).length === 0) {
        Response.error(response, new createHttpError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(response, 200, "Usuario creado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(response);
    }
  }
};
