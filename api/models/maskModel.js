'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var MaskSchema = new Schema ({
    registered_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['Checked Out', 'In Box', 'Being Cleaned']
        }],
        default: ['Checked Out']
    },
    last_check_in: {
        type: Date
    }
});

module.exports = mongoose.model('Mask', MaskSchema);
