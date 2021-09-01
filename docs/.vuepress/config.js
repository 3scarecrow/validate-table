const path = require('path')

module.exports = {
  title: 'validate-table',
  base: '/validate-table/',
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
        title: 'ValidateTable',
        children: [
          ['/dev/props.md', 'Props'],
          ['/dev/prop-table-columns.md', 'Prop: tableColumns'],
          ['/dev/methods-and-events.md', 'Methods & Events']
        ]
      },
      {
        title: 'DEMO',
        children: [
          ['/demo/validate.md', '校验'],
          ['/demo/basic.md', '基础表格'],
        ]
      },
    ]
  }
}