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
 * @property {integer} max_wears - The maximum number of wears before a notification will be sent to the user to wash the mask.
 * Default: 3 wears.
 * @property {integer} max_days_between_washes - Length of time since the last wash before a notification will be sent to the user to wash the mask.
 * Default: 3 days.
 * @property {date} most_recent_wash - Stores the date and time of the mask's most recent wash. 
 * Default: Date.now
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