(function () {
    'use strict';

    angular
        .module('stremioApp')
        .controller('VideoController', VideoController)

    var aggregators = require('stremio-aggregators')
    var AddonClient = require('stremio-addon-client')

    // in ms
    var DEBOUNCE_TIME = 200

    VideoController.$inject = ['$scope', '$stateParams', 'stremio']

    function VideoController($scope, $stateParams, stremio) {
        var aggr = aggregators.Streams(stremio.addons, $stateParams.type, $stateParams.id)
        var t = null

        $scope.$on('$destroy', function() {
            clearTimeout(t)
        })

        aggr.evs.on('updated', function() {
            clearTimeout(t)
            t = setTimeout(refreshWithResults, DEBOUNCE_TIME)
        })

        aggr.evs.on('finished', refreshWithResults)

        function refreshWithResults() {
            clearTimeout(t)

            $scope.results = aggr.results
            !$scope.$$phase && $scope.$digest()
        }
    }
})();
