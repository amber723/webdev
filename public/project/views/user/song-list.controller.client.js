/**
 * Created by xinshu on 11/13/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("SongListController", SongListController);

    function SongListController($location, $routeParams, SongService) {
        var vm = this;
        vm.deleteSong = deleteSong;
        vm.user = [];
        vm.user._id = $routeParams.uid;
        function init() {
            SongService
                .findSongsByAuthor(vm.user._id)
                .then(function (response) {
                    vm.songs = response.data;
                });
        }
        init();

        function deleteSong(songId) {
            SongService
                .deleteSong(songId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.user._id +"/song/");
                    },
                    function (error) {
                        vm.error = "Failed to delete this song";
                    });
        }
    }
})();