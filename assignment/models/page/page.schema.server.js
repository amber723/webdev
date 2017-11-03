/**
 * Created by xinshu on 10/28/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name : String,
        title : String,
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;
};