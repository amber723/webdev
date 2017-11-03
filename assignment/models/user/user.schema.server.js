module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        google:{
            id: String,
            token: String,
        },
        facebook: {
            id:    String,
            token: String
        },
        role:{type: String, default: "STUDENT", enum:['ADMIN', 'STUDENT', 'FACULTY']},
        websites:[{type: mongoose.Schema.Types.ObjectId, ref:'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;
};
