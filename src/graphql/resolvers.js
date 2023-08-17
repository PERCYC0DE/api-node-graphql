const { RegularExpression } = require('graphql-scalars');
// Resolvers index
const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const {
  addCategory,
  getCategory,
  getCategories,
} = require('./category.resolvers');

const CategoryNameType = new RegularExpression(
  'CategoryNameType',
  /^[a-zA-Z0-9]{3,8}$/
);

// Define the resolvers, to resolve what is defined in the types
const resolvers = {
  Query: {
    // Products Resolvers
    product: getProduct,
    products: getProducts,
    // Categories Resolvers
    categories: getCategories,
    category: getCategory,
  },
  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  },
};

module.exports = resolvers;
