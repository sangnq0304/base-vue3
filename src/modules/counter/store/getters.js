export default {
  OddOrEven: (state) => {
    if (state.count % 2 === 0) return 'even'
    return 'odd'
  }
}