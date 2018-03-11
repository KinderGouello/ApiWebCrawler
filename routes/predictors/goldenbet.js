const bet1x2 = require('../../helper/bet1x2');

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.uk-table').children('tbody').find('tr');
  const results = [];

  games.each((index, element) => {
    const children = $(element).children('td');
    const homeTeam = children.eq(1).text().trim();

    if (children.length > 0 && homeTeam !== '') {
      results.push(Object.assign(
        {
          home_team: homeTeam,
          away_team: children.eq(2).text().trim(),
        },
        bet1x2(children.eq(3).find('.uk-badge').text().trim()),
      ));
    }
  });

  return res.send({ results });
};
