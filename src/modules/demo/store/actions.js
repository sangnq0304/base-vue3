import { RepositoryFactory } from '@/repositories/repository-factory'

export default {
  setMessage(newMessage) {
    this.message = newMessage
  },

  async fetchProducts() {
    this.loading = true
    this.error = null

    try {
      const response = await RepositoryFactory.get('demo').getProducts()
      console.log('response', response)
      if (response.success) {
        this.products = response.data?.products ?? []
      }
    } catch (error) {
      this.error = error?.message ?? String(error)
    } finally {
      this.loading = false
    }
  },
}
