'use strict' 

// Controller for settings 
var mongoose = require('mongoose'),
Settings = mongoose.model('Settings');

exports.read_current_sanitation_time = function(req, res){
    Settings.find({}, function(err,setting){
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.update_sanitation_time = function(req, res){
    Settings.findOneAndUpdate({}, req.body, {new:true}, function(err,setting){
        if (err)
            res.send(err);
        res.json(setting);
    });
};

exports.read_current_mask_count = function(req, res){
    Settings.find({}, function(err,setting){
        if (err)
            res.send(err);
        res.json(setting);
    });
};