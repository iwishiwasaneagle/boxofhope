'use strict' 

// Controller for masks 
var mongoose = require('mongoose'),
Masks = mongoose.model('Masks');

exports.read_mask_count = function(req, res) {
    Masks.find({}, function(err, task) {
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

exports.delete_mask = function(req, res) {
    Masks.remove({
      _id: req.params.taskId
    }, function(err, task) {
      if (err)
        res.send(err);
      res.json({ message: 'Mask successfully deleted' });
    });
  };