/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myapp.constant('CORE_CONFIG', 
	{
//		HTTP_PROTOCOL: 'http://',
		SERVER_IP: WEB_URL,
		WEB_SERVICE: WEB_URL+'index.php/api'		
	}
);
myapp.constant('WEB_API', 
	{
		// ALL WEB SERVICES
		GetLoginData: '/ProductLogin/UserLoginDetails',
		GetRegisterData: '/ProductLogin/UserRegisterDetails',
		GetProductDetals: '/ProductLogin/ProductDetails',
		SaveProductDetals: '/ProductLogin/SaveProductDetails',
		GetCoupons: '/ProductLogin/GetCoupons',
		
        }
        );