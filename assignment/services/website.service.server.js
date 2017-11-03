/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWeb = req.body;
        websiteModel
            .createWebsiteForUser(newWeb)
            .then(
                function (web) {
                    res.json(web);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (web) {
                    res.send(web);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWeb = req.body;
        websiteModel
            .updateWebsite(websiteId, newWeb)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
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