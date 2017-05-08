const route = (app, request, cheerio) => {
  app.get('/predictz', (req, res, next) => {
    request.get('http://www.predictz.com/predictions/', (err, response, body) => {
      if (err) {
        next(Object.assign(err, { status: 502 }));
      }

      const $ = cheerio.load(body);
      const games = $('body').text();
      const results = [];

      // console.log(games);

      // games.each((index, element) => {
      //   const game = $(element).find('td.talc').text();
      //   console.log(game);
      //
      // //   if (children.length > 0 && pari_nul != '') {
      // //     const match = children.eq(1).text()
      // //       .trim();
      // //
      // //     if (match !== '') {
      // //       results.push({
      // //         match,
      // //         pari_domicile: children.eq(2).text(),
      // //         pari_nul,
      // //         pari_exterieur: children.eq(4).text(),
      // //       });
      // //     }
      // //   }
      // });

      res.send({ results });
    });
  });

  return app;
};

module.exports = route;
