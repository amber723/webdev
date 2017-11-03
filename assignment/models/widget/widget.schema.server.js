/**
 * Created by xinshu on 10/28/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        type: String,
        name : {type : String, default: "MyWidget"},
        text : {type : String, default: "MyWidget"},
        placeholder: {type : String, default: "MyWidget"},
        description: {type : String, default: "MyWidget"},
        url: String,
        width: {type : String, default: "100%"},
        height:String,
        rows: Number,
        size: {type : Number, default: 3},
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated : {type : Date, default: Date.now},
        priority: { type: Number, default: Date.now }
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};