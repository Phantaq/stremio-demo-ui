(function () {
    'use strict';

    var aggregators = require('stremio-aggregators')

    angular
        .module('stremioApp')
        .service('stremio', stremioService)

    stremioService.$inject = []

    function stremioService() {
        // WARNING: save/load does not make sense here, since this will prob be sync anyway
        return new aggregators.AddonCollection({
            save: function() { },
            load: function(cb) {
                cb(null, require('sample-addon-store'))
            }
        })
    }

})();
