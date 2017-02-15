const route = (app, request, cheerio) => {
  app.get('/soccervista', (req, res, next) => {
    request.get('http://www.soccervista.com/', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.main').children('tr:not(.headupa):not(.headupe)')
      let results = []

      games.each((index, element) => {
        const equipe_domicile = $(element).children('td').eq(2).text().trim()

        if (equipe_domicile !== '') {
          results.push({
            equipe_domicile: equipe_domicile,
            equipe_exterieur: $(element).children('td').eq(4).text().trim(),
            pari: $(element).children('td').eq(9).text()
          })
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
