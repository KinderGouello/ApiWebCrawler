const bet1x2 = require('../../helper/bet1x2');

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.contentmiddle').find('tr');
  const results = [];

  games.each((index, element) => {
    const children = $(element).children('td').not('.caption');
    const game = children.eq(0).find('a').html();

    if (children.length > 3 && game !== '') {
      const teams = game.split('<br> ');

      results.push(Object.assign(
        {
          home_team: teams[0].trim(),
          away_team: teams[1].trim(),
          home_pourcent: parseFloat(children.eq(1).text().trim()),
          draw_pourcent: parseFloat(children.eq(2).text().trim()),
          away_pourcent: parseFloat(children.eq(3).text().trim()),
        },
        bet1x2(children.eq(4).text().trim()),
      ));
    }
  });

  return res.send({ results });
};
