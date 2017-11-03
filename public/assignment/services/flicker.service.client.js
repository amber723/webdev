/**
 * Created by xinshu on 10/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "c05c62cd783eb87606f182fe40337410";
    var secret = "82bae44c6a50eb02";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        }
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();