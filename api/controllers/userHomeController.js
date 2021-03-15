'use strict' 

// Controller for userHome
var mongoose = require('mongoose'),
userHome = mongoose.model('UserHome');

exports.set_user_home = function(req, res) {
    var new_user_home = new userHome(req.body);
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