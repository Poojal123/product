//angular.module('starter', [])

myapp.controller('AppCtrl', function ($scope, $state, $ionicModal, $cordovaCamera, CORE_CONFIG, WEB_API, SaveProductDetals, $timeout) {

    $ionicModal.fromTemplateUrl('templates/addProduct.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.addProduct = function () {
        $scope.modal.show();
    };
    $scope.logout = function () {
        localStorage.removeItem("userid")
        localStorage.removeItem("username")
        localStorage.removeItem("isAdmin")
        $state.go("login", {}, {reload: true})
    }
    $scope.closeProduct = function () {
        $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
    $scope.product = {};
    $scope.SelectImage = function () {
        document.addEventListener("deviceready", function () {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                allowEdit: true,
                mediaType: Camera.MediaType.PICTURE
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.product.selectedImage = imageData;
            }, function (err) {
                // error
            });

        }, false);
    }

    $scope.saveProduct = function () {

        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response.result);
            localStorage.setItem("productImg", r.response.result);
            console.log("Sent = " + r.bytesSent);
            $state.go("app.products", {}, {reload: true})
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var options = new FileUploadOptions();
        options.fileKey = "file";
        chunkedMode: false;
        options.fileName = $scope.product.selectedImage.substr($scope.product.selectedImage.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = {};
        params.pname = $scope.product.prodName;
        params.price = $scope.product.price;

        options.params = params;

        var ft = new FileTransfer();
        ft.upload($scope.product.selectedImage, encodeURI(CORE_CONFIG.WEB_SERVICE + WEB_API.SaveProductDetals), win, fail, options);
    }

})

myapp.controller('PlaylistsCtrl', function ($scope, $state, $http, ProductDetals) {

//    $scope.isadmin = localStorage.getItem("isAdmin");
    var params = {"id": localStorage.getItem("userid")};
    ProductDetals.request(params).then(function (response) {
        // Response from server
        console.log(JSON.parse(JSON.stringify(response.data.result)));
        // console.log(JSON.stringify(response.data.result[0].id
        $scope.products = JSON.parse(JSON.stringify(response.data.result));
    });
    $scope.viewprod = function (id, name, image, price) {
//        alert("jdfsfj");
        $scope.id = id;
        $scope.name = name;
        $scope.image = image;
        $scope.price = price;
//        $("#btnhide").show();
        //  alert( $scope.price);
        $state.go("app.viewProduct", {'id': $scope.id, 'name': $scope.name, 'image': $scope.image, 'price': $scope.price});
    }
})

myapp.controller('viewProductCtrl', function ($scope, $timeout, GetCoupons, $state, ProductDetals, $stateParams, $http) {
//    alert($stateParams.id);
//    alert($stateParams.name);
//    alert($stateParams.image);
//    alert($stateParams.price);
    $("#btnhide").hide();
    $scope.view = {};
    $timeout(function () {
        $scope.view.id = $stateParams.id;
        $scope.view.name = $stateParams.name;
        $scope.view.image = $stateParams.image;
        $scope.view.price = $stateParams.price;
    });

    $scope.applyCoupen = function () {
        var param = {'pid': $scope.view.id}
                    $scope.hidec = false;

        GetCoupons.request(param).then(function (result) {
            if(result.data.result.length == 0){
                alert("sorry no coupens available");
                
            }else{
            
            $scope.view.price = $scope.view.price-result.data.result[0].Price_Reduction;
            $scope.hidec = true;
            alert(result.data.result[0].Price_Reduction);
        }
//            localStorage.setItem("userid", result.data.result[0].id)
//            localStorage.setItem("username", result.data.result[0].userName)
//            localStorage.setItem("isAdmin", result.data.result[0].isAdmin)
//            $state.go("app.products", {}, {reload: true});
        });

    }

})

myapp.controller('loginCtrl', function ($scope, $http, CORE_CONFIG, WEB_API, $stateParams, $state, LoginUser, RegisterUser) {
    // Perform the login action when the user submits the login form
    $scope.loginData = {};
    $scope.registerData = {};

    $scope.openregister = function () {
        $state.go("register");

    }
    $scope.register = function () {

        console.log($scope.registerData);
        var params = {"u": $scope.registerData.username, "p": $scope.registerData.password, "e": $scope.registerData.email};
        RegisterUser.request(params).then(function (response) {
            // Response from server
            localStorage.setItem("userid", response.data.result[0].id)
            localStorage.setItem("username", response.data.result[0].username)
            localStorage.setItem("isAdmin", response.data.result[0].isAdmin)
            $state.go("app.products");
        });

    }
//    alert("hhvjhv");
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        var param = {"u": $scope.loginData.username, "p": $scope.loginData.password};
        LoginUser.request(param).then(function (result) {
//            alert(result.data.result[0].id);
            localStorage.setItem("userid", result.data.result[0].id)
            localStorage.setItem("username", result.data.result[0].userName)
            localStorage.setItem("isAdmin", result.data.result[0].isAdmin)
            $state.go("app.products", {}, {reload: true});
        });




    };
});
