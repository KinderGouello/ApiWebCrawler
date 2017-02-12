const request = require('request')
const cheerio = require('cheerio')
const ROUTES = [
  'zulubet'
]

const routerIndex = (app) => {
  ROUTES.forEach((routeFactory) => {
    require(`./${routeFactory}`)(app, request, cheerio) // eslint-disable-line global-require
  })

  return app
}

module.exports = routerIndex
