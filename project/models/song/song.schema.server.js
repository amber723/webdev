module.exports = function() {
    var mongoose = require("mongoose");

    var SongSchema = mongoose.Schema({
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true},
        songName: {type: String, required: true},
        mode: String,
        key: String,
        accidental: String,
        tempo: Number,
        url: String,
        createdDate: {type: Date, default: Date.now}
    }, {collection: "project.song"});

    return SongSchema;
};
