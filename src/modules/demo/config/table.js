export default {
  columns: [
    { key: 'id', label: 'ID', width: '80px', align: 'center' },
    { key: 'title', label: 'Product' },
    { key: 'brand', label: 'Brand', width: '140px' },
    { key: 'price', label: 'Price', width: '100px', align: 'right' },
    { key: 'stock', label: 'Stock', width: '100px', align: 'center' },
  ],
  rowActions: [
    { key: 'view', label: 'View' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete', variant: 'danger' },
  ],
}
