//  API

const  express = require('express');
const  mongoose = require('mongoose');
const  jwt    = require('jsonwebtoken');
const  config = require('../config');

//  API ROUTE
const  user = require('./user'); 
const  authenticate = require('./authenticate'); 

// Init Router 
const router = express.Router();

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${config.dbName}`);

// get notified if the connection
// was successful or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));  
db.once('open', () => {  
  console.log(`Connected to the ${dbName} database`);
});

// ANONYMOUS USERS
router.use('/authenticate', authenticate);


// ─── IS DISABLE FOR DEV ─────────────────────────────────────────────────────────
//route middleware to verify a token

  
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Error d\'auth token' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});


// ─── END ────────────────────────────────────────────────────────────────────────


  

//  AUTHENTICATED USERS
router.use('/user', user);

module.exports = router;
