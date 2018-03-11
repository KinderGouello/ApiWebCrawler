const cheerio = require('cheerio');
const fs = require('fs');
const zulubetRoute = require('../../predictors/zulubet');

describe('Zulubet route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    zulubetRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/zulubet.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          home_team: 'Chicago Fire',
          away_team: 'Portland Timbers',
          home_pourcent: 62,
          draw_pourcent: 17,
          away_pourcent: 21,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
        {
          home_team: 'Sport Rosario',
          away_team: 'Sporting Cristal',
          home_pourcent: 53,
          draw_pourcent: 27,
          away_pourcent: 21,
          home_bet: true,
          draw_bet: true,
          away_bet: false,
        },
        {
          home_team: 'Lobos B.U.A.P.',
          away_team: 'Deportivo Toluca',
          home_pourcent: 21,
          draw_pourcent: 17,
          away_pourcent: 62,
          home_bet: false,
          draw_bet: false,
          away_bet: true,
        },
        {
          home_team: 'Juarez FC',
          away_team: 'Zacatepec 1948',
          home_pourcent: 21,
          draw_pourcent: 42,
          away_pourcent: 37,
          home_bet: false,
          draw_bet: true,
          away_bet: true,
        },
        {
          home_team: 'NSC Minnesota Stars',
          away_team: 'Atlanta United FC',
          home_pourcent: 37,
          draw_pourcent: 17,
          away_pourcent: 46,
          home_bet: true,
          draw_bet: false,
          away_bet: true,
        },
      ],
    });
  });
});
