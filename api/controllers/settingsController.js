'use strict' 

// Controller for settings 
var mongoose = require('mongoose'),
Settings = mongoose.model('Settings');

exports.set_settings = function(req, res) {
    var new_settings = new Settings(req.body);
    new_settings.save(function(err, setting) {
        if (err) {
          res.status(404).send('Bad Request: Cannot set-up box settings.');
        }
        res.json(setting);
    });
    res.status(201);
};

exports.get_latest_settings = (req,res,keyword) => {
  return Settings.find({"keyword": keyword}).sort({"createdAt":-1}).limit(1).exec(function(err,status){
      if (err) {
          res.status(404).send('Bad Request: Cannot get latest setting.');
      }
      console.log(status);
       res.json(status);
   });
};
 
exports.update_settings = function(req, res){
    Settings.findOneAndUpdate({_id: req.params.settingsId}, req.body, {new: true}, function(err, setting) {
        if (err)
            res.status(404).send('Cannot update box settings.');
        res.json(setting);
    });
    res.status(200);
};

exports.delete_settings = function(req, res) {
    Settings.remove({
      _id: req.params.settingsId
    }, function(err, setting) {
      if (err) {
        // res.send(err);
        res.status(404).send('Bad Request: Cannot delete settings data.');
      } else {
        res.json({ message: 'Settings successfully deleted.' });
      }
    });
    res.status(204);
  };