/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
        };
        return api;

        function sort(start, end, pageId) {
            var url = "/api/page/"+pageId+"/widget?start="+start+"&end="+end;
            $http.put(url);
        }

        function createWidget(pageId, widgetType) {
            var newWidget = {
                pageId: pageId,
                type: widgetType,
            };
            return $http.post("/api/page/"+pageId+"/widget", newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
    }
})();