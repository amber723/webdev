/**
 * Created by xinshu on 11/14/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("SearchSongController", SearchSongController);

    function SearchSongController($sce, $location, $routeParams, SongService) {
        var vm = this;
        vm.getSafeUrl = getSafeUrl;
        vm.searchSongs = searchSongs;

        function init() {
            SC.initialize({
                client_id: 'cUa40O3Jg3Emvp6Tv4U6ymYYO50NUGpJ'
            });
            var page_size = 10;
            SC.get('/tracks', {
                limit: page_size
            }).then(function(tracks) {
                vm.songs  = tracks;
            });
        }
        init();

        function getSafeUrl(url) {
            var safeUrl = "https://w.soundcloud.com/player/?url=" + url;
            return $sce.trustAsResourceUrl(safeUrl);
        }

        function searchSongs(songName) {
            var page_size = 10;
            SC.get('/tracks', {
                q: songName,
                limit: page_size
            }).then(function(tracks) {
                vm.songs  = tracks;
            });
        }


    }
})();