var mongoose=require('mongoose'),Notification = mongoose.model('Notification');
var webpush = require('web-push');

exports.get_latest = () => {
   return Notification.find({}, '_id').sort({"createdAt":-1}).limit(1).then(function(notification){
        console.log("Latest id:", notification[0]._id);
        return {id:notification[0]._id};
    });
};

exports.send = (id) => {
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
            ()=>{return "OK"});
    });
};
