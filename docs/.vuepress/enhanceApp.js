export default ({ Vue }) => {
  import('../../src/index')
    .then(module => {
      const ValidateTable = module.default
      Vue.use(ValidateTable)
    })
    .catch(e => { })
}
