const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');
const Log = require('../lib/models/Log');

describe('log-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a log via POST', async() => {
    
    const recipes = await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));

    return request(app)
      .post('/api/v1/logs')
      .send(
        ({
          id: expect.any(String),
          recipe_id: '2',
          date_of_event: '2020-09-22',
          notes: 'here are some notey note notes notesssssss',
          rating: 4
        })
      )
      .then(res => {
        console.log(res.body, 'hellllllllllllllooooooooo');
        expect(res.body).toEqual({
          id: expect.any(String),
          recipe_id: '2',
          date_of_event: '2020-09-22',
          notes: 'here are some notey note notes notesssssss',
          rating: 4
        });
      });
  });
  
});
