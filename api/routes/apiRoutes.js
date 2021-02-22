'use strict';
module.exports = function(app) {
    var state = require('../controllers/apiController');
    var settings = require('../controllers/apiController');
    var mask = require('../controllers/apiController');

    // API Routes
    app.route('/state/UVC')
        .put(state.update_uvc_state);

    app.route('/state/UVC/last')
        .get(state.read_uvc_last);

    app.route('/state/presentMask')
        .get(state.read_mask_present)
        .put(state.update_mask_present);

    app.route('/state/doorSwitch')
        .get(state.read_switch_open_close)
        .put(state.update_switch_open_close);

    app.route('/state/UserHome')
        .put(state.update_user_home);

    // app.route('/settings/sanitation_time')
    //     .get(settings.read_current_sanitation_time)
    //     .put(settings.update_sanitation_time);

    // app.route('/settings/mask_count')
    //     .get(settings.read_current_mask_count);

    // app.route('/mask/registerNew')
    //     .put(mask.registerNew);
}