(function () {
    'use strict';

    angular
        .module('stremioApp')
        .controller('VideoController', VideoController)

    var aggregators = require('stremio-aggregators')
    var AddonClient = require('stremio-addon-client')

    // in ms
    var DEBOUNCE_TIME = 100

    VideoController.$inject = ['$scope', '$stateParams', 'stremio']

    function VideoController($scope, $stateParams, stremio) {
        var metaAggr = new aggregators.Metas(stremio.getAddons(), $stateParams.type, $stateParams.id)
        metaAggr.run()
        metaAggr.evs.on('viable', function(resp) {
            console.log(resp.meta)
        })

        var videoId = $stateParams.type == "series" ? $stateParams.id+":1:1" : $stateParams.id
        var aggr = new aggregators.Streams(stremio.getAddons(), $stateParams.type, videoId)
        aggr.run()

        var t = null

        $scope.$on('$destroy', function() {
            clearTimeout(t)
        })

        aggr.evs.on('updated', function() {
            clearTimeout(t)
            t = setTimeout(refreshWithResults, DEBOUNCE_TIME)
        })

        aggr.evs.on('finished', refreshWithResults)
        
        aggr.evs.on('err', function(err) {
            console.error(err)
        })

        function refreshWithResults() {
            clearTimeout(t)

            $scope.results = aggr.results
            !$scope.$$phase && $scope.$digest()
        }
    }
})();
