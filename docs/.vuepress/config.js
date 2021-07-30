const path = require('path')

module.exports = {
  title: 'validate-table',
  base: '/validate-table',
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, '../../src')
        }
      }
    }
  },

  themeConfig: {
    repo: '3scarecrow/validate-table',
    lastUpdated: '上次更新',
    docsDir: 'docs',
    sidebar: [
      {
        title: 'DEMO',
        children: [
          '/demo/default',
        ]
      },
    ]
  }
}