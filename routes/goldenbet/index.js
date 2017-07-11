const route = (app, request, cheerio) => {
  app.get('/goldenbet', (req, res, next) => {
    request.get('https://goldenbet.com/en/', (err, response, body) => {
      if (err) {
        res.status(502).send({ message: err });
        next();
      }

      const $ = cheerio.load(body);
      const games = $('.uk-table').children('tbody').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td');
        const equipeDomicile = children.eq(1).text().trim();

        if (children.length > 0 && equipeDomicile !== '') {
          results.push({
            equipe_domicile: equipeDomicile,
            equipe_exterieur: children.eq(2).text().trim(),
            prediction: children.eq(3).find('.uk-badge').text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
