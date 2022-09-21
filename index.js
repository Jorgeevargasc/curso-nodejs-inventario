const express = require('express');
const debug = require('debug')('app:main');

const { Config }  = require('./src/config');
const { ProductsApi } = require('./src/products');
const { UsersApi } = require('./src/users');
const { IndexApi, NotFoundApi } = require('./src/index');

const app = express();

app.use(express.json());

IndexApi(app);
ProductsApi(app);
UsersApi(app);
NotFoundApi(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchandop en http://localhost:${Config.port}`)
});