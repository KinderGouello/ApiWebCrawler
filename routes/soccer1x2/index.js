const route = (app, request, cheerio) => {
  app.get('/soccer1x2', (req, res, next) => {
    request.get('http://soccer1x2.net/', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.tbl').children('tr').slice(1)
      let results = []

      games.each((index, element) => {
        const match = $(element).children('td').eq(3).text().trim()

        if (match !== '') {
          results.push({
            match: match,
            pari_domicile: $(element).children('td').eq(4).text(),
            pari_nul: $(element).children('td').eq(5).text(),
            pari_exterieur: $(element).children('td').eq(6).text(),
            pari: $(element).children('td').eq(7).text()
          })
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
