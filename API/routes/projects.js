// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project');
const Task = require('../models/task'); 

// create project
router.post('/projects', (req, res)=>{
  debugger
  Project.create({
        title: req.body.title,
        description: req.body.description
    })
    .then(response => {
      debugger
      res.json(response);
    })
    .catch(err => {
      debugger
      res.json(err);
    })
});

// get all the projects
router.get('/projects', (req, res) => {
    debugger
    if(req.session.user) {
      Project.find().populate('tasks')
      .then(allTheProjects => {
          res.json(allTheProjects);
      })
      .catch(err => {
          res.json(err);
      })
    } else {
      res.status(403).json({message: "unauthorized"})
    }

});

// get specific project
router.get('/projects/:id', (req, res)=>{
    if(req.session.user) {
      Project.findById(req.params.id)
      .populate('tasks')
      .populate({
          path: "tasks", 
          populate: {
            path: "user", 
            model: "User"
          }
      })
      .then(response => {
        debugger
        res.status(200).json(response);
      })
      .catch(err => {
        res.json(err);
      })
    } else {
      res.status(403).json({message: "unauthorized"})
    }

})

// update project
router.put('/projects/:id', (req, res)=>{

    Project.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})

router.delete('/projects/:id', (req, res)=>{

    Project.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Project with ${req.params.id} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
})

module.exports = router;