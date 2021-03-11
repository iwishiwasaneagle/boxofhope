'use strict' 

// Controller for states
var mongoose = require('mongoose'),
  State = mongoose.model('State');

exports.update_uvc_state = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot update UVC state.');
        res.json(state);
    });
    res.status(200);
};

exports.read_uvc_last = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot read last UVC state.');
        res.json(state);
    });
    res.status(200);
};

exports.read_mask_present = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot read if a mask is present.');
        res.json(state);
    });
    res.status(200);
};

exports.update_mask_present = function(req, res){
    const state = new State(req.body);
    state.save(function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot update present mask.');
        res.json(state);
    });
    res.status(200);
};


exports.read_switch_open_close = function(req, res){
    State.find({}, function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot read switch state.');
        res.json(state);
    });
    res.status(200);
};


exports.update_switch_open_close = function(req, res){
    State.findOneAndUpdate({}, req.body, {new:true}, function(err,state){
        if (err)
            res.status(404).send('Bad Request: Cannot update switch state.');
        res.json(state);
    });
    res.status(200);
};
