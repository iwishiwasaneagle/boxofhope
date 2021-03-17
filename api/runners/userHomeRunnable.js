var mongoose = require('mongoose'),UserHome = mongoose.model('UserHome'),Mask = mongoose.model('Mask'), State = mongoose.model('State'); 
var notificationRunnables = require('./notificationRunnable');


exports.run = (userHomeState, req, res) => {
    console.log("userHomeRunnable.run with", userHomeState);
    if (userHomeState.user_status[0] === "User Home") {
        return;
    }
    UserHome.find({}, 'user_status').sort({ "status_date": -1 }).limit(1).exec(function (err, userHomeStatePrev) {
        if (typeof userHomeStatePrev[0] === "undefined" || userHomeStatePrev[0].user_status[0] === "User Not Home") { // No update
            return;
        }
        console.log("userHomeRunnable.run : userHomeStatePrev[0].user_status[0] = ", userHomeStatePrev[0].user_status[0]);
        State.find({"keyword":"mask"}, "state").sort({"createdAt":-1}).limit(1).exec(function (err, maskState) {
            if (err){
                console.log(err)
                return;
            }
            if (typeof maskState[0] === "undefined"){
                return;
            }
            if (maskState[0].state === "off") { // Mask is out and about
                return;
            }
            console.log("Start of notification sending process");
            try {
                notificationRunnables.get_latest().then(sub => {
                    if(typeof sub == "undefined") return;
                    console.log("Notification ID: ", sub.id);
                    notificationRunnables.send(sub.id);
                }).catch(err => console.error(err));

            } catch (err) {
                console.error(err);
            }
            console.log("End of notification sending process");
        });
    });
};
