/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                     });
        }
        init();

        function updateWidget() {
            if(vm.widget.name){
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                        function (response) {
                            $location.url("/user/"+ vm.userId +"/website/"
                                + vm.websiteId +"/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = "Unable to update this widget";
                        }
                    );
            }else{
                vm.error = "Widget Name Required.";
            }

        }

        function deleteWidget(){
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"
                            + vm.websiteId +"/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.error = "Failed to delete this widget";
                    }
                );
        }
    }
})();