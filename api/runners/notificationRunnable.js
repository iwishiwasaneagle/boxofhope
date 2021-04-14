var mongoose=require('mongoose'),Notification = mongoose.model('Notification');
var webpush = require('web-push');

exports.get_latest = () => {
   return Notification.find({}, '_id').sort({"createdAt":-1}).limit(1).then(function(notification){
        if (typeof notification[0] == "undefined"){
            console.error("No subscriptions found!");
            return;
        }
        console.log("Latest id:", notification[0]._id);
        return {id:notification[0]._id};
    });
};

exports.send = (id, notifType) => {
    return Notification.findById(id, function(err, notification){
        if (err) {
            console.error("Error: ",err);
            throw 'Bad Request: Cannot send notification.';
        }

        webpush.setVapidDetails(
            "mailto:jh.ewers@gmail.com",
            "BN6BhZ2mBQ-oiR78XnNrizLWotzej3iL-TTaTn5egHMmBfqJpdrmbUiIjjy_PsHgacuh3i17Hpgx7LuWwQL9Dvg",
            "A93a0xUMa4PeoXMZkA8b7iA4vmIkh9-I7AN85DH5G1o"
        );

        const pushSub = {endpoint:notification.endpoint,
            keys:notification.keys            
        };
        console.log(pushSub);

        var text = "You have left your mask at home!";
        var tag = "mask";
        var title = "Boxofhope: MASK";

        console.log("-----------");
        console.log(notifType);

        if (notifType == "washMe"){
            text = "Please wash your mask!";
        }

        webpush.sendNotification(pushSub, JSON.stringify({
            url: "http://www.boxofhope.co.uk",
            text: text,
            tag: tag,
            title: title
         })).then(
            ()=>{return "OK"});
    });
};
