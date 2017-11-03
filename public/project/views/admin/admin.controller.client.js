/**
 * Created by xinshu on 12/7/16.
 */
/**
 * Created by xinshu on 9/28/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("AdminController", AdminController);

    function AdminController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var id = $routeParams["uid"];

        function init() {
            UserService
                .findUsers()
                .then(function (response) {
                    vm.users = response.data;
                    if(vm.users){
                    }else {
                        vm.error = "Users not Found";
                    }
                });
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user){

                    }else {
                        vm.error = "User not Found";
                    }
                });
        }
        init();

        function updateUser() {
            console.log(vm.user);
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

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        vm.success = "User successfully deleted";
                        $location.url("/admin/" + id);
                    },
                    function (error) {
                        vm.error = "Unable to delete user";
                    });
        }
    }

})();