const route = (app, request, cheerio) => {
  app.get('/zulubet', (req, res, next) => {
    request.get('http://www.zulubet.com/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.content_table').children('tr').slice(2);
      const results = [];

      games.each((index, element) => {
        const match = $(element).children('td').eq(1).text();

        if (match !== '') {
          results.push({
            match: $(element).children('td').eq(1).text(),
            pari_domicile: $(element).find('.prediction_full').eq(0).text(),
            pari_nul: $(element).find('.prediction_full').eq(1).text(),
            pari_exterieur: $(element).find('.prediction_full').eq(2).text(),
            pari: $(element).children('td').eq(6).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  const getCotes = (res, next, url) => {
    request.get(url, (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.content_table').children('tr').slice(2);
      const results = [];

      games.each((index, element) => {
        const match = $(element).children('td').eq(1).text();

        if (match !== '') {
          results.push({
            match: $(element).children('td').eq(1).text(),
            cote_domicile: $(element).children('td').eq(9).text(),
            cote_nul: $(element).children('td').eq(10).text(),
            cote_exterieur: $(element).children('td').eq(11).text(),
          });
        }
      });

      res.send({ results });
    });
  };

  app.get('/zulubet-cotes', (req, res, next) => {
    getCotes(res, next, 'http://www.zulubet.com/');
  });

  app.get('/zulubet-cotes/:date', (req, res, next) => {
    getCotes(res, next, `http://www.zulubet.com/tips-${req.params.date}.html`);
  });

  return app;
};

module.exports = route;
