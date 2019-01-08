var app = angular.module('PortalUFMG');
app.controller('LoginCtrl', 
  function($scope, $http, $httpParamSerializer, $cookies) {
     

	$scope.loginData = {
	    grant_type:"password", 
	    client_id: "cms"
	};

	function obtainAccessToken(params) {

		var myResponse;

	    var req = {
	        method: 'POST',
	        url: "http://150.164.180.61:9999/authenticate",
	        headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
	        data: $httpParamSerializer(params)
	    }
	    $http(req).then(
	       function(data) {
	            $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
	            var expireDate = new Date (new Date().getTime() + (1000 * data.data.expires_in));
	            $cookies.put("access_token", data.data.access_token, {'expires': expireDate});
	            window.location.href="#!/Dashboard";
	        },function(error) {
				  M.toast({html: 'Usuário ou Senha incorreto.'});
				  setTimeout(function(){ M.Toast.dismissAll(); }, 2000);
				  
	        });   
	}

	$scope.login = function() {   
	    obtainAccessToken($scope.loginData);
	}
});