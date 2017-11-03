/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var songModel = models.songModel;

    app.post("/project/user/:userId/song", createSong);
    app.get("/project/user/:userId/song", findSongsByAuthor);
    app.get("/project/song/:songId", findSongById);
    app.put("/project/song/:songId", updateSong);
    app.delete("/project/song/:songId", deleteSong);

    function createSong(req, res) {
        var newSong = req.body;
        songModel
            .createSong(newSong)
            .then(
                function (song) {
                    res.json(song);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findSongsByAuthor(req, res) {
        var userId = req.params.userId;
        songModel
            .findSongsByAuthor(userId)
            .then(
                function (songs) {
                    res.send(songs);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findSongById(req, res) {
        var songId = req.params.songId;
        songModel
            .findSongById(songId)
            .then(
                function (song) {
                    res.send(song);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateSong(req, res) {
        var songId = req.params.songId;
        var newSong = req.body;
        songModel
            .updateSong(songId, newSong)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteSong(req, res) {
        var songId = req.params.songId;
        songModel
            .deleteSong(songId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

};