var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var config = require("./config/config")
var MongoDBStore = require('connect-mongodb-session')(session);
var passport = require("passport")
var mongoose = require("mongoose")
var cors = require("cors")

var store = new MongoDBStore({
    uri: config.db,
    collection: 'mySessions'
  });

var app = express();
app.use(cors({
  origin: config.client,
  credentials: true
}))

mongoose.connect(config.db, (err)=> {
    if(err) console.log("error")
    else console.log("connected")
})

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.initialize());
// app.use(passport.session())
const protect = (req, res, next)=> {
  debugger
  if(req.session.user) {
    next()
  } else {
    res.status(403).json({message: "Unauthorized"})
  }
}
app.use('/api', require("./routes/users"));
app.use('/api', protect, require("./routes/tasks"));
app.use('/api', protect, require("./routes/projects"));
app.use('/api', protect, require("./routes/comments"));

module.exports = app;
