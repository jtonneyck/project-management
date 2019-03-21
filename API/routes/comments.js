const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Comment = require("../models/comment")
const Task = require("../models/task")

router.post('/comments', (req, res, next)=>{
  
    Comment.create({
        comment: req.body.comment,  
        user: req.session.user._id
    })
    .then(response => {
        Task.findByIdAndUpdate(req.body.taskId, { $push:{ comments: response._id } })
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

module.exports = router