/**
 * Created by xinshu on 10/28/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
    };
    return api;

    function createPage(page) {
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({websiteId: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }
    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {$set :
                {
                    name: page.name,
                    title: page.title,
                }
            }
        );
    }
    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};