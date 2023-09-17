import DemoRepository from './config/demo-repository.js';
const repositories = {
  demo: DemoRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};