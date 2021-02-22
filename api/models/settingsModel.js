'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    sanitation_time: {
        type: NumberInt,
      },

});

module.exports = mongoose.model('Settings', SettingsSchema);