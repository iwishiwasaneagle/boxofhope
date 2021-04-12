'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    sterilisation_time: {
        type: Number,
        default: 90
      } ,
      max_wears:{
          type: Number,
          default: 3
      },
      max_days_between_washes:{
          type: Number,
          default: 3
      },
      most_recent_wash:{
          type: Date,
          default: Date.now
      }
});

module.exports = mongoose.model('Settings', SettingsSchema);