const { Router } = require('express');

const tasksRouter = Router();

tasksRouter
  .route('/')
  .post(() => {})
  .get((req, res, next) => {
    res.status(501).send('proverka');
  });

tasksRouter
  .route('/:taskId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = tasksRouter;
