const route = (app, request, cheerio) => {
  app.get('/soccerwinners', (req, res, next) => {
    request.get('http://www.soccerwinners.com/match.html', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.Data').children('tr');
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).children('td').eq(1).text()
          .trim();

        if (equipeDomicile !== '') {
          const estimates = $(element).find('.Estimates').find('td');

          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).children('td').eq(2).text()
              .trim(),
            pari_domicile: estimates.eq(0).text(),
            pari_nul: estimates.eq(1).text(),
            pari_exterieur: estimates.eq(2).text(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
