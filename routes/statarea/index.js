const route = (app, request, cheerio) => {
  app.get('/statarea', (req, res, next) => {
    request.get('http://www.statarea.com/predictions', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body, { decodeEntities: false });
      const games = $('.predictions').find('.match');
      const results = [];

      games.each((index, element) => {
        const equipe_domicile = $(element).find('.hostteam').find('.name').text().trim();
        const bets = $(element).find('.inforow').find('.coefrow').children('.coefbox');

        if (equipe_domicile) {
          results.push({
            equipe_domicile,
            equipe_exterieur: $(element).find('.guestteam').find('.name').text().trim(),
            domicile: bets.eq(0).text().trim(),
            nul: bets.eq(1).text().trim(),
            exterieur: bets.eq(2).text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
