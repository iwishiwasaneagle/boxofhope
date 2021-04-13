'use strict' 

// Controller for states
var mongoose = require('mongoose'),
  State = mongoose.model('State'),
  notificationsRunners = require('../runners/notificationRunnable'),
  settings = require('../controllers/settingsController');

exports.register_status = function(req, res) {
    var new_status = new State(req.body);
    console.log(JSON.stringify(new_status));

    console.log(settings.read_current_settings());
    console.log("*-------------------------*");
    new_status.save(async function(err, status) {
        if (err) {
          res.status(404).send('Bad Request: Cannot register status.');
        }
        if (new_status.keyword == "mask") {
            var notifId = await notificationsRunners.get_latest();
            State.find({"keyword": "mask"}).exec(function(err, results) {
                if (results.length % 3 == 0) {
                    //  notificationsRunners.send("7c78045e1dc1316b31c5268e95e24d1de066f332");
                    notificationsRunners.send(notifId.id, "washMe");
                }
            });
        }
        res.json(status);
    });
    res.status(201);
};

exports.get_status_since = (req,res,keyword) => {
    var days = req.params.countBack;
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate()-days);
    return State.find({createdAt: {$gt: cutoff},"keyword": keyword}).sort({"createdAt":-1}).exec(function(err,status){
        if (err) {
            res.status(404).send('Bad Request: Cannot get status list.');
        }
        console.log(status);
         res.json(status);
     });
 };

exports.get_all_status = (req,res,keyword) => {
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

