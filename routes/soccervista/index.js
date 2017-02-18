const route = (app, request, cheerio) => {
  app.get('/soccervista', (req, res, next) => {
    request.get('http://www.soccervista.com/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.main').children('tr:not(.headupa):not(.headupe)');
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).children('td').eq(2).text()
          .trim();

        if (equipeDomicile !== '') {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).children('td').eq(4).text()
              .trim(),
            pari: $(element).children('td').eq(9).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
