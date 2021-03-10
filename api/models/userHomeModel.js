'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var userHomeSchema = new Schema ({
    user_status: {
      type: [{
        type: String,
        enum: ['User Home', 'User Not Home']
      }]
    },
    status_date: {
      type: Date,
      default: Date.now
  },
});

module.exports = mongoose.model('UserHome', userHomeSchema);