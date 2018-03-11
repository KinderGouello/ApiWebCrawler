const cheerio = require('cheerio');
const fs = require('fs');
const goldenbetRoute = require('../../predictors/goldenbet');

describe('Goldenbet route', () => {
  describe('has games', () => {
    it('should render predictions', async () => {
      const response = { send: jest.fn() };

      goldenbetRoute({
        content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/goldenbet.html`)),
      }, response);

      expect(response.send).toHaveBeenCalledWith({
        results: [
          {
            home_team: 'OLIMPO BAHIA BLANCA',
            away_team: 'CLUB ATLETICO TEMPERLEY',
            home_bet: true,
            draw_bet: true,
            away_bet: false,
          },
          {
            home_team: 'SPORTIVO LUQUENO',
            away_team: '3 DE FEBRERO DE CIUDAD DEL ESTE',
            home_bet: true,
            draw_bet: false,
            away_bet: false,
          },
          {
            home_team: 'INSTITUTO AC CORDOBA',
            away_team: 'CLUB ALMAGRO',
            home_bet: false,
            draw_bet: true,
            away_bet: false,
          },
          {
            home_team: 'ZULIA FC',
            away_team: 'DVO ANZOATEGUI',
            home_bet: false,
            draw_bet: false,
            away_bet: false,
          },
          {
            home_team: 'BURIRAM UNITED FC',
            away_team: 'CGUANGZHOU EV.',
            home_bet: false,
            draw_bet: false,
            away_bet: true,
          },
        ],
      });
    });
  });

  describe('has no games', () => {
    it('should render empty', async () => {
      const response = { send: jest.fn() };

      goldenbetRoute({ content: cheerio.load('') }, response);

      expect(response.send).toHaveBeenCalledWith({ results: [] });
    });
  });
});
