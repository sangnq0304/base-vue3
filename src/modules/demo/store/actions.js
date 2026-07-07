import { RepositoryFactory } from '@/repositories/repository-factory'

const demoRepository = RepositoryFactory.get('demo')

export default {
  setMessage(newMessage) {
    this.message = newMessage
  },

  async fetchProducts() {
    this.loading = true
    this.error = null

    try {
      const response = await demoRepository.getProducts()
      if (response.success) {
        this.products = response.data?.products ?? []
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    } finally {
      this.loading = false
    }
  },

  async fetchProduct(id) {
    this.error = null

    try {
      const response = await demoRepository.getProduct(id)
      if (response.success) {
        return response.data
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    }

    return null
  },

  async createProduct(payload) {
    this.error = null

    try {
      const response = await demoRepository.createProduct(payload)
      if (response.success) {
        this.products.unshift(response.data)
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    }
  },

  async updateProduct(id, payload) {
    this.error = null

    try {
      const response = await demoRepository.updateProduct(id, payload)
      if (response.success) {
        const index = this.products.findIndex((item) => item.id === id)
        if (index >= 0) {
          this.products[index] = response.data
        }
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    }
  },

  async deleteProduct(id) {
    this.error = null

    try {
      const response = await demoRepository.deleteProduct(id)
      if (response.success) {
        this.products = this.products.filter((item) => item.id !== id)
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    }
  },
}
