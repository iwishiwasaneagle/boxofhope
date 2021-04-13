var mongoose = require('mongoose'),
    Settings = mongoose.model('Settings'); 

    exports.get_max_washes = () =>{
        return Settings.find({"keyword": "max-wears"}, "value").sort({"createdAt":-1}).limit(1).then(function(setting){
            return(setting[0].value);
        });
    }
    