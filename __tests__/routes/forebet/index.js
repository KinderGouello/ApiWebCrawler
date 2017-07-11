const express = require('express');
const supertest = require('supertest');
const request = require('request');
const cheerio = require('cheerio');
const forebetRoute = require('../../../routes/forebet');
const fs = require('fs');

const app = express();
const fixtures = fs.readFileSync('./__tests__/routes/forebet/fixtures.html', 'utf8');

jest.mock('request', () => ({
  get: jest.fn(),
}));

describe('forebet route', () => {
  beforeEach(() => {
    forebetRoute(app, request, cheerio);
  });

  describe('/forebet', () => {
    it('shoud return a json with data', () => {
      request.get.mockImplementation((url, cb) => {
        cb(false, {}, fixtures);
      });

      return supertest(app)
        .get('/forebet')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            results: [
              {
                match: 'Pusamania Borneo<br> Mitra Kukar',
                domicile: '49',
                nul: '21',
                exterieur: '31',
              },
              {
                match: 'Sarawak FA<br> Felda United',
                domicile: '23',
                nul: '40',
                exterieur: '37',
              },
              {
                match: 'Melaka United<br> Kedah FA',
                domicile: '14',
                nul: '40',
                exterieur: '46',
              },
              {
                match: 'Penang FA<br> PKNS FC',
                domicile: '18',
                nul: '50',
                exterieur: '32',
              },
              {
                match: 'Pahang FA<br> Darul Takzim',
                domicile: '26',
                nul: '25',
                exterieur: '49',
              },
              {
                match: 'PBDKT T-Team<br> Kelantan FA',
                domicile: '39',
                nul: '23',
                exterieur: '38',
              },
              {
                match: 'Perak FA<br> Selangor FA',
                domicile: '36',
                nul: '38',
                exterieur: '26',
              },
              {
                match: 'Bamboutos FC<br> Coton Sport',
                domicile: '28',
                nul: '32',
                exterieur: '40',
              },
              {
                match: 'Karabakh Agdam<br> FC Samtredia',
                domicile: '53',
                nul: '37',
                exterieur: '10',
              },
              {
                match: 'Hibernians Paola<br> RB Salzburg',
                domicile: '9',
                nul: '30',
                exterieur: '61',
              },
              {
                match: 'Club Almagro<br> Brown de Adrogué',
                domicile: '31',
                nul: '33',
                exterieur: '36',
              },
              {
                match: 'HNK Rijeka<br> The New Saints',
                domicile: '54',
                nul: '35',
                exterieur: '11',
              },
              {
                match: 'FK Partizan<br> FK Buducnost',
                domicile: '76',
                nul: '14',
                exterieur: '10',
              },
              {
                match: 'Keflavik IF<br> HK Kopavogur',
                domicile: '67',
                nul: '19',
                exterieur: '15',
              },
              {
                match: 'Grotta<br> Leiknir Reykjavik',
                domicile: '19',
                nul: '39',
                exterieur: '41',
              },
              {
                match: 'Haukar<br> UMF Selfoss',
                domicile: '39',
                nul: '36',
                exterieur: '25',
              },
              {
                match: 'Trottur Reykjavik<br> Fram Reykjavik',
                domicile: '38',
                nul: '34',
                exterieur: '28',
              },
              {
                match: 'Thor Akureyri<br> Leiknir Faskr.',
                domicile: '66',
                nul: '10',
                exterieur: '24',
              },
              {
                match: 'IR Reykjavik<br> Fylkir FC',
                domicile: '27',
                nul: '16',
                exterieur: '56',
              },
              {
                match: 'Criciúma/SC<br> Paysandu/PA',
                domicile: '43',
                nul: '35',
                exterieur: '22',
              },
              {
                match: 'Brasil Pelotas/RS<br> Oeste/SP',
                domicile: '25',
                nul: '55',
                exterieur: '20',
              },
              {
                match: 'Londrina/PR<br> ABC Natal/RN',
                domicile: '44',
                nul: '32',
                exterieur: '24',
              },
              {
                match: 'Ceará SC/CE<br> Internacional/RS',
                domicile: '28',
                nul: '46',
                exterieur: '26',
              },
              {
                match: 'Vila Nova/GO<br> Paraná/PR',
                domicile: '27',
                nul: '50',
                exterieur: '24',
              },
              {
                match: 'Guarani/SP<br> Goiás/GO',
                domicile: '50',
                nul: '23',
                exterieur: '27',
              },
              {
                match: 'América Mineiro<br> Boa Esporte/MG',
                domicile: '43',
                nul: '35',
                exterieur: '22',
              },
              {
                match: 'Nautico/PE<br> Juventude/RS',
                domicile: '18',
                nul: '31',
                exterieur: '51',
              },
              {
                match: 'Luverdense/MT<br> Santa Cruz/PE',
                domicile: '30',
                nul: '32',
                exterieur: '38',
              },
              {
                match: 'CRB/AL<br> Figueirense/SC',
                domicile: '44',
                nul: '31',
                exterieur: '24',
              },
              {
                match: 'Atlético FC<br> Deportivo Pereira',
                domicile: '14',
                nul: '28',
                exterieur: '57',
              },
              {
                match: 'Deportes Quindío<br> Real Cartagena',
                domicile: '49',
                nul: '40',
                exterieur: '11',
              },
              {
                match: 'Mogi Mirim/SP<br> Joinville/SC',
                domicile: '27',
                nul: '29',
                exterieur: '43',
              },
              {
                match: 'Confiança/SE<br> ASA/AL',
                domicile: '36',
                nul: '40',
                exterieur: '24',
              },
              {
                match: 'Coritiba/PR<br> Sport Recife/PE',
                domicile: '33',
                nul: '42',
                exterieur: '25',
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
        .get('/forebet')
        .expect(502)
        .then((res) => {
          expect(res.body).toEqual({
            message: 'Error during request',
          });
        });
    });
  });
});
