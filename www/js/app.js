// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myapp = angular.module('product', ['ionic','ngResource','ngCordova']);

myapp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
myapp.config(['$httpProvider', function ($httpProvider) {    
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);

myapp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:'loginCtrl'
     
     
    })
  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller:'loginCtrl'
     
     
    })
    .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/Products.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.viewProduct', {
    url: '/viewProduct?id&name&image&price',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewProduct.html',
        controller: 'viewProductCtrl'
      }
    }
  });
//  .state('app.viewProduct', {
//    url: '/viewProduct',
//    views: {
//      'menuContent': {
//        templateUrl: 'templates/viewProduct.html',
//        controller: 'viewProductCtrl'
//      }
//    }
//  });
  // if none of the above states are matched, use this as the fallback
  if(localStorage.getItem("userid")!= null){
      $urlRouterProvider.otherwise('/app/products');
  }else
  $urlRouterProvider.otherwise('/login');
});
