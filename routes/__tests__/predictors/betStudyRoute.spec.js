const cheerio = require('cheerio');
const fs = require('fs');
const betStudyRoute = require('../../predictors/betStudy');

describe('BetStudy route', () => {
  it('should render predictions', async () => {
    const response = { send: jest.fn() };

    betStudyRoute({
      content: cheerio.load(fs.readFileSync(`${__dirname}/mocks/betStudy.html`)),
    }, response);

    expect(response.send).toHaveBeenCalledWith({
      results: [
        {
          home_team: 'Arsenal',
          away_team: 'Stoke City',
          home_pourcent: 72,
          draw_pourcent: 11,
          away_pourcent: 17,
        },
        {
          home_team: 'Chelsea',
          away_team: 'Tottenham Hotspur',
          home_pourcent: 50,
          draw_pourcent: 27,
          away_pourcent: 23,
        },
      ],
    });
  });
});
