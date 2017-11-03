/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
        init();

        function createWebsite() {
            if(vm.website.name){
                WebsiteService
                    .createWebsite(vm.userId, vm.website)
                    .then(function (response) {
                        var newWeb = response.data;
                        if(newWeb._id){
                            $location.url("/user/"+ vm.userId +"/website");
                        }else{
                            vm.error = "Unable to create this website";
                        }

                    });
            }else{
                vm.error = "Website Name required.";
            }

        }
    }
})();