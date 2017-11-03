/**
 * Created by xinshu on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function (username, password) {
            console.log(password);
            // UserService.findUserByCredentials(username, password)
            UserService.login(username, password)
                .then(function (response) {
                    var user = response.data;
                    if(user._id){
                        var uid = user._id;
                        // $rootScope.currentUser = user;
                        $location.url("/user/" + uid);
                    }else{
                        vm.error = "User not found";
                    }
                });
        }
    }

})();