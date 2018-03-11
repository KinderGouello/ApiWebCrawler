const bet1x2 = require('../../helper/bet1x2');

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.tabulkaquick').find('tr');
  const results = [];

  games.each((index, element) => {
    const homeTeam = $(element).children('td.standardbunka').eq(0).text()
      .trim();

    if (homeTeam !== '') {
      const elements = $(element).children('td');

      results.push(Object.assign(
        {
          home_team: homeTeam,
          away_team: $(element).children('td.standardbunka').eq(1).text()
            .trim(),
          home_pourcent: parseFloat(elements.eq(5).text().trim()) || null,
          draw_pourcent: parseFloat(elements.eq(6).text().trim()) || null,
          away_pourcent: parseFloat(elements.eq(7).text().trim()) || null,
        },
        bet1x2(elements.eq(8).text().trim()),
      ));
    }
  });

  return res.send({ results });
};
