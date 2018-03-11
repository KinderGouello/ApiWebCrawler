const cheerio = require('cheerio');
const fs = require('fs');
const forebetRoute = require('../../predictors/forebet');

describe('Forebet route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    forebetRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/forebet.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          home_team: 'Ferrocarril Midland',
          away_team: 'Deportivo Armenio',
          home_pourcent: 39,
          draw_pourcent: 40,
          away_pourcent: 21,
          home_bet: false,
          draw_bet: true,
          away_bet: false,
        },
        {
          home_team: 'Fulham FC',
          away_team: 'Leeds United',
          home_pourcent: 50,
          draw_pourcent: 33,
          away_pourcent: 17,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
        {
          home_team: 'Sevilla FC',
          away_team: 'Bayern Munchen',
          home_pourcent: 18,
          draw_pourcent: 37,
          away_pourcent: 46,
          home_bet: false,
          draw_bet: false,
          away_bet: true,
        },
        {
          home_team: 'Ross County',
          away_team: 'Partick Thistle',
          home_pourcent: 33,
          draw_pourcent: 40,
          away_pourcent: 27,
          home_bet: false,
          draw_bet: true,
          away_bet: false,
        },
      ],
    });
  });
});
