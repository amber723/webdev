/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage() {
            if(vm.page.name){
                PageService
                    .createPage(vm.websiteId, vm.page)
                    .then(function (response) {
                        var newPage = response.data;
                        if(newPage._id){
                            $location.url("/user/"+ vm.userId +"/website/"
                                + vm.websiteId +"/page");
                        }else{
                            vm.error = "Unable to create this page";
                        }
                    });
            }else{
                vm.error = "Page Name Required.";
            }
        }
    }

})();