/**
 * Created by xinshu on 9/28/16.
 */
(function () {
    angular
        .module("projectApp")
        .factory("SongService", SongService);

    function SongService($http) {

        var api = {
            createSong: createSong,
            findSongById: findSongById,
            findSongsByAuthor: findSongsByAuthor,
            updateSong: updateSong,
            deleteSong: deleteSong,
            
            searchSongs: searchSongs,
            // uploadSong: uploadSong,
        };
        return api;
        
        function createSong(userId, song) {
            var newSong = {
                author: userId,
                songName: song.songName,
                mode: song.mode,
                key: song.key,
                accidental: song.accidental,
                tempo: song.tempo
            };
            return $http.post("/project/user/"+userId+"/song", newSong);
        }

        function findSongById(songId) {
            var url = "/project/song/" + songId;
            return $http.get(url);
        }

        function findSongsByAuthor(userId) {
            var url = "/project/user/"+ userId +"/song";
            return $http.get(url);
        }

        function updateSong(songId, song) {
            var url = "/project/song/" + songId;
            return $http.put(url, song);
        }
        function deleteSong(songId) {
            var url = "/project/song/" + songId;
            return $http.delete(url);
        }
        
        function searchSongs() {


        }
    }
})();