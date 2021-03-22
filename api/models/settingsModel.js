'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    sterilisation_time: {
        type: Number,
        default: 90
      }
});

module.exports = mongoose.model('Settings', SettingsSchema);