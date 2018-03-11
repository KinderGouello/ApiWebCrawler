const route = (app, request, cheerio) => {
  app.get('/scorepredictor', (req, res, next) => {
    request.get('http://scorepredictor.net/index.php?section=football', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body, { decodeEntities: false });
      const games = $('.table_dark').first().find('table').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td');
        const equipeDomicile = children.eq(0).text().trim();

        if (equipeDomicile) {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: children.eq(3).text().trim(),
            predictions: children.eq(5).text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
