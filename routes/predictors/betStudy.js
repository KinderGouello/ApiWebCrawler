module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.soccer-table').children('tr').slice(1);

  const results = [];

  games.each((index, element) => {
    const rows = $(element).children('td');
    const game = rows.eq(1).text().trim();

    if (game !== '') {
      const teams = game.split(' - ');

      results.push({
        home_team: teams[0].trim(),
        away_team: teams[1].trim(),
        home_pourcent: parseFloat(rows.eq(2).text().substr(1)),
        draw_pourcent: parseFloat(rows.eq(3).text().substr(1)),
        away_pourcent: parseFloat(rows.eq(4).text().substr(1)),
      });
    }
  });

  return res.send({ results });
};
