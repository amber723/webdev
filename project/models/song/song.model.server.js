module.exports = function() {

    var mongoose = require("mongoose");
    var SongSchema = require("./song.schema.server")();
    var Song = mongoose.model("Song", SongSchema);

    var api = {
        createSong: createSong,
        findSongsByAuthor: findSongsByAuthor,
        findSongById: findSongById,
        updateSong: updateSong,
        deleteSong: deleteSong,
    };
    return api;

    function createSong(song) {
        return Song.create(song);
    }

    function findSongsByAuthor(userId) {
        return Song.find({author: userId});
    }

    function findSongById(songId) {
        return Song.findById(songId);
    }

    function updateSong(songId, newSong) {
        return Song.update(
            {_id: songId},
            {$set : {
                songName: newSong.songName,
                mode: newSong.mode,
                key: newSong.key,
                accidental: newSong.accidental,
                tempo: newSong.tempo,
            }}
        );
    }

    function deleteSong(songId) {
        return Song.remove({_id: songId});
    }
};