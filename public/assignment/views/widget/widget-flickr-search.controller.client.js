/**
 * Created by xinshu on 10/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService) {
        var vm = this;

        vm.searchPhotos = searchPhotos;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            /* todo */
            // WidgetService
            //     .updateWidget(websiteId, pageId, widgetId, {url: url})
            //     .then(function () {
            //
            //     });
        }

    }


})();