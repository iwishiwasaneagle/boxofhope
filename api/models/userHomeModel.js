'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var userHomeSchema = new Schema ({
    _id: {
        type:String,
        required: true
    },
    user_status: {
      type: [{
        type: String,
        enum: ['User Home', 'User Not Home']
      }]
    }
});

module.exports = mongoose.model('userHome', userHomeSchema);