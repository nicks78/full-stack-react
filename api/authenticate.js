// AUTHENTICATE API 

const express = require('express');
const jwt    = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../model/user');
const config = require('../config');
const bcrypt = require('bcrypt')


const router = express();

// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// route to authenticate a user (POST api/authenticate)
router.post('/', urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400);

     // find the user
    User.findOne({
        mobile: req.body.mobile
    }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Wrong phone number' });
    } else if (user) {

    // Compare password
    var password = bcrypt.compareSync(req.body.password, user.password);

    // check if password matches
    if (!password) {
        res.json({ success: false, message: 'Wrong password !' });
    } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({ user }, config.secret, {
            expiresIn: 60*60*48 // expires in 48 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          role: user.role,
          token: token,
          user: user
        });
      }   

    }

  });
});



module.exports = router;