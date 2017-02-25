const route = (app, request, cheerio) => {
  const filterOnlyText = (node) => {
    return node.filter((index, element) => {
      return element.type === 'text';
    }).text().trim();
  };

  app.get('/madeinfoot', (req, res, next) => {
    request.get('http://www.madeinfoot.com/live/match-en-direct.php', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('.contenu').find('.row').children('div').eq(1)
        .find('li');
      const results = [];

      games.each((index, element) => {
        const nbChilds = $(element).children().length;
        if (nbChilds < 4) {
          results.push({
            competition: filterOnlyText($(element).contents()),
            domicile: '',
            exterieur: '',
            journee: '',
            score: '',
          });
        } else {
          const rows = $(element).children('div');
          const domicile = rows.eq(1).text();

          if (domicile !== '') {
            results.push({
              competition: '',
              domicile,
              exterieur: rows.eq(3).text(),
              journee: filterOnlyText(rows.eq(0).contents()),
              score: rows.eq(2).text(),
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
