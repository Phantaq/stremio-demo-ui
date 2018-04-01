angular.module('stremioApp')
.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/').when('/', '/board');

    $stateProvider.state({
        name: 'board',
        url: '/board',
        views: {
            main: {templateUrl: 'boardTpl'},
        }
    })

    $stateProvider.state({
        name: 'video',
        url: '/video/:type/:id',
        params: {
            type: null,
            id: null,
        },
        views: {
            main: {templateUrl: 'videoTpl'},
        }
    })
}]);
