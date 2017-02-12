const route = (app, request, cheerio) => {
  app.get('/concours-pronosoft', (req, res, next) => {
    request.get('http://www.pronosoft.com/fr/concours/loto-foot-15/repartition/', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.repart').children('tr')
      let results = []

      games.each((index, element) => {
        const equipe_domicile = $(element).children('td').eq(1).text()

        if (equipe_domicile !== '') {
          results[index] = {
            equipe_domicile: equipe_domicile,
            equipe_exterieur: $(element).children('td').eq(2).text(),
            pari_domicile: $(element).children('td').eq(3).text(),
            pari_nul: $(element).children('td').eq(4).text(),
            pari_exterieur: $(element).children('td').eq(5).text()
          }
        }
      })

      res.send({ results: results })
    })
  })

  app.get('/cyborg-pronosoft', (req, res, next) => {
    request.get('http://www.pronosoft.com/fr/bookmakers/pronostics/', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.match-row')
      let results = []

      games.each((index, element) => {
        const match = $(element).children('td').eq(1).text()

        if (match !== '') {
          results[index] = {
            match: match,
            pari_domicile: $(element).children('td').eq(2).text(),
            pari_nul: $(element).children('td').eq(3).text(),
            pari_exterieur: $(element).children('td').eq(4).text()
          }
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
