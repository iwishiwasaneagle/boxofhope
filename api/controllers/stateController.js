'use strict' 

// Controller for states
var mongoose = require('mongoose'),
  State = mongoose.model('State');

exports.update_uvc_state = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.read_uvc_last = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.read_mask_present = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.update_mask_present = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.read_uvc_last = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.read_switch_open_close = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};


exports.update_switch_open_close = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

exports.update_user_home = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.send(err);
        res.json(state);
    });
    res.status(200);
};

