// Express Swagger Docs For Each Schema 

/**
 * @typedef stateModel
 * @property {enum} keyword.required - State identifier. - eg: 'uvc', 'door', 'mask'
 * @property {string} state.required - State description. - eg: 'open', 'closed', 'on', 'off'
 * @property {date} createdAt - Date and time of state registration. 
 * Default: Now.
 */


/**
 * @typedef userHomeModel
 * @property {enum} user_status - Logs whether the user is home. - eg: 'User Home', 'User Not Home'
 * @property {date} createdAt - Default: Now.
 */


/**
 * @typedef settingsModel
 * @property {integer} sterilisation_time - Length of time the UVC will operate to carry out sterilisation. 
 * Default: 90 seconds. 
 */


/**
 * @typedef maskModel
 * @property {date} registered_date - Date of initial mask registration.
 * Default: Now.
 * @property {enum} status - Describes the location of a particular mask. 
 * Default: ['Checked Out'] - eg: 'Checked Out', 'In Box', 'Being Cleaned'
 * 
 * @property {date} last_check_in - Date of most recent box check-in. 
 * 
 */


/**
 * @typedef notificationModel
 * @property {string} _id - Unique identifier created using hashmap. 
 * @property {string} endpoint.reqiured - PushNotification Endpoint
 * @property {string} keys - Contains the nested keys auth and p256dh.
 * @property {string} auth.required - auth key
 * @property {string} p256dh.required - p256dh key 
 */



/**
 * * TO DO - REMOVE THIS - IT'S JUST AN EXAMPLE
 * This function comment is parsed by doctrine
 * sdfkjsldfkj
 * @route POST /users
 * @param {Point.model} point.body.required - the new point
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @param {enum} status.query.required - Status values that need to be considered for filter - eg: available,pending
 * @operationId retrieveFooInfo
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response.model} 200 - An array of user info
 * @returns {Product.model}  default - Unexpected error
 * @returns {Array.<Point>} Point - Some description for point
 * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @security JWT
 */