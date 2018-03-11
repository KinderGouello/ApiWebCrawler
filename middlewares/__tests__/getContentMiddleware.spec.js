const request = require('request-promise');
const getContentMiddleware = require('../getContentMiddleware');

jest.mock('request-promise');

describe('getContent middleware', () => {
  describe('request is ok', () => {
    it('should add content of the website to the request', async () => {
      const next = jest.fn();
      const req = {};

      request.mockImplementation(() => '<h1>test</h1>');

      await getContentMiddleware('http://www.google.com')(req, {}, next);

      expect(req.content).toEqual('<h1>test</h1>');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('request throw error', () => {
    it('should response 502', async () => {
      const res = { end: jest.fn() };

      request.mockImplementation(() => { throw new Error('my error'); });

      await getContentMiddleware('http://www.google.com')({}, res);

      expect(res.end).toHaveBeenCalledWith({ error: new Error('my error'), status: 502 });
    });
  });
});
