/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage() {
            if(vm.page.name){
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(
                        function (response) {
                            $location.url("/user/"+ vm.userId +"/website/"
                                + vm.websiteId +"/page");
                        },
                        function (error) {
                            vm.error = "Unable to update this page";
                        });
            }else{
                vm.error = "Page Name Required.";
            }

        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"
                            + vm.websiteId +"/page");
                    },
                    function (error) {
                        vm.error = "Failed to delete this page";
                    }
                );
        }
    }
})();