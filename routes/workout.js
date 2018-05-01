var express = require('express');
var router = express.Router();
var knex = require('../db.js');

/* Save new workout type. */
router.post('/save', function(req, res, next) {
  knex('workout_type').insert({
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

/* GET workout types. */
router.get('/load', function(req, res, next) {
  knex('workout_type').select().then((workouts) => {
    // console.log(req);
    res.json({workouts})
  }).catch((err) => {
    console.log('error', err);
    res.json({workouts: 'No workouts found.'})
  })
});

// LOG new workout
router.post('/log', function(req, res, next) {
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

// GET workout history.
router.get('/history', function(req, res, next) {
  knex('workouts').where({
    workout_id: req.query.workout_id
  }).then(function(history) {
    res.send(history);
  }).catch(function(err) {
    console.log('err', err);
    res.send(err);
  })
});

// DELETE workout type
router.put('/delete', function(req, res, next) {
  console.log('query', req.query);
  knex('workout_type').where({
    id: req.query.workout_id
  }).del().then(function() {
    knex('workouts').where({
      workout_id: req.query.workout_id
    }).del().then(function() {
      res.end();
    }).catch(function(er) {
      console.log('ERROR', er);
    })
  }).catch(function(err) {
    console.log('ERROR', err);
  })
});

// UPDATE workout type
router.put('/update', function(req, res, next) {
  knex('workout_type').where({
    id: req.query.workout_id
  }).update({
    title: req.body.title,
    type: req.body.type
  }).then(function(ret) {
    console.log('returned value', ret);
    res.end();
  })
})


module.exports = router;
