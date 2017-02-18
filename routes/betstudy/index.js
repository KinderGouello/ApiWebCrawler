const route = (app, request, cheerio) => {
  const getPredictions = (res, next, url) => {
    request.get(url, (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.soccer-table').children('tr').slice(1);
      const results = [];

      games.each((index, element) => {
        const rows = $(element).children('td');
        const match = rows.eq(1).text().trim();

        if (match !== '') {
          results.push({
            match,
            pari_domicile: rows.eq(2).text(),
            pari_nul: rows.eq(3).text(),
            pari_exterieur: rows.eq(4).text(),
          });
        }
      });

      res.send({ results });
    });
  };

  app.get('/betstudy-premiereleague', (req, res, next) => {
    getPredictions(res, next, 'http://www.betstudy.com/predictions/england/premier-league/');
  });

  app.get('/betstudy-primeradivision', (req, res, next) => {
    getPredictions(res, next, 'http://www.betstudy.com/predictions/spain/primera-division/');
  });

  app.get('/betstudy-bundesliga', (req, res, next) => {
    getPredictions(res, next, 'http://www.betstudy.com/predictions/germany/bundesliga/');
  });

  app.get('/betstudy-seriea', (req, res, next) => {
    getPredictions(res, next, 'http://www.betstudy.com/predictions/italy/serie-a/');
  });

  app.get('/betstudy-ligue1', (req, res, next) => {
    getPredictions(res, next, 'http://www.betstudy.com/predictions/france/ligue-1/');
  });

  return app;
};

module.exports = route;
