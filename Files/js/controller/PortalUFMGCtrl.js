angular.module("PortalUFMG")
.controller("PortalUFMGCtrl", 
	function($scope, $http, $httpParamSerializer, $cookies) {
	   
		function init() {

			$scope.listNotices();
			$scope.recoverUser(); 
			$scope.noticia = {
				type:"2"
			};
		}

		 $scope.Logout = function() {
		 	$cookies.remove("access_token");
            window.location.href="#!/Login";
		 }


	 	// Obter dados do usuário autenticado
		$scope.recoverUser = function() {
			$http.get('http://150.164.180.61:9999/account')
			.then(function(response){
				$scope.name = response.data.name;
				$scope.email = response.data.email;
			});
		}


		//Listar notícias
		$scope.listNotices = function() {

			$http.get('http://150.164.180.61:9999/news?page=1&page_size='+$scope.itemsPerPage+'')
			.then(function(response){
				$scope.noticias = response.data.items;
			});
		}
		
		// Salvar nova notícia
		$scope.salvarNoticia = function(noticia) {

			console.log(noticia);

		    var noticiaSalvar = {
		        method: 'POST',
		        url: "http://150.164.180.61:9999/news",
		        headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
		        data: $httpParamSerializer(noticia)
		    }
		    $http(noticiaSalvar).then(
		       function(data) { 		
		            $('.modal-overlay').trigger('click');       
		            M.toast({html: 'Notícia salva com sucesso.'});
					setTimeout(function(){ M.Toast.dismissAll(); }, 2000);
					$scope.listNotices();
		        },function(error) {
					  M.toast({html: 'Erro ao salvar notícia.'});
					  setTimeout(function(){ M.Toast.dismissAll(); }, 2000);					  
		        });   		 		
		}

		init();
});