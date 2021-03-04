'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var StateSchema = new Schema ({
      uvc_status: {
        type: [{
          type: String,
          enum: ['On', 'Off']
        }],
        default: ['Off']
      },
      uvc_most_recent: {
        type: Number,
      },
      door_status: {
        type: [{
          type: String,
          enum: ['Open', 'Closed']
        }],
        default: ['Open']
      },
      mask_status: {
        type: [{
          type: String,
          enum: ['Mask Present', 'No Mask Present']
        }],
        default: ['No Mask Present']
      },
      user_status: {
        type: [{
          type: String,
          enum: ['User Home', 'User Not Home']
        }]
      }
});

module.exports = mongoose.model('State', StateSchema);