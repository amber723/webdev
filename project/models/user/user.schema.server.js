module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        email: {type: String, unique : true, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        role:{type: String, default: "USER", enum:['ADMIN', 'USER']},
    }, {collection: "project.user"});

    return UserSchema;
};
