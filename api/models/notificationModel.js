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
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
