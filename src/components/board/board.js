(function () {
    'use strict';

    angular
        .module('stremioApp')
        .controller('BoardController', BoardController)

    var aggregators = require('stremio-aggregators')
    var AddonClient = require('stremio-addon-client')

    var addonURLs = [
        'https://cinemeta.strem.io/stremioget/stremio/v1',
        'https://channels.strem.io/stremioget/stremio/v1',
        'https://nfxaddon.strem.io/stremioget/stremio/v1',
        'https://watchhub.strem.io/stremioget/stremio/v1',
    ]

    BoardController.$inject = ['$scope']

    function BoardController($scope) {
        // @TODO: this is supposed to use addonStore
        Promise.all(addonURLs.map(function(addonURL) {
            return AddonClient.detectFromURL(addonURL)
        }))
        .then(onAddonsReady)

        function onAddonsReady(resp) {
            var addons = resp.map(function(x) { return x.addon }).filter(function(x) { return x })
            var aggr = aggregators.Catalogs(addons)

            aggr.on('update', function() {
                // @TODO
            })

            aggr.on('finished', function() {
                $scope.results = aggr.results
                !$scope.$$phase && $scope.$digest()
            })
        }
    }
})();
