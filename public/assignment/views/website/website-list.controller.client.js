/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }
})();