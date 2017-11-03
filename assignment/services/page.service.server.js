/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        pageModel
            .createPage(newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.send(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.send(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(pageId, newPage)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

};