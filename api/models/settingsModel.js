'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SettingsSchema = new Schema ({
    keyword:{
        type: String,
        enum: ['sterilisation', 'max-wears', 'max-days'],
        required: true
    },
    value:{
        type: Number,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Settings', SettingsSchema);