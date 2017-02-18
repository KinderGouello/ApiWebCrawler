const route = (app, request, cheerio) => {
  app.get('/matchendirect', (req, res, next) => {
    request.get('http://www.matchendirect.fr/pronostics/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('#bloc_pronostic').find('.tableau').children('tr').slice(1);
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).children('td').eq(2).text();

        if (equipeDomicile !== '') {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).children('td').eq(4).text(),
            pari: $(element).find('.pi').text(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
