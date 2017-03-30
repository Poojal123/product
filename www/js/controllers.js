//angular.module('starter', [])

myapp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

 
})

myapp.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

myapp.controller('PlaylistCtrl', function($scope, $stateParams) {
})

myapp.controller('loginCtrl', function($scope, $stateParams,$state,LoginUser) {
      // Perform the login action when the user submits the login form
  $scope.loginData = {};

//    alert("hhvjhv");
     $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
        if($scope.loginData.username == "admin" && $scope.loginData.password =="admin"){
            
            $scope.loginDetails =  LoginUser.get({"usernae":$scope.loginData.username,"password":$scope.loginData.password});
            $scope.loginDetails.$promise.then(function(result) {
        //
//                $scope.url = result.result;
//                $scope.ImageUrls =result.result;
//                alert("dfgdg " +$scope.ImageUrls.length);
            });
//            alert
            $state.go("app.playlists");
        }

    
  };
});
