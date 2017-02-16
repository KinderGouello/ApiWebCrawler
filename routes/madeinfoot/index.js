const route = (app, request, cheerio) => {
  const filterOnlyText = (node) => {
    return node.filter(function() {
      return this.type === 'text';
    }).text().trim()
  }

  app.get('/madeinfoot', (req, res, next) => {
    request.get('http://www.madeinfoot.com/live/match-en-direct.php', (err, response, body) => {
      const $ = cheerio.load(body)
      const games = $('.contenu').find('.row').children('div').eq(1).find('li')
      let results = []

      games.each((index, element) => {
        const nbChilds = $(element).children().length

        if (nbChilds < 4) {
          results.push({
            competition: filterOnlyText($(element).contents()),
            domicile: '',
            exterieur: '',
            journee: '',
            score: '',
          })
        } else {
          const rows = $(element).children('div')
          const domicile = rows.eq(1).text()

          if (domicile !== '') {
            results.push({
              competition: '',
              domicile: domicile,
              exterieur: rows.eq(3).text(),
              journee: filterOnlyText(rows.eq(0).contents()),
              score: rows.eq(2).text(),
            })
          }
        }
      })

      res.send({ results: results })
    })
  })

  return app
}

module.exports = route
