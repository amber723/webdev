/* Created by xinshu on 10/12/16. */
(function () {
    angular
        .module("projectApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(verifyPassword) {
            if(vm.user.password === verifyPassword){
                UserService
                    .findUserByEmail(vm.user.email)
                    .then(function (response) {
                        var verifyEmail = response.data;
                        if(verifyEmail._id){
                            vm.error = "Email is already in use";
                        }else{
                            UserService
                                .createUser(vm.user)
                                .then(function (response) {
                                    var newUser = response.data;
                                    if(newUser){
                                        $rootScope.$broadcast('someEvent', newUser);
                                        $location.url("/profile/"+ newUser._id);
                                    }else{
                                        vm.error = "Failed to Register";
                                    }
                                });
                        }
                    });
            }else{
                vm.error = "Please identify your password";
            }
        }
    }
})();
