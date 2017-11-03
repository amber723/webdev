module.exports = function() {

    var mongoose = require('mongoose');
     mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost/shuxincs5610');

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")(),
    };

    return models;
};