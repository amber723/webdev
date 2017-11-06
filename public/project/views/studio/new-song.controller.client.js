/**
 * Created by xinshu on 11/12/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("NewSongController", NewSongController);

    function NewSongController($routeParams, $location, SongService, PieceService) {
        var vm = this;
        vm.createSong = createSong;
        vm.userId = $routeParams.uid;
        vm.songId = $routeParams.sid;
        vm.keys = ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g'];
        vm.song = {
            mode: 'None',
            key: vm.keys[2],
            accidental: 'Natural',
            tempo: 80,
        };

        function createSong() {
            if(vm.song.songName){
                SongService
                    .createSong(vm.userId, vm.song)
                    .then(function (response) {
                        var newSong = response.data;
                        if(newSong._id){
                            $location.url("/user/"+ vm.userId +"/song/"+ newSong._id);
                        }else{
                            vm.error = "Failed to Create new Song";
                        }
                    });
            }else{
                vm.error = "Song Name Required!";
            }

        };

    }

})();





