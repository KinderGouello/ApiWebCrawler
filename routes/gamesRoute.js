const filterText = require('../helper/filter-text');

const getState = (time, scores) => {
  if (time.length > 0) {
    return 'playing';
  }

  if (scores.length === 1 && scores[0] !== '-') {
    return scores[0];
  }

  return 'over';
};

module.exports = (req, res) => {
  const $ = req.content;
  const games = $('.contenu').find('.row')
    .children('div')
    .eq(1)
    .find('li');

  const mappingCompetitionGames = {};
  let currentCompetition = '';

  games.each((index, element) => {
    const nbChilds = $(element).children().length;

    if (nbChilds < 4) {
      mappingCompetitionGames[filterText($(element).contents())] = [];
      currentCompetition = filterText($(element).contents());
    } else {
      const rows = $(element).children('div');
      const homeTeam = rows.eq(1).text().trim();

      if (homeTeam !== '') {
        const time = rows.eq(0).children('.liveminute').text().trim();
        const scores = rows.eq(2).text().trim().split(' - ');
        const homeScore = parseInt(scores[0], 10);
        const awayScore = parseInt(scores[1], 10);

        mappingCompetitionGames[currentCompetition].push({
          home_team: homeTeam,
          away_team: rows.eq(3).text().trim(),
          day: parseInt(filterText(rows.eq(0).contents()).substr(1), 10),
          state: getState(time, scores),
          home_score: Number.isInteger(homeScore) ? homeScore : null,
          away_score: Number.isInteger(awayScore) ? awayScore : null,
        });
      }
    }
  });

  const results = Object.keys(mappingCompetitionGames)
    .reduce((prev, competition) => [
      ...prev,
      {
        competition,
        games: mappingCompetitionGames[competition],
      },
    ], []);

  return res.send({ results });
};
