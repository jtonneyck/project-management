const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');
const Project = require('../models/project');

const router  = express.Router();

// GET route => to retrieve a specific task
router.get('/projects/:projectId/tasks/:taskId', (req, res, next) => {
  Task.findById(req.params.taskId)
  .then(theTask =>{
      res.json(theTask);
  })
  .catch( err =>{
      res.json(err);
  })
});

router.get('/tasks/:userId/', (req, res) => {
  Task.find({user: req.query.userId})
  .then(theTasks =>{
      res.json(theTask);
  })
  .catch( err =>{
      res.json(err);
  })
})

router.get('/tasks', (req, res) => {
  debugger
  Task.find({user: req.session.user._id})
  .populate("project")
  .then(theTasks =>{
      debugger
      res.json({tasks: theTasks});
  })
  .catch( err =>{
      res.json(err);
  })
});

router.post('/tasks', (req, res, next)=>{
  
  Task.create({
      title: req.body.title,
      description: req.body.description,  
      project: req.body.projectId,
      user: req.body.userId
  })
    .then(response => {
        Project.findByIdAndUpdate(req.body.projectId, { $push:{ tasks: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

router.put('/tasks/:id', (req, res, next)=>{

  Task.findByIdAndUpdate(req.params.id, req.body)
    .populate("owner")
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

router.delete('/tasks/:id', (req, res, next)=>{

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;