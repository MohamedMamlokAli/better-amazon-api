const express = require('express');
const {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct,
} = require('../controllers/product');
const routes = express.Router();

routes.route('/products').get(getProducts).post(addProduct);
routes
  .route('/products/:id')
  .get(getProduct)
  .patch(patchProduct)
  .delete(deleteProduct);

module.exports = routes;
