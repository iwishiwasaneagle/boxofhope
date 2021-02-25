'use strict';
module.exports = function(app) {
    var state = require('../controllers/stateController');
    var settings = require('../controllers/settingsController');
    var mask = require('../controllers/maskController');
    var notification = require('../controllers/notificationsController');

    // API Routes with Swagger Documentation 

    /**
    * This function comment is parsed by doctrine
    * @route PUT /state/UVC
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */
    app.route('/state/UVC')
        .put(state.update_uvc_state);

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/UVC/last
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/state/UVC/last')
        .get(state.read_uvc_last);

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/present-mask
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /state/present-mask
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/state/present-mask')
        .get(state.read_mask_present)
        .put(state.update_mask_present);

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/door-switch
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /state/door-switch
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/state/door-switch')
        .get(state.read_switch_open_close)
        .put(state.update_switch_open_close);

    /**
    * This function comment is parsed by doctrine
    * @route PUT /state/user-home
    * @group state - Operations about system states
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/state/user-home')
        .put(state.update_user_home);
    
    /**
    * This function comment is parsed by doctrine
    * @route GET /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. 
    * @returns {object} setting
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. 
    * @returns {object} setting
    * @returns {Error}  default - Unexpected error
    */

    app.route('/settings/sterilisation-time')
        .get(settings.read_current_sterilisation_time)
        .put(settings.update_sterilisation_time);

    /**
    * This function comment is parsed by doctrine
    * @route GET /mask/mask-count
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} mask 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/mask-count')
        .get(mask.read_mask_count);

    /**
    * This function comment is parsed by doctrine
    * @route POST /mask/register-new
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} mask 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/register-new')
        .post(mask.register_new_mask);

    /**
    * This function comment is parsed by doctrine
    * @route GET /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} mask 
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} mask 
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} mask 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/:maskId')
        .get(mask.read_mask)
        .put(mask.update_mask)
        .delete(mask.delete_mask);        

    /**
    * This function comment is parsed by doctrine
    * @route GET /notification/register-new
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/notification/register-new')
        .post(notification.register_new_notification_data);

    /**
    * This function comment is parsed by doctrine
    * @route PUT /notification/:id
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /notification/:id
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */

    app.route('/notification/:id')
        .get(notification.read_notification_data)
        .delete(notification.delete_notification_data);

}

