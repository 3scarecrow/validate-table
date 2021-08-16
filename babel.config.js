module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@vue/app',
          {
            useBuiltIns: 'usage',
            modules: 'commonjs'
          }
        ]
      ]
    }
  }
}