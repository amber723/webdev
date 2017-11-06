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
                        $location.url("/user/" + vm.user._id + "/song/new");
                    }else{
                        vm.error = "User not found";
                    }
                });
        }
    }
})();