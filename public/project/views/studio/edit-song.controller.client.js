(function () {
    angular
        .module("projectApp")
        .controller("EditSongController", EditSongController);

    function EditSongController($routeParams, $location, SongService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.songId = $routeParams.sid;
        vm.updateSong = updateSong;
        vm.deleteSong = deleteSong;

        vm.keys = ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g'];
        function init() {
            SongService
                .findSongById(vm.songId)
                .then(function (response) {
                    vm.song = response.data;
                    console.log("song: "+vm.song.songName);
                });
        }
        init();

        function updateSong() {
            SongService
                .updateSong(vm.songId, vm.song)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/song/");
                    },
                    function (error) {
                        vm.error = "Unable to update this song";
                    });
        };

        function deleteSong() {
            SongService
                .deleteSong(vm.songId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/song");
                    },
                    function (error) {
                        vm.error = "Failed to delete this song";
                    });
        }

    }
})();