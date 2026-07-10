import DemoRepository from './config/demo-repository.js';

const repositories = {
    demo: DemoRepository,
};

export const RepositoryFactory = {
    get(name) {
        if (!repositories[name]) {
            throw new Error(`Repository "${name}" is not registered.`);
        }
        return repositories[name];
    },
};
