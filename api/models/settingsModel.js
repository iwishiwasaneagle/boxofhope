'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    sterilisation_time: {
        type: NumberInt,
      }
});

module.exports = mongoose.model('Settings', SettingsSchema);