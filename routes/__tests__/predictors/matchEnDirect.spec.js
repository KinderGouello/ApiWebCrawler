const cheerio = require('cheerio');
const fs = require('fs');
const matchEnDirectRoute = require('../../predictors/matchEnDirect');

describe('matchEnDirect route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    matchEnDirectRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/matchEnDirect.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          home_team: 'Everton',
          away_team: 'Liverpool',
          home_pourcent: 7,
          draw_pourcent: 15,
          away_pourcent: 78,
          home_bet: false,
          draw_bet: false,
          away_bet: true,
        },
        {
          home_team: 'Cologne',
          away_team: 'FSV Mayence',
          home_pourcent: 74,
          draw_pourcent: 19,
          away_pourcent: 7,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
        {
          home_team: 'Fribourg',
          away_team: 'Wolfsbourg',
          home_pourcent: 40,
          draw_pourcent: 41,
          away_pourcent: 19,
          home_bet: false,
          draw_bet: true,
          away_bet: false,
        },
        {
          home_team: 'Levante',
          away_team: 'Las Palmas',
          home_pourcent: 83,
          draw_pourcent: 12,
          away_pourcent: 5,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
        {
          home_team: 'Salzbourg',
          away_team: 'Lazio',
          home_pourcent: 42,
          draw_pourcent: 30,
          away_pourcent: 28,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
      ],
    });
  });
});
