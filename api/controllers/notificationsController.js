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
     
exports.send_notification = function(req,res){
    console.log("send_notification to _id="+req.params.id);
    Notification.findById(req.params.id, function(err, notification){
        if(err){
            res.send(err);
        }
        // TODO CHANGE THESE DOWN THE LINE
        webpush.setVapidDetails(
            "mailto:jh.ewers@gmail.com",
            "BN6BhZ2mBQ-oiR78XnNrizLWotzej3iL-TTaTn5egHMmBfqJpdrmbUiIjjy_PsHgacuh3i17Hpgx7LuWwQL9Dvg",
            "A93a0xUMa4PeoXMZkA8b7iA4vmIkh9-I7AN85DH5G1o"
        );

        const pushSub = {endpoint:notification.endpoint,
            keys:notification.keys            
        };
        console.log(pushSub);

        webpush.sendNotification(pushSub, JSON.stringify({
            url: "http://www.google.com",
            text: "Hi there",
            image: "https://spyna.it/icons/favicon.ico",
            tag: "wow",
            title: "Martin SMelzz"
         })).then(
            ()=>res.send("OK")
        );
    });
