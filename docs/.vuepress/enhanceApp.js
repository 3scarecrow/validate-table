import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default ({ Vue }) => {
  Vue.use(ElementUI)
  import('../../src/index')
    .then(module => {
      const ValidateTable = module.default
      Vue.use(ValidateTable)
    })
    .catch(e => { })
}
