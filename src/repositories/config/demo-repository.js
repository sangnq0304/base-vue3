import Repository from '../repository';

const resource = 'products';

export default {
    getProducts() {
        return Repository.get(resource);
    },

    getProduct(id) {
        return Repository.get(`${resource}/${id}`);
    },

    createProduct(data) {
        return Repository.post(resource, data);
    },

    updateProduct(id, data) {
        return Repository.put(`${resource}/${id}`, data);
    },

    deleteProduct(id) {
        return Repository.delete(`${resource}/${id}`);
    },
};
