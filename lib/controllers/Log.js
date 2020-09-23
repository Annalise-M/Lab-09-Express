const { Router } = require('express');
const Log = require('../models/Log');

module.exports = Router()
  .post('/', (req, res, next) => {
    Log
      .insert(req.body)
      .then(log => res.send(log))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Log
      .find()
      .then(logs => res.send(logs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Log
      .findById(req.params.id)
      .then(log => res.send(log))
      .catch(next);
  });

//   .put('/:id', (req, res, next) => {
//     Recipe
//       .update(req.params.id, req.body)
//       .then(recipe => res.send(recipe))
//       .catch(next);
//   })

//   .delete('/:id', (req, res, next) => {
//     Recipe
//       .delete(req.params.id)
//       .then(recipe => res.send(recipe))
//       .catch(next);
//});
