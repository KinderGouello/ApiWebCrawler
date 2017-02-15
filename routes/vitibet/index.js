const route = (app, request, cheerio) => {
  app.get('/vitibet', (req, res, next) => {
    request.get('http://www.vitibet.com/?clanek=quicktips&sekce=fotbal', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.tabulkaquick').find('tr')
      let results = []

      games.each((index, element) => {
        const equipe_domicile = $(element).children('td.standardbunka').eq(1).text().trim()

        if (equipe_domicile !== '') {
          results.push({
            equipe_domicile: equipe_domicile,
            equipe_exterieur: $(element).children('td.standardbunka').eq(2).text().trim(),
            pari_domicile: $(element).children('td').eq(6).text(),
            pari_nul: $(element).children('td').eq(7).text(),
            pari_exterieur: $(element).children('td').eq(8).text(),
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
