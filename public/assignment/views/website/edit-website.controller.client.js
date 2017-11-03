/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.updateWebsite =updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
        init();

        function updateWebsite() {
            if(vm.website.name){
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(
                        function (response) {
                            $location.url("/user/"+ vm.userId +"/website");
                        },
                        function (error) {
                            vm.error = "Unable to update this website";
                        });
            }else{
                vm.error = "Website Name required.";
            }
        }
        
        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/website");
                    },
                    function (error) {
                        vm.error = "Failed to delete this website";
                    });
        }
    }
})();