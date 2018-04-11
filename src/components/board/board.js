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

    BoardController.$inject = ['$scope', 'stremio']

    function BoardController($scope, stremio) {

        var aggr = aggregators.Catalogs(stremio.addons)
        var t = null

        aggr.run()

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

            $scope.results = mapResults(aggr.results)
            !$scope.$$phase && $scope.$digest()
        }

        // TEMP
        // @TODO: abstract this away in models
        $scope.posterUrl = function(item) {
            if (! item) return

            return item.imdb_id ?
                METAHUB_BASE_URL + 'poster/medium/'+item.imdb_id+'/img'
                : item.poster
        }

        // UTILS
        // TEMP
        // @TODO: abstract this away in models
        function mapResults(results)
        {
            results.forEach(function(x) {
                if (x.response && Array.isArray(x.response.metas))
                    x.response.metas = x.response.metas.map(mapMeta)
            })
            return results
        }

        function mapMeta(meta) {
            // @TODO: figure this out 
            meta.id = meta.id || meta.imdb_id || meta.yt_id || meta._id || Math.floor(200000*Math.random())
            return meta
        }
    }
})();
