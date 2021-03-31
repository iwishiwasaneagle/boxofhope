'use strict' 

// Controller for userHome
var mongoose = require('mongoose'),
    userHomeRunners = require('../runners/userHomeRunnable'),
    userHome = mongoose.model('UserHome');

exports.set_user_home = function(req, res) {
    var new_user_home = new userHome(req.body);

    userHomeRunners.run(new_user_home);

    new_user_home.save(function(err, userHome) {
        if (err) {
            res.status(404).send('Bad Request: Cannot set userHome status.');
        }
        res.json(userHome);
    });
    res.status(201);
};

exports.read_user_home = function(req, res){
    userHome.findById(req.params.userHomeId, function(err, userHome) {
        if (err)
            res.status(404).send('Bad Request: Cannot read userHome status.');
        res.json(userHome);
    });
    res.status(200);
};
 
exports.update_user_home = function(req, res){
    userHome.findOneAndUpdate({_id: req.params.userHomeId}, req.body, {new: true}, function(err, userHome) {
        if (err)
            res.status(404).send('Cannot update userHome status.');
        res.json(userHome);
    });
    res.status(200);
};

exports.delete_user_home = function(req, res) {
    userHome.remove({
      _id: req.params.userHomeId
    }, function(err, userHome) {
      if (err) {
        // res.send(err);
        res.status(404).send('Bad Request: Cannot delete userHome data.');
      } else {
        res.json({ message: 'Settings successfully deleted.' });
      }
    });
    res.status(204);
  };


exports.get_userHome_since = (req,res) => {
    var days = req.params.countBack;
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate()-days);
    return State.find({createdAt: {$gt: cutoff}}).sort({"createdAt":-1}).exec(function(err,status){
        if (err) {
            res.status(404).send('Bad Request: Cannot get userHome list.');
        }
        console.log(status);
         res.json(status);
     });
 };

exports.get_all_userHome = (req,res) => {
    return State.find().sort({"createdAt":-1}).exec(function(err,status){
        if (err) {
            res.status(404).send('Bad Request: Cannot get userHome list.');
        }
        console.log(status);
         res.json(status);
     });
  };

exports.get_latest_UserHome = (req,res) => {
      return State.findOne().sort({createdAt:-1}).exec(function(err,status){
          if (err) {
              res.status(404).send('Bad Request: Cannot get userHome status.');
          }
          console.log(status);
           res.json(status);
       });
   };
