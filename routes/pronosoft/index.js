const route = (app, request, cheerio) => {
  app.get('/concours-pronosoft', (req, res, next) => {
    request.get('http://www.pronosoft.com/fr/concours/loto-foot-15/repartition/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.repart').children('tr');
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).children('td').eq(1).text();

        if (equipeDomicile !== '') {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).children('td').eq(2).text(),
            pari_domicile: $(element).children('td').eq(3).text(),
            pari_nul: $(element).children('td').eq(4).text(),
            pari_exterieur: $(element).children('td').eq(5).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  app.get('/cyborg-pronosoft', (req, res, next) => {
    request.get('http://www.pronosoft.com/fr/bookmakers/pronostics/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.match-row');
      const results = [];

      games.each((index, element) => {
        const match = $(element).children('td').eq(1).text();

        if (match !== '') {
          results.push({
            match,
            pari_domicile: $(element).children('td').eq(2).text(),
            pari_nul: $(element).children('td').eq(3).text(),
            pari_exterieur: $(element).children('td').eq(4).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
