var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')

//
router.get('', (req, res, next) => {
  res.send('welcome')
})
router.get('/signup', (req, res, next) => {
  // User.register(new User({username: req.body.username}))
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.json({err: err})
    } else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, status: 'registration successful!'})
      })
    }
  })

  res.send('welcome')
})
router.get('/login', (req, res, next) => {
  res.send('welcome')
})
router.get('/logout', (req, res, next) => {
  res.send('welcome')
})

module.exports = router