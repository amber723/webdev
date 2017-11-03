/**
 * Created by xinshu on 10/28/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        addPriorityToWidget: addPriorityToWidget
    };
    return api;

    function createWidget(widget) {
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({pageId: pageId}).sort({ priority: 1 });
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        switch(widget.type) {
            case "HEADER":
                return Widget.update(
                    {_id: widgetId},
                    {$set : {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size,
                    }}
                );
                break;
            case "IMAGE":
                return Widget.update(
                    {_id: widgetId},
                    {$set : {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }}
                );
                break;
            case "YOUTUBE":
                return Widget.update(
                    {_id: widgetId},
                    {$set : {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                    }}
                );
                break;
            case "HTML":
                return Widget.update(
                    {_id: widgetId},
                    {$set : {
                        name: widget.name,
                        text: widget.text,
                    }}
                );
                break;
            case "TEXT":
                return Widget.update(
                    {_id: widgetId},
                    {$set : {
                        name: widget.name,
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    }}
                );
                break;
            default:
                break;
        }
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }


    function reorderWidget(widget1, widget2) {
        return Widget.update(
            {_id: widget1._id},
            {$set :
            {
                priority: widget2.priority + 1,
            }
            }
        );
    }

    function addPriorityToWidget(widget, i) {
        return Widget.update(
            {_id: widget._id},
            {$set :
            {
                priority: i,
            }
            }
        );
    }
};