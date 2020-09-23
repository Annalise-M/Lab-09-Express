const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');
const Log = require('../lib/models/Log');

describe('log-lab routes', () => {
  beforeEach(async () => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));
  });

  it('creates a log via POST', async() => {
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
      })
  });

  it('gets log by id via GET', async() => {
    const log = await Log.insert({
      id: expect.any(String),
      recipe_id: '2',
      date_of_event: '2020-09-22',
      notes: 'here are some notey note notes notesssssss',
      rating: 4
    });
  
    const response = await request(app)
      .get(`/api/v1/logs/${log.id}`);

    expect(response.body).toEqual(log);
  });

  // it('gets all logs via GET', async() => {
  //   const logs = await Promise.all([
  //     { name: 'cookies', directions: [] },
  //     { name: 'cake', directions: [] },
  //     { name: 'pie', directions: [] }
  //   ].map(recipe => Recipe.insert(recipe)));

  //   return request(app)
  //     .get('/api/v1/logs')
  //     .then(res => {
  //       logs.forEach(recipe => {
  //         expect(res.body).toContainEqual(log);
  //       });
  //     });
  // });
});
