import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ValidateTable from './validate-table'

Vue.use(ElementUI)

ValidateTable.install = function (Vue) {
  Vue.component(ValidateTable.name, ValidateTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  ValidateTable.install(window.Vue)
}

export default ValidateTable