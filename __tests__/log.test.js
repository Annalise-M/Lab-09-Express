const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');
const Log = require('../lib/models/Log');

describe('log-lab routes', () => {
  beforeEach(async() => {
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
        expect(res.body).toEqual({
          id: expect.any(String),
          recipe_id: '2',
          date_of_event: '2020-09-22',
          notes: 'here are some notey note notes notesssssss',
          rating: 4
        });
      });
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

  it('gets all logs via GET', async() => {
    const logs = await Promise.all([
      {
        id: expect.any(String),
        recipe_id: '2',
        date_of_event: '2020-09-22',
        notes: 'here are some notey note notes notesssssss',
        rating: 4
      },
      {
        id: expect.any(String),
        recipe_id: '1',
        date_of_event: '2020-09-22',
        notes: 'it was meh',
        rating: 3
      },
      {
        id: expect.any(String),
        recipe_id: '3',
        date_of_event: '2020-09-22',
        notes: 'blah blah blah',
        rating: 2
      }
    ].map(log => Log.insert(log)));

    return request(app)
      .get('/api/v1/logs')
      .then(res => {
        logs.forEach(log => {
          expect(res.body).toContainEqual(log);
        });
      });
  });

  // it('updates a log by id via PUT', async() => {
  //   const log = await Log.insert([
  //     {
  //       id: expect.any(String),
  //       recipe_id: '2',
  //       date_of_event: '2020-09-22',
  //       notes: 'here are some notey note notes notesssssss',
  //       rating: 4
  //     }
  //   ]);

  //   return request(app)
  //     .put(`/api/v1/logs/${log.id}`)
  //     .send([
  //       {
  //         id: expect.any(String),
  //         recipe_id: '2',
  //         date_of_event: '2020-09-22',
  //         notes: 'change of notes herrreee',
  //         rating: 4
  //       }
  //     ])
  //     .then(res => {
  //       expect(res.body).toEqual([
  //         {
  //           id: expect.any(String),
  //           recipe_id: '2',
  //           date_of_event: '2020-09-22',
  //           notes: 'here are some notey note notes notesssssss',
  //           rating: 4
  //         }
  //       ]);
  //     });
  // });

  it('deletes a log by id', async() => {
    const log = await Log.insert({
      id: expect.any(String),
      recipe_id: '2',
      date_of_event: '2020-09-22',
      notes: 'here are some notey note notes notesssssss',
      rating: 4
    });

    return request(app)
      .delete(`/api/v1/logs/${log.id}`)
      .then(res => {
        expect(res.body).toEqual(log);
      });
  });

});
