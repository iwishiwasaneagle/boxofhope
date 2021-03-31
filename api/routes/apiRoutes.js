'use strict';
module.exports = function(app) {
    var state = require('../controllers/stateController');
    var settings = require('../controllers/settingsController');
    var mask = require('../controllers/maskController');
    var notification = require('../controllers/notificationsController');
    var userHome = require('../controllers/userHomeController');

    // API Routes with Express Swagger Documentation 

    /**
    * This request logs the current state of either: the uvc lights, the box door, or the presence of a mask.
    * @route POST /state/register-new
    * @group state - Operations about system states
    * @param {stateModel} body.required - State object that needs to be registered. 
    * Example: 
    * {
    *    "keyword": "uvc",
    *    "state": "on"
    * }
    * @returns {object} 201 - Created
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/register-new')
        .post(state.register_status);      

    /**
    * This request returns all data related to a state for a user specified number of days. 
    * @route GET /state/'keyword'/:countBack
    * @group state - Operations about system states
    * @param {string} keyword.required - State identifier. 
    * enum: ['uvc', 'door', 'mask']
    * @param {number} countBack - The selected number of days for which data will be retrieved. 
    * Example: 
    * countBack = 7 returns the data on the specified state for the past week.
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'uvc'));

    app.route('/state/door/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'door'));

    app.route('/state/mask/since/:countBack')
    .get((req,res)=>state.get_status_since(req,res,'mask'));


    /**
    * This request returns all data related to a state. 
    * @route GET /state/'keyword'/all
    * @group state - Operations about system states
    * @param {string} keyword.required - State identifier. 
    * enum: ['uvc', 'door', 'mask']
    * @returns {object} 200 - OK 
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/all')
        .get((req,res)=>state.get_all_status(req,res,'uvc'));

     app.route('/state/door/all')
     .get((req,res)=>state.get_all_status(req,res,'door'));    
     
     app.route('/state/mask/all')
         .get((req,res)=>state.get_all_status(req,res,'mask'));

    /**
    * This request returns the latest data entry related to a state.
    * @route GET /state/'keyword'/latest
    * @group state - Operations about system states    
    * @param {string} keyword.required - State identifier. 
    * enum: ['uvc', 'door', 'mask']
    * @returns {object} 200 - OK
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/uvc/latest')
        .get((req,res)=>state.get_latest_status(req,res,'uvc'));

    app.route('/state/door/latest')
        .get((res,req)=>state.get_latest_status(res,req,'door'));

    app.route('/state/mask/latest')
        .get((res,req)=>state.get_latest_status(res,req,'mask'));


    /**
    * Primarily used for testing, this request deletes a data entry using it's unique id.
    * @route DELETE /state/:statusId
    * @group state - Operations about system states   
    * @param {string} keyword.required - State identifier. 
    * enum: ['uvc', 'door', 'mask']
    * @returns {object} 204 - Deleted
    * @returns {Error}  404 - Bad Request: Cannot register status.
    */

    app.route('/state/:statusId')
        .delete(state.delete_status);


    /**
    * This request registers a new userHome status.
    * @route POST /userHome/user-home
    * @group userHome - Operations about user home status 
    * @param {String} user_status - Describes whether the user is home or not. 
    * enum: ['User Home', 'User Not Home']
    * @param {Date} createdAt - Time at which user status is logged. 
    * Default: Now.
    * @returns {object} 201 - Created 
    * @returns {Error}  default - Unexpected error
    */
    app.route('/userHome/user-status')
        .post(userHome.set_user_home);  
    

    /**
    * This request returns all data related to a state for a user specified number of days. 
    * @route GET /userHome/:countBack
    * @group userHome - Operations about user home status 
    * @param {number} countBack - The selected number of days for which data will be retrieved. 
    * Example: 
    * countBack = 7 returns the data on the specified state for the past week. 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

     app.route('/userHome/since/:countBack')
     .get((req,res)=>userHome.get_userHome_since(req,res));


    /**
    * This request returns all data related to userHome. 
    * @route GET /userHome/all
    * @group userHome - Operations about user home status 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/userHome/all')
        .get((req,res)=>userHome.get_all_userHome(req,res));


    /**
    * This request returns the latest data entry for userHome.
    * @route GET /userHome/latest
    * @group userHome - Operations about user home status 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

     app.route('/userHome/latest')
     .get((res,req)=>userHome.get_latest_userHome(res,req));


    /**
    * Primarily used for testing, this request retrieves a data entry using its unique id.
    * @route GET /user-status/:userHomeId
    * @group userHome - Operations about user home status 
    * @param {String} userHomeId - automatically-generated unique identifier for each new userHome data entry.
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * Primarily used for testing, this request updates a data entry using its unique id.
    * @route PUT /user-status/:userHomeId 
    * @group userHome - Operations about user home status 
    * @param {String} userHomeId - automatically-generated unique identifier for each new userHome data entry.
    * @param {userHomeModel} body.required - State object that needs to be updated. 
    * Example: 
    * {
    *    "user-status": "User Home"
    * }
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */
    
    /**
    * Primarily used for testing, this request deletes a data entry using its unique id.
    * @route DELETE /user-status/:userHomeId
    * @group userHome - Operations about user home status 
    * @param {String} userHomeId - automatically-generated unique identifier for each new userHome data entry.
    * @returns {object} 204 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/userHome/user-status/:userHomeId')
        .get(userHome.read_user_home)
        .put(userHome.update_user_home)
        .delete(userHome.delete_user_home);


    /**
    * This request registers a new sterilisation setting.
    * @route POST /settings/sterilisation-time
    * @group settings - Operations about system settings
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. 
    * Default 90 seconds.
    * @returns {object} 201 - Created 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/settings/sterilisation-time')
        .post(settings.set_sterilisation_time);

    /**
    * This request retrieves a data entry using its unique id.
    * @route GET /settings/sterilisation-time/:settingsId
    * @group settings - Operations about system settings
    * @param {String} settingsId - automatically-generated unique identifier for each new settings data entry.
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This request updates a data entry using its unique id.
    * @route PUT /settings/sterilisation-time/:settingsId
    * @group settings - Operations about system settings
    * @param {String} settingsId - automatically-generated unique identifier for each new settings data entry.
    * @param {Number} sterilisation_time - Length of time require to sterilise mask using UVC LEDs. (Default 90 seconds.)
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * Primarily used for testing, this request deletes a data entry using its unique id.
    * @route DELETE /settings/sterilisation-time/:settingsId
    * @group settings - Operations about system settings
    * @param {String} settingsId - automatically-generated unique identifier for each new settings data entry.
    * @returns {object} 204 - OK
    * @returns {Error}  default - Unexpected error
    */

    app.route('/settings/sterilisation-time/:settingsId')
        .get(settings.read_current_sterilisation_time)
        .put(settings.update_sterilisation_time)
        .delete(settings.delete_sterilisation_time);


    /**
    * This request registers a new mask.
    * @route POST /mask/register-new
    * @group mask - Operations about mask data 
    * @param {Date} registered_date - Date of mask registration.
    * Default: Now. 
    * @param {String} status - enum: ['Checked Out', 'In Box', 'Being Cleaned']
    * @param {Date} last_check_in - Most recent mask check-in date.
    * @returns {object} 201 - Created 
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/register-new')
        .post(mask.register_new_mask);


    /**
    * This request retrieves the total number of registered masks. 
    * @route GET /mask/mask-count
    * @group mask - Operations about mask data 
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

     app.route('/mask/mask-count')
     .get(mask.read_mask_count);


    /**
    * This request returns the current data reated to a particular mask. 
    * @route GET /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {String} maskId - Unique mask identifier.
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * This function updates the data related to a particular mask. 
    * @route PUT /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {String} maskId - Unique mask identifier.
    * @returns {object} 200 - OK
    * @returns {Error}  default - Unexpected error
    */

    /**
    * Primarily used for testing, this request deletes a data entry using its unique id.
    * @route DELETE /mask/:maskId
    * @group mask - Operations about mask data 
    * @param {String} maskId - Unique mask identifier.
    * @returns {object} 204 - No Content
    * @returns {Error}  default - Unexpected error
    */

    app.route('/mask/:maskId')
        .get(mask.read_mask)
        .put(mask.update_mask)
        .delete(mask.delete_mask);     
        

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

