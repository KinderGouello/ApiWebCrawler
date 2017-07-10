const route = (app, request, cheerio) => {
  app.get('/pickforwin', (req, res, next) => {
    request.get('http://www.pickforwin.com/en/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.tabellahome').children('tbody').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td');
        const pariNul = children.eq(3).text();

        if (children.length > 0 && pariNul !== '') {
          const match = children.eq(1).text()
            .trim();

          if (match !== '') {
            results.push({
              match,
              pari_domicile: children.eq(2).text(),
              pari_nul: pariNul,
              pari_exterieur: children.eq(4).text(),
            });
          }
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
