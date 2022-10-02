const asyncWrapper = require('../middlewares/async');
const Product = require('../models/product');
const filter = require('../utils/filter');
const { UnauthenticatedError } = require('../errors');
const getProducts = asyncWrapper(async (req, res) => {
  let num = await Product.count();
  let filters = filter(req.query);
  console.log(filters);
  const products = await Product.find(filters)
    .skip(req.query.page ? 10 * (req.query.page - 1) : 0)
    .limit(10);
  res.status(200).json({
    status: 'success',
    data: { products },
    page: req.query.page ? Number(req.query.page) : 1,
    nofPages: Math.ceil(num / 10),
    productsPerPage: 10,
    nofProducts: num,
    length: products.length,
  });
});
const getProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id, { productName: true });
  res.status(200).json({ product });
});
const addProduct = asyncWrapper(async (req, res) => {
  const productDetails = { ...req.body, productSeller: req.user.id };
  const product = await Product.create(productDetails);
  res.status(201).json({ product });
});
const patchProduct = asyncWrapper(async (req, res) => {
  const { id: seller } = req.user;
  const { id } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: id, productSeller: seller },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(product);
  if (!product) {
    throw new UnauthenticatedError('Authorization failed.');
  }
  res.status(200).json({ product });
});
const deleteProduct = asyncWrapper(async (req, res) => {
  const { id: seller } = req.user;
  const { id } = req.params;
  const product = await Product.findOneAndDelete({
    _id: id,
    productSeller: seller,
  });
  console.log(product);
  if (!product) {
    throw new UnauthenticatedError('Authorization failed.');
  }
  res.status(200).json({ product });
});

module.exports = {
  getProduct,
  getProducts,
  deleteProduct,
  addProduct,
  patchProduct,
};
