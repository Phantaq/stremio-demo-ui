(function () {
    'use strict';

    var client = require('stremio-addon-client')

    angular
        .module('stremioApp')
        .service('stremio', stremioService)

    stremioService.$inject = []

    function stremioService() {
        let col = new client.AddonCollection()
        col.load(require('sample-addon-store'))
        return col
    }

})();
