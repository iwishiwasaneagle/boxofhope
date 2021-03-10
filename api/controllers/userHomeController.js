'use strict' 

// Controller for userHome
var mongoose = require('mongoose'),
userHome = mongoose.model('UserHome');

exports.update_user_home = function(req, res){
    userHome.findOneAndUpdate({}, req.body, {new:true}, function(err,userHome){
        if (err)
            res.status(404).send('Bad Request: Cannot update user_home state.');
        res.json(userHome);
    });
    res.status(200);
};