/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myapp.factory('LoginUser', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
	 {
//             alert(CORE_CONFIG.WEB_SERVICE+WEB_API.GETDATA);
	  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GetLoginData+'/:id', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);