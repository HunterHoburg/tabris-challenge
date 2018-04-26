var express = require('express');
var router = express.Router();
var knex = require('../db.js');

/* Save new workout type. */
router.post('/save', function(req, res, next) {
  knex('workout_type').insert({
    user_id: 1,
    type: req.body.type,
    title: req.body.name,
  }).then(function() {
    knex('workout_type').select().then((workouts) => {
      res.json({workouts});
    }).catch((err) => {
      console.log('error', err);
      res.json({workouts: 'No workouts found'});
    })
  }).catch((err) => {
    console.log('error', err);
  })
});

/* GET workouts. */
router.get('/load', function(req, res, next) {
  knex('workout_type').select().then((workouts) => {
    res.json({workouts})
  }).catch((err) => {
    console.log('error', err);
    res.json({workouts: 'No workouts found.'})
  })
});

// LOG new workout
router.post('/log', function(req, res, next) {
  console.log(req.body);
  knex('workouts').insert({
    workout_id: req.body.workout_id,
    reps: req.body.reps,
    weight: req.body.weight,
    type: req.body.type,
    title: req.body.title,
  }).then(function() {
    knex('workouts').select().then(function(workouts) {
      res.send(workouts);
    })
  }).catch(function(err) {
    console.log('error', err);
    res.send(err);
  });
});

module.exports = router;
