module.exports = function() {
    var mongoose = require("mongoose");

    var PieceSchema = mongoose.Schema({
        songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song',
            required: true},
        instrumentType: {type: String, required: true},
        arr: Array,
    }, {collection: "project.piece"});

    return PieceSchema;
};
