/**
 * Created by xinshu on 11/25/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element.sortable({
                axis: "y",
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }

        return{
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }

    }

    function sortableController( $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.sort = sort;

        function sort(start, end) {
            WidgetService.sort(start, end, vm.pageId);
        }
    }
})();