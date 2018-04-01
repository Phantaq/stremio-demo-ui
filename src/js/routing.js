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

}]);
