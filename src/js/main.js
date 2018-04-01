// needed for older browsers
require('babel-polyfill');

// Important sanitization
toastr.options.escapeHtml = true

// Define the main angular module
var app = angular.module('stremioApp', ['ui.router'])

// Constants
app.run(['$rootScope', '$state', function ($rootScope, $state) {

}])
