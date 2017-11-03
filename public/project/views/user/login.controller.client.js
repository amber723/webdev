/**
 * Created by xinshu on 9/27/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = function (email, password) {
            UserService.findUserByCredentials(email, password)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user._id){
                        $rootScope.$broadcast('someEvent', vm.user);
                        $location.url("/profile/" + vm.user._id);
                    }else{
                        vm.error = "User not found";
                    }
                });
        }
    }
})();