/**
 * Created by xinshu on 9/28/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $rootScope, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;
        var id = $routeParams["id"];

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user){
                        vm.success="Please Complete your information";
                    }else {
                        vm.error = "User not Found";
                    }
                });
            vm.visitor = false;
            vm.login = true;
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = "Unable to update profile";
                    });
        }

        function logout() {
            $rootScope.$broadcast('someEvent', {});
            $location.url("/login");
        }
    }

})();