const bet1x2 = require('../../helper/bet1x2');

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.content_table').children('tr').slice(2);
  const results = [];

  games.each((index, element) => {
    const game = $(element).children('td').eq(1).text();

    if (game !== '') {
      const teams = game.split(' - ');

      results.push(Object.assign(
        {
          home_team: teams[0].trim(),
          away_team: teams[1].trim(),
          home_pourcent: parseFloat($(element).find('.prediction_full').eq(0).text()),
          draw_pourcent: parseFloat($(element).find('.prediction_full').eq(1).text()),
          away_pourcent: parseFloat($(element).find('.prediction_full').eq(2).text()),
        },
        bet1x2($(element).children('td').eq(6).text()),
      ));
    }
  });

  return res.send({ results });
};
