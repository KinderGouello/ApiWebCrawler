const bet1x2 = require('../bet1x2');

describe('bet 1X2', () => {
  describe('only victory', () => {
    it('should render only home to true', () => {
      const result = bet1x2('1');

      expect(result).toEqual({
        home_bet: true,
        draw_bet: false,
        away_bet: false,
      });
    });
  });

  describe('only draw', () => {
    it('should render only draw to true', () => {
      const result = bet1x2('X');

      expect(result).toEqual({
        home_bet: false,
        draw_bet: true,
        away_bet: false,
      });
    });
  });

  describe('only away', () => {
    it('should render only away to true', () => {
      const result = bet1x2('2');

      expect(result).toEqual({
        home_bet: false,
        draw_bet: false,
        away_bet: true,
      });
    });
  });

  describe('wrong string', () => {
    it('should render all to false', () => {
      const result = bet1x2('y3r5');

      expect(result).toEqual({
        home_bet: false,
        draw_bet: false,
        away_bet: false,
      });
    });
  });

  describe('all', () => {
    it('should render all to true', () => {
      const result = bet1x2('1X2');

      expect(result).toEqual({
        home_bet: true,
        draw_bet: true,
        away_bet: true,
      });
    });
  });

  describe('with minus x', () => {
    it('should render draw to true', () => {
      const result = bet1x2('x9d');

      expect(result).toEqual({
        home_bet: false,
        draw_bet: true,
        away_bet: false,
      });
    });
  });
});
