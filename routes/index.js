const request = require('request');
const cheerio = require('cheerio');

const ROUTES = [
  'zulubet',
  'pronosoft',
  'matchendirect',
  'soccervista',
  'iambettor',
  'soccer1x2',
  'vitibet',
  'soccerwinners',
  'betstudy',
  'madeinfoot',
  'pickforwin',
  'scometixusers',
];

const routerIndex = (app) => {
  ROUTES.forEach((routeFactory) => {
    require(`./${routeFactory}`)(app, request, cheerio); // eslint-disable-line global-require
  });

  return app;
};

module.exports = routerIndex;
