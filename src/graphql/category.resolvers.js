const CategoryService = require('../services/category.service');
const service = new CategoryService();
const checkRolesGql = require('../utils/checkRolesGql');
const checkJwtGql = require('../utils/checkJwtGql');

const addCategory = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'customer');
  return service.create({
    ...dto,
    image: dto.image.href,
  });
};

const getCategories = async () => {
  return service.find();
};

const getCategory = async (_, { id }) => {
  return service.findOne(id);
};

module.exports = { addCategory, getCategory, getCategories };
