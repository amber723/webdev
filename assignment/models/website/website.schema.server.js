
module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name : String,
        description : String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'Page'}],
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};