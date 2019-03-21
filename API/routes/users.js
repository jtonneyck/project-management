const express = require('express');
const router = express.Router();
const bCrypt = require("bcrypt")
const User = require("../models/user")

const protect = (req, res, next)=> {
  debugger
  if(req.session.user) {
    next()
  } else {
    res.status(403).json({message: "Unauthorized"})
  }
}

router.get('/users', protect, function(req, res, next) {
  User.find({}).select({firstname: 1, lastname: 1, username: 1, _id: 1})
    .then(users=> {
      res.json(users)
    })
});

router.put("/users/edit",protect, (req,res)=> {
  User.updateUser(req.session._id, req.body)
    .then((result)=> {
      res.status(200).json({ message: `User with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.statis(500).json(err);
    })
})

router.post("/users", (req,res)=> {
  let user = req.body
  let hash = bCrypt.hashSync(req.body.password, 10)
  user.password = hash
  User.create(user)
    .then((result)=> {
      res.json({message: "User created"})
    })
    .catch((error)=> {
      res.json(error)
    })
})

router.post("/users/login", (req, res)=> {
  User.findOne({username: req.body.username})
    .then((result)=> {
      if(bCrypt.compareSync(req.body.password, result.password)) {
        debugger
        req.session.user = result._doc
        res.status(200).send({...result._doc})
      }
      else res.status(403).json({username: "Invalid credentials"})
    })
    .catch((error)=> {
      res.status(500).json(error)
    })
})

router.post("/users/logout", (req, res)=> {
  debugger
  req.session.destroy()
  res.send(200).json({message: "session destroyed"})
})

router.get("/users/profile",protect, (req, res)=> {
    res.json(req.session.user)
})

router.post("/users/:id",protect, (req,res)=> {
  User.findById(req.params.id)
    .populate("tasks")
    .populate("projects")
    .then((results)=>{
      res.json(results)
    })
    .catch((error)=> {
      res.json(error)
    })
})

router.get("/users/:id",protect, (req,res)=> {
  User.findById(req.params.id)
    .populate("tasks")
    .populate("projects")
    .then((results)=>{
      res.json(results)
    })
    .catch((error)=> {
      res.json(error)
    })
})

module.exports = router;
