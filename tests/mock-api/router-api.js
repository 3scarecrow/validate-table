const router = require('express').Router()
const Mock = require('mockjs')
const delay = require('express-delay')
const { successModel, errorModel } = require('./model')

module.exports = app => {
  app.use(delay(200, 1000))

  router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Request-With'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    )

    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  })

  router.post('/search', (req, res) => {
    if (req.body.error) {
      return res.json('接口返回错误信息')
    }

    const pageSize = req.body.page_size || 20
    const data = Mock.mock({
      [`data|${pageSize}`]: [
        {
          id: '@guid',
          sku: /SKU\d{6}/,
          name: '@ctitle(10, 30)',
          'warehoust|1': ['China', 'USA', 'Japenses'],
          sale_price: '@integer(100, 2000)',
          discount: '@float(0, 0, 1, 99)',
          seller: '@cname',
          date: '@date',
          quantity: '@integer(10, 200)',
          'enable|1': true
        }
      ],
      total: 80
    })
    return res.json(successModel(data))
  })

  return router
}