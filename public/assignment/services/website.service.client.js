/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var newWeb = {
                developerId: userId,
                name: website.name,
                description: website.description
            };
            return $http.post("/api/user/"+userId+"/website", newWeb);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+ websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();