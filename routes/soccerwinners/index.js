const route = (app, request, cheerio) => {
  app.get('/soccerwinners', (req, res, next) => {
    request.get('http://www.soccerwinners.com/match.html', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.Data').children('tr')
      let results = []

      games.each((index, element) => {
        const equipe_domicile = $(element).children('td').eq(1).text().trim()

        if (equipe_domicile !== '') {
          const estimates = $(element).find('.Estimates').find('td');

          results.push({
            equipe_domicile: equipe_domicile,
            equipe_exterieur: $(element).children('td').eq(2).text().trim(),
            pari_domicile: estimates.eq(0).text(),
            pari_nul: estimates.eq(1).text(),
            pari_exterieur: estimates.eq(2).text(),
          })
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
