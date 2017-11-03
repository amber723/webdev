/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

       var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                websiteId: websiteId,
                name: page.name,
                title: page.title
            };
            return $http.post("/api/website/"+websiteId+"/page", newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();