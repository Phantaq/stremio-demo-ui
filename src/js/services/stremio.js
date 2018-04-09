(function () {
    'use strict';

    var client = require('stremio-addon-client')

    angular
        .module('stremioApp')
        .service('stremio', stremioService)

    stremioService.$inject = []

    function stremioService() {
        let col = new client.AddonCollection()
        let promises = col.load(require('sample-addon-store'))

        // Catch errors on trying to update the manifests for those add-ons
        promises.forEach(function(p) {
            p.catch(function(err) { console.error(err) })
        })

        return col
    }

})();
