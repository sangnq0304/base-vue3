import Repository from '../repository';
const resource = 'products';

export default {
  getProducts() {
    return Repository.get(`${resource}`);
  },
};