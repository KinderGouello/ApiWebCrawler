const cheerio = require('cheerio');
const fs = require('fs');
const iambettorRoute = require('../../predictors/iambettor');

describe('iambettor route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    iambettorRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/iambettor.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          home_team: 'Hannover 96',
          away_team: 'Werder Bremen',
          home_pourcent: 26,
          draw_pourcent: 29,
          away_pourcent: 44,
          home_bet: false,
          draw_bet: true,
          away_bet: true,
        },
        {
          home_team: 'AS de Saint Etienne',
          away_team: 'Paris Saint - Germain',
          home_pourcent: 22,
          draw_pourcent: 26,
          away_pourcent: 53,
          home_bet: false,
          draw_bet: false,
          away_bet: true,
        },
        {
          home_team: 'Royal Charleroi SK',
          away_team: 'RSC Anderlecht Brussel',
          home_pourcent: 35,
          draw_pourcent: 33,
          away_pourcent: 32,
          home_bet: true,
          draw_bet: true,
          away_bet: false,
        },
        {
          home_team: 'Ludogorets Razgrad',
          away_team: 'CSKA Sofia',
          home_pourcent: 49,
          draw_pourcent: 27,
          away_pourcent: 24,
          home_bet: true,
          draw_bet: false,
          away_bet: false,
        },
        {
          home_team: 'Guangzhou R&F',
          away_team: 'Jiangsu Sainty',
          home_pourcent: null,
          draw_pourcent: null,
          away_pourcent: null,
          home_bet: false,
          draw_bet: false,
          away_bet: false,
        },
      ],
    });
  });
});
