const bet1x2 = require('../../helper/bet1x2');

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('#bloc_pronostic > div > div > table').find('tr.m');

  const results = [];

  games.each((index, element) => {
    const homeTeam = $(element).children('td').eq(2).text()
      .trim();

    if (homeTeam !== '') {
      const pourcents = $(element).find('table > tr').eq(1).find('td');

      results.push(Object.assign(
        {
          home_team: homeTeam,
          away_team: $(element).children('td').eq(4).text()
            .trim(),
          home_pourcent: parseFloat(pourcents.eq(0).text()),
          draw_pourcent: parseFloat(pourcents.eq(1).text()),
          away_pourcent: parseFloat(pourcents.eq(2).text()),
        },
        bet1x2($(element).find('.prono_progress').text().trim()),
      ));
    }
  });

  return res.send({ results });
};
