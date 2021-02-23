'use strict' 

// Controller for masks 
var mongoose = require('mongoose'),
Mask = mongoose.model('Masks');

exports.read_mask_count = function(req, res) {
    Mask.find({}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };

exports.register_new_mask = function(req, res) {
    var new_mask = new Masks(req.body);
    new_mask.save(function(err, mask) {
        if (err)
        res.send(err);
        res.json(mask);
    });
};

exports.read_mask = function(req, res) {
  Task.findById(req.params.maskId, function(err, mask) {
    if (err)
      res.send(err);
    res.json(mask);
  });
};

exports.update_mask = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.maskId}, req.body, {new: true}, function(err, mask) {
    if (err)
      res.send(err);
    res.json(mask);
  });
};

exports.delete_mask = function(req, res) {
    Mask.remove({
      _id: req.params.maskId
    }, function(err, mask) {
      if (err)
        res.send(err);
      res.json({ message: 'Mask successfully deleted' });
    });
  };
     