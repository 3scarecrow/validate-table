const bodyParser = require('body-parser')
const mockRouter = require('./router-api')
module.exports = app => {
  app.use(bodyParser.json())

  app.use('/mock', mockRouter(app))
}