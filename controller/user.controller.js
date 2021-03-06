const mongoose = require('mongoose');
const Logger = require('nodemon/lib/utils/log');
const user = mongoose.model('User');

function insertUser(req, res){
    console.log('need to register ', req.body.email);
    var newUser = new user(); 
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.phoneNumber = req.body.phoneNumber;
    newUser.image = req.body.image;
    newUser.save((err, docs) => {
        if(!err){
            console.log(docs);
            res.json(docs);
        } else {
            console.log('Error during adding user: ' + err);
        }
    });
}


function fetchUser(req, res) {
    user.findOne( { email: req.body.email}, function(err, docs) {
            if(docs){
                console.log('logging in ', req.body.email);
                console.log(err, docs);
                res.json(docs);
            } else {
                console.log(err);
                insertUser(req, res);
            }
        });
}

module.exports = { fetchUser }