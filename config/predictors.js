const betStudyRoute = require('../routes/predictors/betStudy');
const forebetRoute = require('../routes/predictors/forebet');
const goldenbetRoute = require('../routes/predictors/goldenbet');
const iambettorRoute = require('../routes/predictors/iambettor');
const matchEnDirectRoute = require('../routes/predictors/matchEnDirect');
const zulubetRoute = require('../routes/predictors/zulubet');

module.exports = [
  {
    url: '/betstudy-premiereleague',
    content: 'http://www.betstudy.com/predictions/england/premier-league/',
    route: betStudyRoute,
  },
  {
    url: '/betstudy-primeradivision',
    content: 'http://www.betstudy.com/predictions/spain/primera-division/',
    route: betStudyRoute,
  },
  {
    url: '/betstudy-bundesliga',
    content: 'http://www.betstudy.com/predictions/germany/bundesliga/',
    route: betStudyRoute,
  },
  {
    url: '/betstudy-seriea',
    content: 'http://www.betstudy.com/predictions/italy/serie-a/',
    route: betStudyRoute,
  },
  {
    url: '/betstudy-ligue1',
    content: 'http://www.betstudy.com/predictions/france/ligue-1/',
    route: betStudyRoute,
  },
  {
    url: '/forebet',
    content: 'https://www.forebet.com/fr/previsions-de-football-aujourd-hui',
    route: forebetRoute,
  },
  {
    url: '/goldenbet',
    content: 'https://goldenbet.com/en/',
    route: goldenbetRoute,
  },
  {
    url: '/iambettor',
    content: 'http://www.iambettor.com/',
    route: iambettorRoute,
  },
  {
    url: '/matchendirect',
    content: 'http://www.matchendirect.fr/pronostics/',
    route: matchEnDirectRoute,
  },
  {
    url: '/zulubet',
    content: 'http://www.zulubet.com/',
    route: zulubetRoute,
  },
];
