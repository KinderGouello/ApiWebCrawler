const route = (app, request, cheerio) => {
  app.get('/xpronostic', (req, res, next) => {
    request.get('http://www.xpronostic.com/p/predictions.html', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('#xpronostic1').children('tbody').find('tr');
      const results = [];

      games.each((index, element) => {
        const children = $(element).children('td');
        const testLine = children.eq(0).html();
        const equipeExterieur = children.eq(6).text().trim();

        if (equipeExterieur !== '' && testLine !== '') {
          results.push({
            equipe_domicile: children.eq(2).text().trim(),
            equipe_exterieur: equipeExterieur,
            prediction: children.eq(7).text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
