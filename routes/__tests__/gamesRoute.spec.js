const cheerio = require('cheerio');
const fs = require('fs');
const gamesRoute = require('../gamesRoute');

describe('games route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    gamesRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/games.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          competition: 'France - Ligue 1',
          games: [
            {
              home_team: 'Saint-Etienne',
              away_team: 'Paris',
              day: 32,
              state: 'over',
              home_score: 1,
              away_score: 1,
            },
            {
              home_team: 'Monaco',
              away_team: 'Nantes',
              day: 32,
              state: 'over',
              home_score: null,
              away_score: null,
            },
          ],
        },
        {
          competition: 'France - Ligue 2',
          games: [
            {
              home_team: 'Quevilly',
              away_team: 'Nîmes',
              day: 32,
              state: 'playing',
              home_score: 1,
              away_score: 3,
            },
            {
              home_team: 'Sochaux',
              away_team: 'Orléans',
              day: 32,
              state: 'over',
              home_score: 3,
              away_score: 2,
            },
          ],
        },
        {
          competition: 'France - National',
          games: [
            {
              home_team: 'Béziers',
              away_team: 'Bastia',
              day: 29,
              state: 'ANN',
              home_score: null,
              away_score: null,
            },
          ],
        },
        {
          competition: 'Angleterre - Championship',
          games: [
            {
              home_team: 'Cardiff City',
              away_team: 'Wolverhampton Wanderers',
              day: 41,
              state: 'over',
              home_score: 0,
              away_score: 1,
            },
          ],
        },
      ],
    });
  });
});
