/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        // var id = $routeParams["uid"];
        function init() {
            UserService
                // .findUserById(id)
                .findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user){
                        console.log(vm.user._id);
                        vm.success="Please Complete your information";
                    }else {
                        vm.error = "User not Found";
                    }
                });
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

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = "Unable to delete user";
                    });
        }

        function  logout() {
            UserService.logout()
                .success(function () {
                    // $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }
    }
})();