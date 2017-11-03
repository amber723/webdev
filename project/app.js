/**
 * Created by xinshu on 10/27/16.
 */
module.exports = function (app, models) {

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app, models);
    require("./services/song.service.server.js")(app, models);
    require("./services/piece.service.server.js")(app, models);
};