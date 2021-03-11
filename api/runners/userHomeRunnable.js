var mongoose = require('mongoose'),UserHome = mongoose.model('UserHome'),Mask = mongoose.model('Mask'); 
var notificationRunnables = require('./notificationRunnable');


exports.run = (userHomeState, req, res) => {
    console.log("userHomeRunnable.run with", userHomeState);
    if(userHomeState.user_status=="User Home"){
        return;
    }
    UserHome.find({}, '_id').sort({"status_date":-1}).limit(1).exec(function(err, userHomeStatePrev){
       console.log("userHomeRunnable.run: user was prev = ", userHomeStatePrev.user_status);
       if(userHomeStatePrev.user_status==["User Not Home"]){ // No update
           return;
       }

       Mask.find({}, '_id').sort({"last_check_in":-1}).limit(1).exec(function(err, maskState){
           console.log("Mask state: ",!maskState[0]);
           if(err)return;
           if(!maskState[0])return;
           if(maskState[0].status==="Checked Out"){ // Mask is out and about
               return;          
           }
           console.log("Sending notification!");
           try{
               notificationRunnables.get_latest().then(sub=>{
                   console.log("Notification ID: ", sub.id);
                   notificationRunnables.send(sub.id);
               }).catch(err=>console.error(err));

           }catch (err){
               console.error(err);
           }
       });
   });



};
