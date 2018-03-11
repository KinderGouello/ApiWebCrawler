module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.content_table').children('tr').slice(2);
  const results = [];

  games.each((index, element) => {
    const game = $(element).children('td').eq(1).text();

    if (game !== '') {
      const teams = game.split(' - ');

      results.push({
        home_team: teams[0].trim(),
        away_team: teams[1].trim(),
        home_odds: parseFloat($(element).children('td').eq(9).text()),
        draw_odds: parseFloat($(element).children('td').eq(10).text()),
        away_odds: parseFloat($(element).children('td').eq(11).text()),
      });
    }
  });

  return res.send({ results });
};
