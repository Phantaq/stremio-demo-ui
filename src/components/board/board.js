(function () {
    'use strict';

    angular
        .module('stremioApp')
        .controller('BoardController', BoardController)

    var aggregators = require('stremio-aggregators')
    var AddonClient = require('stremio-addon-client')

    // in ms
    var DEBOUNCE_TIME = 200

    var METAHUB_BASE_URL = 'https://images.metahub.space/'

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
        .then(function(resp) {
            var addons = resp
                .map(function(x) { return x.addon })
                .filter(function(x) { return x })

            onAddonsReady(addons)
        })
        // @TODO end TODO

        function onAddonsReady(addons) {
            var aggr = aggregators.Catalogs(addons)
            var t = null

            $scope.$on('$destroy', function() {
                clearTimeout(t)
            })

            aggr.on('updated', function() {
                clearTimeout(t)
                t = setTimeout(refreshWithResults, DEBOUNCE_TIME)
            })

            aggr.on('finished', refreshWithResults)

            function refreshWithResults() {
                clearTimeout(t)

                $scope.results = aggr.results
                !$scope.$$phase && $scope.$digest()
            }
        }

        // TEMP
        $scope.posterUrl = function(item) {
            if (! item) return
                
            return item.imdb_id ?
                METAHUB_BASE_URL + 'poster/medium/'+item.imdb_id+'/img'
                : item.poster
        }
    }
})();
