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
        const equipeDomicile = $(element).find('.hostteam').find('.name')
          .text()
          .trim();
        const bets = $(element).find('.inforow').find('.coefrow').children('.coefbox');

        if (equipeDomicile) {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).find('.guestteam').find('.name')
              .text()
              .trim(),
            domicile: bets.eq(0).text().trim(),
            nul: bets.eq(1).text().trim(),
            exterieur: bets.eq(2).text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  app.get('/statarea-users', (req, res, next) => {
    request.get('http://www.statarea.com/predictions', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body, { decodeEntities: false });
      const games = $('.predictions').find('.match');
      const results = [];

      games.each((index, element) => {
        const equipeDomicile = $(element).find('.hostteam').find('.name')
          .text()
          .trim();
        const bets = $(element).find('.inforow').find('.userrow');

        if (equipeDomicile) {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: $(element).find('.guestteam').find('.name')
              .text()
              .trim(),
            domicile: bets.find('.vote1').find('.value').text().trim(),
            nul: bets.find('.voteX').find('.value').text().trim(),
            exterieur: bets.find('.vote2').find('.value').text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
