var mongoose = require('mongoose'),
    Settings = mongoose.model('Settings'); 

    exports.get_max_washes = () =>{
        return Settings.find({"keyword": "max-wears"}, "value").sort({"createdAt":-1}).limit(1).then(function(setting){
            if (typeof setting[0] == "undefined"){
                console.error("No settings found!");
                return;
            }
            return(setting[0].value);
        });
    }
    