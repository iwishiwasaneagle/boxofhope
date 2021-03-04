'use strict' 

// Controller for masks 
var mongoose = require('mongoose'),
Mask = mongoose.model('Mask');

exports.read_mask_count = function(req, res) {
    Mask.find({}, function(err, mask) {
      if (err)
        res.send(err);
      res.json(mask);
    });
    res.status(200);
  };

exports.register_new_mask = function(req, res) {
    var new_mask = new Mask(req.body);
    new_mask.save(function(err, mask) {
        if (err)
        res.send(err);
        res.json(mask);
    });
    res.status(201);
};

exports.read_mask = function(req, res) {
  Mask.findById(req.params.maskId, function(err, mask) {
    if (err)
      res.send(err);
    res.json(mask);
  });
  res.status(200);
};

exports.update_mask = function(req, res) {
  Mask.findOneAndUpdate({_id: req.params.maskId}, req.body, {new: true}, function(err, mask) {
    if (err)
      res.send(err);
    res.json(mask);
  });
  res.status(200);
};

exports.delete_mask = function(req, res) {
    Mask.remove({
      _id: req.params.maskId
    }, function(err, mask) {
      if (err)
        res.send(err);
      res.json({ message: 'Mask successfully deleted' });
    });
    res.status(204);
  };
     