const route = (app, request, cheerio) => {
  app.get('/goldenbet', (req, res, next) => {
    request.get('https://goldenbet.com/en/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.uk-table').children('tbody').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td');
        const equipe_domicile = children.eq(1).text().trim();

        if (children.length > 0 && equipe_domicile != '') {
          results.push({
              equipe_domicile,
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
