module.exports = function() {

    var mongoose = require("mongoose");
    var PieceSchema = require("./piece.schema.server.js")();
    var Piece = mongoose.model("Piece", PieceSchema, Piece);

    var api = {
        createPiece: createPiece,
        findPiecesBySongId: findPiecesBySongId,
        findPieceByInstrumentType: findPieceByInstrumentType,
        updatePiece: updatePiece,
        deletePiece: deletePiece
    };
    return api;

    function createPiece(piece) {
        return Piece.create(piece);
    }

    function findPiecesBySongId(songId) {
        return Piece.find({songId: songId});
    }

    function findPieceByInstrumentType(songId, instrumentType) {
        return Piece.findOne({songId: songId, instrumentType: instrumentType});
    }

    function updatePiece(songId, instrumentType, arr) {
        return Piece.update(
            {songId: songId, instrumentType: instrumentType},
            {$set : {
                arr: arr,
            }}
        );
    }

    function deletePiece(songId, instrumentType) {
        return Piece.remove({songId: songId, instrumentType: instrumentType});
    }
};