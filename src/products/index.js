const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();

module.exports.ProductsApi = (app) => {
    router
        .get("/", ProductsController.getProducts)
        .get("/report", ProductsController.generateReport)
        .get("/:id", ProductsController.getProduct)
        .post("/", ProductsController.createProduct);

    app.use("/api/products", router);
};