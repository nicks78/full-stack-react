// USER API 

const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const randtoken = require('rand-token');
const saltRounds = 10;

const router = express.Router();

// Get list of users
router.get('/', (req, res) => {
    User.find({}, function (err, users, next) {
        if (!users){
            return res.json({ errMessage: 'No users found !' });
            next();
        }
        return res.send(users);
    });    
})

// Get user per _id
router.get('/:id', (req, res) => {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (!user){
            return res.json({ errMessage: 'No users found !' });
        }
        return res.send(user);
    });    
})

// Create a new user
router.route('/create')  
    .post((req, res) => {
    
    // Encrypt the password
    var hash = bcrypt.hashSync(req.body.password, saltRounds);

    var data = req.body.profile
    var token = randtoken.generate(32);

    const user = new User({
        mobile: req.body.mobile,
        password: hash,
        role: req.body.role,
        profile: data
    });


    user.save((err) => {
        console.log('Error', err);// Remove before prod
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000){
                return res.json({ success : false, errMessage: 'Mobile phone already exist !' });
            }
        }
        return res.json({ success: true });
    })
});


// Update user data
router.route('/update')
    .post((req, res) => {
        // Do an update on user
});

// Update password
router.route('/update/password')
.post((req, res) => {
    var id = req.body._id;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);

    User.where({ _id: id }).update({ $set: {password: hash, email: req.body.email} }, (err) => {

        if(err){
            return res.json({ errMessage: err });
        }

        return res.json({ success: true });

    });
    
});

// Update user data
router.route('/delete')
    .post((req, res) => {
        var id = req.body._id;
        User.findByIdAndRemove( id, (err, user) => {  
        if(err){
            return res.json({ errMessage: err });
        }
        return res.json({ success: true, message: 'User deleted !' });
    });
});


module.exports = router;
