const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
// const Log = require('../lib/models/Log');

describe('log-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a log via POST', async() => {
    return request(app)
      .post('/api/v1/logs')
      .send({
        recipeId: expect.any(String),
        dateOfEvent: '',
        notes: [
          'do this thing',
          'then this thing',
          'baked well',
          'will cook again'
        ],
        rating: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          recipeId: expect.any(String),
          dateOfEvent: '',
          notes: [
            'do this thing',
            'then this thing',
            'baked well',
            'will cook again'
          ],
          rating: 4
        });
      });
  });

  
});
