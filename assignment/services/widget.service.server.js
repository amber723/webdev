/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/page/:pageId/widget", createWidget);
    app.get ("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get ("/api/widget/:widgetId", findWidgetById);
    app.put ("/api/widget/:widgetId", updateWidget);
    app.delete ("/api/widget/:widgetId", deleteWidget);

    app.put("/api/page/:pageId/widget", sortWidgets);

    var widgetsInService = [];
    
    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        widgetsInService.splice(end, 0, widgetsInService.splice(start, 1)[0]);
        for(var i = 0; i < widgetsInService.length; i++){
            widgetModel
                .addPriorityToWidget(widgetsInService[i], i)
                .then(
                    function (stats) {
                        res.send(200);
                    },
                    function (error) {
                        res.statusCode(404).send(error);
                    }
                )

        }
    }

    function uploadImage(req, res) {
        var uid      = req.body.uid;
        var wid      = req.body.wid;
        var pid      = req.body.pid;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i].url = "/uploads/" + filename;
                break;
            }
        }
        res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+ widgetId);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        widgetModel
            .createWidget(newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    widgetsInService = widgets;
                    res.send(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
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