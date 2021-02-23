'use strict' 

// Controller for notifications 
var mongoose = require('mongoose'),
Notification = mongoose.model('Notification');

exports.register_new_notification_data = function(req, res) {
    var new_notification = new Notification(req.body);
    new_notification.save(function(err, notification) {
        if (err)
            res.send(err);
        res.json(notification);
    });
};

exports.read_notification_data = function(req, res) {
  Notification.findById(req.params.notificationId, function(err, notification) {
    if (err)
      res.send(err);
    res.json(notification);
  });
};

exports.delete_notification_data = function(req, res) {
    Notification.deleteOne({
      _id: req.params.notificationId
    }, function(err, notification) {
      if (err)
        res.send(err);
      res.json({ message: 'notification successfully deleted', _id: req.params.notificationId  });
    });
  };
     