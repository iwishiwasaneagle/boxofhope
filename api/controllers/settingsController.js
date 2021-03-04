'use strict' 

// Controller for settings 
var mongoose = require('mongoose'),
Settings = mongoose.model('Settings');

exports.read_current_sterilisation_time = function(req, res){
    Settings.find({}, function(err,setting){
        if (err)
            res.send(err);
        res.json(setting);
    });
    res.status(200);
};

exports.update_sterilisation_time = function(req, res){
    Settings.findOneAndUpdate({}, req.body, {new:true}, function(err,setting){
        if (err)
            res.send(err);
        res.json(setting);
    });
    res.status(200);
};