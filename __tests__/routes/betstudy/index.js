const express = require('express');
const supertest = require('supertest');
const request = require('request');
const cheerio = require('cheerio');
const betstudyRoute = require('../../../routes/betstudy');
const fs = require('fs');

const app = express();

jest.mock('request', () => ({
  get: jest.fn(),
}));

describe('betstudy routes', () => {
  beforeEach(() => {
    betstudyRoute(app, request, cheerio);
  });

  describe('/betstudy-premiereleague', () => {
    it('shoud return a json with data', () => {
      const fixtures = fs.readFileSync('./__tests__/routes/betstudy/fixtures-betstudy-premiereleague.html', 'utf8');

      request.get.mockImplementation((url, cb) => {
        cb(false, {}, fixtures);
      });

      return supertest(app)
        .get('/betstudy-premiereleague')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            results: [
              {
                match: 'Arsenal - Leicester City',
                pari_domicile: '%88',
                pari_nul: '%5',
                pari_exterieur: '%7',
              },
              {
                match: 'Watford - Liverpool',
                pari_domicile: '%22',
                pari_nul: '%5',
                pari_exterieur: '%73',
              },
              {
                match: 'Chelsea - Burnley',
                pari_domicile: '%66',
                pari_nul: '%22',
                pari_exterieur: '%12',
              },
              {
                match: 'Crystal Palace - Huddersfield Town',
                pari_domicile: '%33',
                pari_nul: '%44',
                pari_exterieur: '%23',
              },
              {
                match: 'Everton - Stoke City',
                pari_domicile: '%66',
                pari_nul: '%11',
                pari_exterieur: '%23',
              },
              {
                match: 'Southampton - Swansea City',
                pari_domicile: '%44',
                pari_nul: '%27',
                pari_exterieur: '%29',
              },
              {
                match: 'West Bromwich Albion - AFC Bournemouth',
                pari_domicile: '%26',
                pari_nul: '%26',
                pari_exterieur: '%48',
              },
              {
                match: 'Brighton & Hove Albion - Manchester City',
                pari_domicile: '%52',
                pari_nul: '%11',
                pari_exterieur: '%37',
              },
              {
                match: 'Newcastle United - Tottenham Hotspur',
                pari_domicile: '%44',
                pari_nul: '%16',
                pari_exterieur: '%40',
              },
              {
                match: 'Manchester United - West Ham United',
                pari_domicile: '%50',
                pari_nul: '%44',
                pari_exterieur: '%6',
              },
            ],
          });
        });
    });
  });
});
