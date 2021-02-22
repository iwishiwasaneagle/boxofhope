'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var StateSchema = new Schema ({
    // Placeholder schema 
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
      },
      Created_date: {
        type: Date,
        default: Date.now
      },
      status: {
        type: [{
          type: String,
          enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
      }
});

var SettingsSchema = new Schema ({
    // Placeholder schema 
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
      },
      Created_date: {
        type: Date,
        default: Date.now
      },
      status: {
        type: [{
          type: String,
          enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
      }
});

var MaskSchema = new Schema({
    // Placeholder schema 
    // Include settings for: sanitation_time mask_count box_status
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
      },
      Created_date: {
        type: Date,
        default: Date.now
      },
      status: {
        type: [{
          type: String,
          enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
      }
});

module.exports = mongoose.model('State', StateSchema);
//module.exports = mongoose.model('State', StateSchema, 'Settings', SettingsSchema, 'Masks', MaskSchema);