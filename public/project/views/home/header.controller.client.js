/**
 * Created by xinshu on 10/3/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller('HeaderController', HeaderController);

    function HeaderController($routeParams, $location, UserService, $scope) {
        var vm = this;
        var uid = $routeParams["uid"];
        vm.alerts = [];
        vm.visitor = true;

        $scope.$on('someEvent', function(event, user) {
            if(user._id){
                vm.visitor = false;
                vm.user = user;
            }else{
                vm.visitor = true;
                vm.user = {};
            }
            });

        vm.login = function (email, password) {
            UserService.findUserByCredentials(email, password)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user._id){
                        vm.visitor = false;
                        $location.url("/profile/" + vm.user._id);
                    }else{
                        vm.error = "User not found";
                        vm.addAlert();
                    }
                });
        }

        vm.logout = function () {
            vm.user = {};
            vm.visitor = true;
        }

        vm.addAlert = function () {
            vm.alerts = [];
            vm.alerts.push({msg: 'Invalid Email or Password!' });
        };
        vm.closeAlert = function(){
            vm.alerts = [];
        };
    }
})();