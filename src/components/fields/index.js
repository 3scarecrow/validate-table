function getAllColumnComponent() {
  const allComponent = Object.create(null)
  const requireComponent = require.context('./', false, /\.vue$/)
  requireComponent.keys().forEach(filePath => {
    const Module = requireComponent(filePath)
    const component = Module.default || Module
    const name = component.name || (
      filePath.replace(/^.+\//, '')
        .replace(/\.\w+$/, '')
    )
    allComponent[name] = component
  })
  return allComponent
}

export default getAllColumnComponent()
