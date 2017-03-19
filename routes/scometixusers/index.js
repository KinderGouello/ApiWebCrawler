const route = (app, request, cheerio) => {
  app.get('/scometixusers', (req, res, next) => {
    request.get('http://fr.scometix.com/predictions-utilisateurs/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.BoxPrediction').children('li');
      const results = [];

      games.each((index, element) => {
        const game = $(element).find('.Teams .summary').text().trim();

        if (game !== '') {
          results.push({
            match: game,
            prediction: $(element).find('.Prevision').text().trim(),
          });
        }
      });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
