const route = (app, request, cheerio) => {
  app.get('/forebet', (req, res, next) => {
    request.get('https://www.forebet.com/fr/previsions-de-football-aujourd-hui', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body, { decodeEntities: false });
      const games = $('.contentmiddle').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td').not('.caption');
        const game = children.eq(0).find('a').html();

        if (children.length > 3 && game !== '') {
          results.push({
            match: game,
            domicile: children.eq(1).text().trim(),
            nul: children.eq(2).text().trim(),
            exterieur: children.eq(3).text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
