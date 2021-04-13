'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    keyword:{
        type: Number,
        enum: ['sterilisation', 'max_wears', 'max_days'],
        required: true
    },
      most_recent_wash:{
          type: Date,
          default: Date.now
      }
});

module.exports = mongoose.model('Settings', SettingsSchema);