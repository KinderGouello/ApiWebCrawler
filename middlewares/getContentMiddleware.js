const request = require('request-promise');
const cheerio = require('cheerio');
const format = require('string-template');

module.exports = url =>
  async (req, res, next) => {
    try {
      // eslint-disable-next-line no-param-reassign
      req.content = await request({
        uri: format(url, req.params),
        transform: body => cheerio.load(body, { decodeEntities: false }),
      });
    } catch (err) {
      return res.end({ error: err, status: 502 });
    }

    return next();
  };
