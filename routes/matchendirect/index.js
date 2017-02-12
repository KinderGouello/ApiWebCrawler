const route = (app, request, cheerio) => {
  app.get('/matchendirect', (req, res, next) => {
    request.get('http://www.matchendirect.fr/pronostics/', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('#bloc_pronostic').find('.tableau').children('tr').slice(1)
      let results = []

      games.each((index, element) => {
        const equipe_domicile = $(element).children('td').eq(2).text()

        if (equipe_domicile !== '') {
          results[index] = {
            equipe_domicile: equipe_domicile,
            equipe_exterieur: $(element).children('td').eq(4).text(),
            pari: $(element).find('.pi').text()
          }
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
