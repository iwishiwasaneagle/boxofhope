'use strict' 

// Controller for states
var mongoose = require('mongoose'),
  State = mongoose.model('State');

exports.register_status = function(req, res) {
    var new_status = new State(req.body);
    console.log(JSON.stringify(new_status));
    new_status.save(function(err, status) {
        if (err) {
          res.status(404).send('Bad Request: Cannot register status.');
        }
        res.json(status);
    });
    res.status(201);
};

exports.get_all_status = (req,res,keyword) => {
    // TODO: Calculate limit based on how many days of data required. 
    return State.find({"keyword": keyword}).sort({"createdAt":-1}).exec(function(err,status){
        if (err) {
            res.status(404).send('Bad Request: Cannot get status list.');
        }
        console.log(status);
         res.json(status);
     });
 };

exports.get_latest_status = (req,res,keyword) => {
    return State.find({"keyword": keyword}).sort({"createdAt":-1}).limit(1).exec(function(err,status){
        if (err) {
            res.status(404).send('Bad Request: Cannot get latest status.');
        }
        console.log(status);
         res.json(status);
     });
 };

exports.delete_status = function(req, res) {
    State.remove({
      _id: req.params.statusId
    }, function(err, status) {
        if (err) 
            res.status(404).send('Bad Request: Cannot delete status data.');
        res.json({ message: 'Status successfully deleted.' });
    });
    res.status(204);
  };

