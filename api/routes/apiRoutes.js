'use strict';
module.exports = function(app) {
    var state = require('../controllers/stateController');
    var settings = require('../controllers/settingsController');
    var mask = require('../controllers/maskController');
    var notification = require('../controllers/notificationsController');
    var userHome = require('../controllers/userHomeController');

    // API Routes with Swagger Documentation 

    /**
    * This function comment is parsed by doctrine
    * @route POST /state/register-new
    * @group state - Operations about system states
    * @param {String} keyword - ['uvc', 'door', 'mask']
    * @param {String} state - ['on', 'off', 'open', 'close']
    * @param {Date} createdAt - Logs data entry time. Default: Date.now
    * @returns {object} 201 - Created
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/register-new')
        .post(state.register_status);      

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/uvc/all
    * @group state - Operations about system states
    * @param {String} keyword - 'uvc'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'uvc'));

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/door/all
    * @group state - Operations about system states
    * @param {String} keyword - 'door'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/door/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'door'));

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/mask/all
    * @group state - Operations about system states
    * @param {String} keyword - 'mask'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/mask/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'mask'));
        
    /**
    * This function comment is parsed by doctrine
    * @route GET /state/uvc/all
    * @group state - Operations about system states
    * @param {String} keyword - 'uvc'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/all')
        .get((req,res)=>state.get_all_status(req,res,'uvc'));

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/door/all
    * @group state - Operations about system states
    * @param {String} keyword - 'door'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

     app.route('/state/door/all')
     .get((req,res)=>state.get_all_status(req,res,'door'));    
     
     /**
     * This function comment is parsed by doctrine
     * @route GET /state/mask/all
     * @group state - Operations about system states
     * @param {String} keyword - 'mask'
     * @returns {object} 200 - OK
     * @returns {Error}  404 - Bad Request: Cannot register status.
     */
 
     app.route('/state/mask/all')
         .get((req,res)=>state.get_all_status(req,res,'mask'));
    /**
    * This function comment is parsed by doctrine
    * @route GET /state/uvc/latest
    * @group state - Operations about system states
    * @param {String} keyword - 'uvc'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/latest')
        .get((req,res)=>state.get_latest_status(req,res,'uvc'));

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/door/latest
    * @group state - Operations about system states
    * @param {String} keyword - 'door'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/door/latest')
        .get((res,req)=>state.get_latest_status(res,req,'door'));

    /**
    * This function comment is parsed by doctrine
    * @route GET /state/mask/latest
    * @group state - Operations about system states
    * @param {String} keyword - 'mask'
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/mask/latest')
        .get((res,req)=>state.get_latest_status(res,req,'mask'));

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /state/:statusId
    * statusId is the automatically-generated unique identifier for each new status data entry. 
    * @group state - Operations about system states
    * 
    * @param {String} keyword - ['uvc', 'door', 'mask']
    * @returns {object} 204 - Deleted
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/:statusId')
        .delete(state.delete_status);

    /**
    * This function comment is parsed by doctrine
    * @route POST /userHome/user-home
    * @group userHome - Operations about user home status 
    * @param {String} user_status - ['User Home', 'User Not Home']
    * @param {Date} status_time - Time at which user status is logged. 
    * @returns {object} 201 - Created 
    * @returns {Error}  default - Unexpected error
    */
    app.route('/userHome/user-status')
        .post(userHome.set_user_home);  
    
    /**
    * This function comment is parsed by doctrine
    * @route GET /user-status/:userHomeId
    * userHomeId is the automatically-generated unique identifier for each new userHome data entry. 
    * @group userHome - Operations about user home status 
    * @param {String} user_status - ['User Home', 'User Not Home']
    * @param {Date} status_time - Time at which user status is logged. 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /user-status/:userHomeId
    * userHomeId is the automatically-generated unique identifier for each new userHome data entry. 
    * @group userHome - Operations about user home status 
    * @param {String} user_status - ['User Home', 'User Not Home']
    * @param {Date} status_time - Time at which user status is logged. 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */
    
    /**
    * This function comment is parsed by doctrine
    * @route DELETE /user-status/:userHomeId
    * userHomeId is the automatically-generated unique identifier for each new userHome data entry. 
    * @group userHome - Operations about user home status 
    * @param {String} user_status - ['User Home', 'User Not Home']
    * @param {Number} status_time - Time at which user status is logged. 
    * @returns {object} 204 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/userHome/user-status/:userHomeId')
        .get(userHome.read_user_home)
        .put(userHome.update_user_home)
        .delete(userHome.delete_user_home);

    /**
    * This function comment is parsed by doctrine
    * @route POST /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. (Default 90 seconds.)
    * @returns {object} 201 - Created 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/settings/sterilisation-time')
        .post(settings.set_sterilisation_time);

    /**
    * This function comment is parsed by doctrine
    * @route GET /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. (Default 90 seconds.)
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. (Default 90 seconds.)
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. (Default 90 seconds.)
    * @returns {object} 204 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/settings/sterilisation-time/:settingsId')
        .get(settings.read_current_sterilisation_time)
        .put(settings.update_sterilisation_time)
        .delete(settings.delete_sterilisation_time);

    /**
    * This function comment is parsed by doctrine
    * @route GET /mask/mask-count
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 200 - OK
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
    * @returns {object} 201 - Created 
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
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route PUT /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/:maskId')
        .get(mask.read_mask)
        .put(mask.update_mask)
        .delete(mask.delete_mask);     
        
    /**
    * This function comment is parsed by doctrine
    * @route DELETE /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/latest')
        .get((res,req)=>mask.get_latest_mask(res,req));
    
    /** 
     * TODO: FIX DOCS
     */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /mask/all
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/all')
        .get((req,res)=>mask.get_all_status(req,res));

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * @param {String} status - ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/since/:countBack')
        .get((req,res)=>state.get_status_since(req,res));

    /**
    * This function comment is parsed by doctrine
    * @route POST /notification/register-new
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/notification/register-new')
        .post(notification.register_new_notification_data);

    /**
    * This function comment is parsed by doctrine
    * @route GET /notification/id/:id
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 200 - OK
    * @returns {Error}  404 - id not found
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function comment is parsed by doctrine
    * @route DELETE /notification/id/:id
    * @group notification - Operations about notification subscriptions
    * @param {string} endpoint - PushNotification endpoint
    * @param {string} key.auth - Auth key
    * @param {string} key.p256dh - p256dh key
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/notification/id/:id')
        .get(notification.read_notification_data)
        .delete(notification.delete_notification_data);
    
    /**
    * This function comment is parsed by doctrine
    * @route POST /notification/send/:id
    * @group notification - Operations about notification subscriptions
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */
    app.route('/notification/send/:id')
        .post(notification.send_notification);

    /**
    * This function comment is parsed by doctrine
    * @route GET /notification/latest
    * @group notification - Operations about notification subscriptions
    * @returns {object} 200 - TODO
    * @returns {Error}  default - Unexpected error
    */
    app.route('/notification/latest')
        .get(notification.get_latest_id);

}

