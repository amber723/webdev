/**
 * Created by xinshu on 11/15/16.
 */
module.exports = function (app, models) {

    var pieceModel = models.pieceModel;

    app.post("/project/song/:songId/piece", createPiece);
    app.get("/project/piece/:songId", findPiecesBySongId);
    app.get("/project/piece", findPieceByInstrumentType);
    app.put("/project/piece", updatePiece);
    app.delete("/project/piece", deletePiece);

    function createPiece(req, res) {
        var newPiece = req.body;
        pieceModel
            .createPiece(newPiece)
            .then(
                function (piece) {
                    res.json(piece);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findPiecesBySongId(req, res) {
        var songId = req.params.songId;
        pieceModel
            .findPiecesBySongId(songId)
            .then(
                function (pieces) {
                    res.json(pieces);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findPieceByInstrumentType(req, res) {
        var songId = req.query["songId"];
        var instrumentType = req.query["instrumentType"];

        pieceModel
            .findPieceByInstrumentType(songId, instrumentType)
            .then(
                function (piece) {
                    res.send(piece);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function updatePiece(req, res) {
        var songId = req.query["songId"];
        var instrumentType = req.query["instrumentType"];
        var arr = req.body;
        pieceModel
            .updatePiece(songId, instrumentType, arr)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deletePiece(req, res) {
        var songId = req.query["songId"];
        var instrumentType = req.query["instrumentType"];
        pieceModel
            .deletePiece(songId, instrumentType)
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