const express = require('express');
const {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct,
} = require('../controllers/product');
const auth = require('../middlewares/auth');
const routes = express.Router();

routes.route('/products').get(getProducts).post(auth, addProduct);
routes
  .route('/products/:id')
  .get(getProduct)
  .patch(auth, patchProduct)
  .delete(auth, deleteProduct);

module.exports = routes;
