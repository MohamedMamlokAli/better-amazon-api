const filter = (query) => {
  let { productName, min, max, productSeller, stars, productCategory } = query;

  let filter = {};

  if (productName) {
    filter.productName = { $regex: productName, $options: 'i' };
  }
  if (min) {
    filter.productPrice = { ...filter.productPrice, $gte: min };
  }
  if (max) {
    filter.productPrice = { ...filter.productPrice, $lte: max };
  }
  if (productSeller) {
    filter.productSeller = productSeller;
  }
  if (stars) {
    filter.rating = { stars };
  }
  if (productCategory) {
    filter.productCategory = productCategory;
  }

  return filter;
};

module.exports = filter;
