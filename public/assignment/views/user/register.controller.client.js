/* Created by xinshu on 10/12/16. */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(verifyPassword) {
            console.log(vm.user);
            if(vm.user.password === verifyPassword){
                UserService
                    .register(vm.user)
                    .then(
                        function (response) {
                            var newUser = response.data;
                            if(newUser){
                                $location.url("/user/"+ newUser._id);
                            }
                        },
                        function (err) {
                            vm.error = err;
                        });
            }else{
                vm.error = "Please identify your password";
            }

            // if(vm.user.password === verifyPassword){
            //     UserService
            //         .findUserByUsername(vm.user.username)
            //         .then(function (response) {
            //             var verifyUsername = response.data;
            //             if(verifyUsername._id){
            //                 vm.error = "Username is already in use";
            //             }else{
            //                 UserService
            //                     .createUser(vm.user)
            //                     .then(function (response) {
            //                         var newUser = response.data;
            //                         if(newUser){
            //                             $location.url("/user/"+ newUser._id);
            //                         }else{
            //                             vm.error = "Failed to Register";
            //                         }
            //                     });
            //             }
            //         });
            //
            // }else{
            //     vm.error = "Please identify your password";
            // }
        }
    }
})();
