const express = require('express');
const createHttpError = require('http-errors');

const { Response } = require('../common/response');

module.exports.IndexApi = (app) => {
    const router = express.Router();

    router.get("/", (request, response) => {
        const menu = {
            products: `https//${request.headers.host}/api/products`,
            users: `https//${request.headers.host}/api/users`
        }
        Response.success(response, 200, "API Inventario", menu);
    });

    app.use("/", router);
}

module.exports.NotFoundApi = (app) => {
    const router = express.Router();

    router.all("*", (request, response) => {
        Response.error(response, new createHttpError.NotFound());
    });

    app.use("/", router);
}