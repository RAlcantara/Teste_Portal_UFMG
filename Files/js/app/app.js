var app = angular.module("PortalUFMG", ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination'])
app.config(function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider
	.when("/Login", {
		templateUrl:"Templates/Login.html",
		controller:"LoginCtrl",

	})
	.when("/Dashboard", {
		templateUrl:"Templates/Dashboard.html",
		controller:"PortalUFMGCtrl",

	});

	$routeProvider.otherwise({redirectTo:"/Login"});

});


