(function () {
    'use strict';

    var client = require('stremio-addon-client')

    angular
        .module('stremioApp')
        .service('stremio', stremioService)

    stremioService.$inject = []

    function stremioService() {
        let col = new client.AddonCollection()
        let promises = col.load(require('stremio-official-addons'))

        // Update manifests, catch errors on trying to update
        col.addons.forEach(function(addon) {
            addon.getLatestManifest()
            .then(function(manifest) { addon.manifest = manifest })
            .catch(function(err) { console.error(err) })
        })

        return col
    }

})();
