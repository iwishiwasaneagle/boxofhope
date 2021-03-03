'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var NotificationSchema = new Schema ({
    _id: {
        type:String,
        required: true
    },
    endpoint:{
        type: String,
        required: true,
    },
    keys:{
        auth:{
            type: String,
            required: true
        },
        p256dh:{
            type: String,
            required: true
        }
    }},
    {timestamps:true}
);

NotificationSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

module.exports = mongoose.model('Notification', NotificationSchema);
