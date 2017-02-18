const route = (app, request, cheerio) => {
  app.get('/iambettor', (req, res, next) => {
    request.get('http://www.iambettor.com/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.tabulkaquick').find('tr');
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).children('td.standardbunka').eq(0).text()
          .trim();

        if (equipeDomicile !== '') {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).children('td.standardbunka').eq(1).text()
              .trim(),
            pari_domicile: $(element).children('td').eq(5).text(),
            pari_nul: $(element).children('td').eq(6).text(),
            pari_exterieur: $(element).children('td').eq(7).text(),
            pari: $(element).children('td').eq(8).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
