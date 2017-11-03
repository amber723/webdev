/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {

                WidgetService
                    .createWidget(vm.pageId, widgetType)
                    .then(function (response) {
                        var newWidget = response.data;
                        if(newWidget._id){
                            $location.url("/user/"+ vm.userId +"/website/"
                                + vm.websiteId +"/page/" + vm.pageId
                                + "/widget/" + newWidget._id);
                        }else{
                            vm.error = "Unable to create this page";
                        }
                    });


        }
    }
})();