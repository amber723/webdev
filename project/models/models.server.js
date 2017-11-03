module.exports = function() {

    var mongoose = require('mongoose');
     mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost/shuxin2016fall');

    var models = {
        userModel: require("./user/user.model.server.js")(),
        songModel: require("./song/song.model.server.js")(),
        pieceModel: require("./piece/piece.model.server.js")(),
    };

    return models;
};