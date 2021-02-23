'use strict';
module.exports = function(app) {
    var state = require('../controllers/stateController');
    var settings = require('../controllers/settingsController');
    var mask = require('../controllers/maskController');

    // API Routes
    app.route('/state/UVC')
        .put(state.update_uvc_state);

    app.route('/state/UVC/last')
        .get(state.read_uvc_last);

    app.route('/state/present-mask')
        .get(state.read_mask_present)
        .put(state.update_mask_present);

    app.route('/state/door-switch')
        .get(state.read_switch_open_close)
        .put(state.update_switch_open_close);

    app.route('/state/user-home')
        .put(state.update_user_home);

    app.route('/settings/sterilisation-time')
        .get(settings.read_current_sterilisation_time)
        .put(settings.update_sterilisation_time);

    app.route('/mask/mask-count')
        .get(mask.read_mask_count);

    app.route('/mask/register-new')
        .post(mask.register_new_mask);

    app.route('/mask/:maskId')
        .get(mask.read_mask)
        .put(mask.update_mask)
        .delete(mask.delete_mask);        
}