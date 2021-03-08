'use strict' 

// Controller for settings 
var mongoose = require('mongoose'),
Settings = mongoose.model('Settings');

exports.set_sterilisation_time = function(req, res) {
    var new_settings = new Settings(req.body);
    new_settings.save(function(err, setting) {
        if (err) {
          res.status(404).send('Bad Request: Cannot set sterilisation time.');
        }
        res.json(setting);
    });
    res.status(201);
};
exports.read_current_sterilisation_time = function(req, res){
    Settings.find({}, function(err,setting){
        if (err)
            res.status(404).send('Bad Request: Cannot read current sterilisation time.');
        res.json(setting);
    });
    res.status(200);
};

exports.update_sterilisation_time = function(req, res){
    Settings.findOneAndUpdate({}, req.body, {new:true}, function(err,setting){
        if (err)
            res.status(404).send('Cannot update sterilisation time');
        res.json(setting);
    });
    res.status(200);
};