const express = require('express');
const supertest = require('supertest');
const request = require('request');
const cheerio = require('cheerio');
const goldenBetRoute = require('../../../routes/goldenbet');
const fs = require('fs');

const app = express();
const fixtures = fs.readFileSync('./__tests__/routes/goldenbet/fixtures.html', 'utf8');

jest.mock('request', () => ({
  get: jest.fn(),
}));

describe('goldenbet route', () => {
  beforeEach(() => {
    goldenBetRoute(app, request, cheerio);
  });

  describe('/goldenbet', () => {
    it('shoud return a json with data', () => {
      request.get.mockImplementation((url, cb) => {
        cb(false, {}, fixtures);
      });

      return supertest(app)
        .get('/goldenbet')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            results: [
              {
                equipe_domicile: 'CORITIBA PR',
                equipe_exterieur: 'SPORT RECIFE PE',
                prediction: '1',
              },
              {
                equipe_domicile: 'SAN JOSE EARTHQUAKES',
                equipe_exterieur: 'LOS ANGELES GALAXY',
                prediction: '1',
              },
              {
                equipe_domicile: 'FK VIKTORIA PLZEN',
                equipe_exterieur: 'SPVGG GREUTHER FURTH',
                prediction: '',
              },
              {
                equipe_domicile: 'BIRMINGHAM CITY',
                equipe_exterieur: '1. FC UNION BERLIN',
                prediction: 'X',
              },
              {
                equipe_domicile: 'MSV DUISBURG',
                equipe_exterieur: 'FC WUERZ.KICKERS',
                prediction: '1X',
              },
              {
                equipe_domicile: 'SV GROEDIG',
                equipe_exterieur: 'FC BLAU WEISS LINZ',
                prediction: '1',
              },
              {
                equipe_domicile: 'Fortuna Cologne',
                equipe_exterieur: '1. FC SAARBRÜCKEN',
                prediction: '',
              },
              {
                equipe_domicile: 'TUS KOBLENZ',
                equipe_exterieur: 'FSV MAINZ 05',
                prediction: '2',
              },
              {
                equipe_domicile: 'FC LUGANO',
                equipe_exterieur: 'AC MILAN',
                prediction: '2',
              },
              {
                equipe_domicile: 'FC RAPPERSWIL-JONA',
                equipe_exterieur: 'VFL WOLFSBURG',
                prediction: '2',
              },
              {
                equipe_domicile: 'ROT-WEISS ESSEN',
                equipe_exterieur: 'BORUSSIA DORTMUND',
                prediction: '2',
              },
              {
                equipe_domicile: 'SK LIERSE',
                equipe_exterieur: 'SV ZULTE WAREGEM',
                prediction: '',
              },
              {
                equipe_domicile: 'VALENCIENNES FC',
                equipe_exterieur: 'COVENTRY CITY',
                prediction: '1X',
              },
              {
                equipe_domicile: 'FC LAUSANNE-SPORT',
                equipe_exterieur: 'CF VALENCIA',
                prediction: 'X2',
              },
              {
                equipe_domicile: 'CHESTERFIELD',
                equipe_exterieur: 'SL BENFICA B',
                prediction: '1',
              },
              {
                equipe_domicile: 'ALFRETON TOWN',
                equipe_exterieur: 'SHEFFIELD WEDNESDAY',
                prediction: '2',
              },
              {
                equipe_domicile: 'DARTFORD',
                equipe_exterieur: 'GILLINGHAM',
                prediction: '',
              },
              {
                equipe_domicile: 'GUISELEY AFC',
                equipe_exterieur: 'BARNSLEY FC',
                prediction: '2',
              },
              {
                equipe_domicile: 'MARINE FC',
                equipe_exterieur: 'AFC FYLDE',
                prediction: '',
              },
              {
                equipe_domicile: 'NUNEATON TOWN FC',
                equipe_exterieur: 'PETERBOROUGH UNITED',
                prediction: '2',
              },
              {
                equipe_domicile: 'BASINGSTOKE TOWN',
                equipe_exterieur: 'EASTLEIGH FC',
                prediction: '',
              },
              {
                equipe_domicile: 'BUXTON FC',
                equipe_exterieur: 'CREWE ALEXANDRA',
                prediction: '',
              },
              {
                equipe_domicile: 'DUMBARTON',
                equipe_exterieur: 'PARTICK THISTLE',
                prediction: '',
              },
              {
                equipe_domicile: 'LIMERICK 37 FC',
                equipe_exterieur: 'CHARLTON ATHLETIC',
                prediction: '',
              },
              {
                equipe_domicile: 'OXFORD CITY',
                equipe_exterieur: 'CHELTENHAM TOWN',
                prediction: '',
              },
              {
                equipe_domicile: 'STEVENAGE FC',
                equipe_exterieur: 'NORWICH CITY',
                prediction: '2',
              },
              {
                equipe_domicile: 'TONBRIDGE ANGELS',
                equipe_exterieur: 'EBBSFLEET UNITED',
                prediction: '',
              },
              {
                equipe_domicile: 'WEYMOUTH FC',
                equipe_exterieur: 'YEOVIL TOWN',
                prediction: '2',
              },
              {
                equipe_domicile: 'GROTTA',
                equipe_exterieur: 'LEIKNIR REYKJAVIK',
                prediction: '2',
              },
              {
                equipe_domicile: 'HAUKAR HAFNARFJÖRDUR',
                equipe_exterieur: 'UMF SELFOSS',
                prediction: '',
              },
              {
                equipe_domicile: 'IR REYKJAVIK',
                equipe_exterieur: 'FYLKIR REYKJAVIK',
                prediction: '2',
              },
              {
                equipe_domicile: 'KEFLAVIK IF',
                equipe_exterieur: 'HK KOPAVOGUR',
                prediction: '1',
              },
              {
                equipe_domicile: 'THOR AKUREYRI',
                equipe_exterieur: 'LEIKNIR FASKRUOSFIROI',
                prediction: '1',
              },
              {
                equipe_domicile: 'THROTTUR REYKJAVIK',
                equipe_exterieur: 'FRAM REYKJAVIK',
                prediction: '',
              },
            ],
          });
        });
    });
  });

  describe('error during get request', () => {
    it('should return a 502 error', () => {
      request.get.mockImplementation((url, cb) => {
        cb('Error during request', {}, {});
      });

      return supertest(app)
        .get('/goldenbet')
        .expect(502)
        .then((res) => {
          expect(res.body).toEqual({
            message: 'Error during request',
          });
        });
    });
  });
});
