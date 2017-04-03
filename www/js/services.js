/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myapp.factory('LoginUser',  function($http,CORE_CONFIG,WEB_API){
	return{
    request: function(message){
        return $http({ url:CORE_CONFIG.WEB_SERVICE+WEB_API.GetLoginData ,method:"POST",data:message});
    }
  } 
});
myapp.factory('RegisterUser', function($http,CORE_CONFIG,WEB_API){
  return{
    request: function(message){
        return $http({ url:CORE_CONFIG.WEB_SERVICE+WEB_API.GetRegisterData ,method:"POST",data:message});
    }
  }
});
myapp.factory('ProductDetals', function($http,CORE_CONFIG,WEB_API){
  return{
    request: function(message){
        return $http({ url:CORE_CONFIG.WEB_SERVICE+WEB_API.GetProductDetals ,method:"POST",data:message});
    }
  }
});
myapp.factory('SaveProductDetals', function($http,CORE_CONFIG,WEB_API){
  return{
    request: function(message){
        return $http({ url:CORE_CONFIG.WEB_SERVICE+WEB_API.SaveProductDetals ,method:"POST",data:message});
    }
  }
});
myapp.factory('GetCoupons', function($http,CORE_CONFIG,WEB_API){
  return{
    request: function(message){
        return $http({ url:CORE_CONFIG.WEB_SERVICE+WEB_API.GetCoupons ,method:"POST",data:message});
    }
  }
});


         myapp.factory('product', function() {
            var factory = {};
            
            factory.multiply = function(a, b) {
               return a * b
            }
            return factory;
         });
         
         myapp.service('productaddedit', function(MathService){
            this.square = function(a) {
               return MathService.multiply(a,a);
            }
         });
