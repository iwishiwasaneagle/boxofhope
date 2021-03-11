'use strict' 

// Controller for notifications 
var mongoose = require('mongoose'),
    hash = require('object-hash'),
    Notification = mongoose.model('Notification'),
    notificationsRunners = require('../runners/notificationRunnable');


exports.register_new_notification_data = function(req, res) {
    const data = req.body;
    // Check for no body
    if(data && Object.keys(data).length > 0){
        data['_id'] = hash(data.endpoint);
        var new_notification = new Notification(data);
        new_notification.save(function(err, notification) {
            if (err){
                switch(err.code){
                    case 11000:
                        res.status(400).send("Duplicate subscription with id: " + data._id);
                        break;
                    default:
                        res.status(400).send("Error: MongoDB status code " + err.code);
                }
            }
            console.log(notification);
            res.json(new_notification.toClient());
        });
    }
    else{
        res.status(400).send("No data");
    }
};

exports.read_notification_data = function(req, res) {
    Notification.findById(
      req.params.id,
      function(err, notification) {
          if (err){
            res.status(404).send('Bad Request: Cannot read notification data.');
          }
          if(notification && Object.keys(notification).length>0)
          {
            res.json(notification.toClient());
          }else{
            res.status(404).send(req.params.id+ " not found");
          }

  });
};

exports.delete_notification_data = function(req, res) {
    Notification.deleteOne({
      _id: req.params.id
    }, function(err, notification) {
      if (err)
        res.status(404).send('Bad Request: Cannot delete notification data.');
      res.json({ message: 'notification successfully deleted', _id: req.params.notificationId  });
    });
  };
     
exports.send_notification = function(req,res){
    console.log("send_notification to _id="+req.params.id);
    notificationsRunners.send(req.params.id).then((ret)=>res.status(200).send(ret)).catch((err)=>res.status(4040).send(err));
    };

exports.get_latest_id = function(req,res){
    notificationsRunners.get_latest().then((ret)=>res.status(200).send(ret)).catch((err)=>res.status(404).send(err));
};
