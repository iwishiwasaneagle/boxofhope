'use strict' 

//placeholder 
var mongoose = require('mongoose'),
  State = mongoose.model('State');
  Settings = mongoose.model('Settings');
  Masks = mongoose.model('Masks');


exports.update_uvc_state = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
};


exports.read_uvc_last = function(req, res){
    State.find({}, function(err,task){
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_mask_present = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
};

exports.read_uvc_last = function(req, res){
    State.find({}, function(err,task){
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_switch_open_close = function(req, res){
    State.find({}, function(err,task){
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_switch_open_close = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
};

exports.update_user_home = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
};

