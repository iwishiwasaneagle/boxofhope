'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var StateSchema = new Schema ({
        keyword:{
            type: String,
            enum: ['uvc', 'door', 'mask'],
            required: true
        },
        state:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        countBack:{
            type: Number,
            default: 7
        }
});

module.exports = mongoose.model('State', StateSchema);