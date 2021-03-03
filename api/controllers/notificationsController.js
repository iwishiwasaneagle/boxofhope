'use strict' 

// Controller for notifications 
var mongoose = require('mongoose'),
    webpush = require('web-push'),
    hash = require('object-hash'),
    Notification = mongoose.model('Notification');


exports.register_new_notification_data = function(req, res) {
    const data = req.body;
    // Check for no body
    if(data && Object.keys(data).length > 0){
        data['_id'] = hash(data.keys.auth);
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
            res.json(notification.toClient());
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
              res.send(err);
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
        console.log("hi");
        const pushSub = {endpoint:notification.endpoint,
            keys:notification.keys            
        };
        console.log(pushSub);

        webpush.sendNotification(pushSub, JSON.stringify({
            url: "http://www.boxofhope.co.uk",
            text: "This is a test notification!",
            tag: "wow",
            title: "Test test test"
         })).then(
            ()=>res.send("OK")
        );
    })};

exports.get_latest_id = function(req,res){
    Notification.find({}, '_id').sort({"createdAt":-1}).limit(1).exec(function(err, notification){
        if(err){
            res.send(err);    
        }

        res.json({id:notification[0]._id});
    })};
