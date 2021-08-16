import './import-element-ui'
import ValidateTable from './validate-table'

function bindInstall(name, component) {
  const install = vue => vue.component(name, component)

  component.install = install

  window && window.Vue && install(window.Vue)

  return component
}

export default bindInstall(ValidateTable.name, ValidateTable)