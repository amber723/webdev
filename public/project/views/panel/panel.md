<!--<script>-->
    <!--$( function() {-->
        <!--$( "#slider-vertical" ).slider({-->
            <!--orientation: "vertical",-->
            <!--range: "min",-->
            <!--min: 0,-->
            <!--max: 100,-->
            <!--value: 60,-->
            <!--start: function(event, ui) {-->
                <!--event.stopPropagation();-->
                <!--$.audio = ngAudio.load('/sounds/piano_MP3/01-A.mp3');-->
            <!--}-->
        <!--});-->
        <!--$( "#sortable" ).sortable({-->
            <!--revert: true,-->
            <!--receive: function(event, ui){-->
                <!--console.log(ui);-->
                <!--$( "#slider-vertical" ).slider({-->
                    <!--orientation: "vertical",-->
                    <!--range: "min",-->
                    <!--min: 0,-->
                    <!--max: 100,-->
                    <!--value: 60,-->
                    <!--start: function(event, ui) {-->
                        <!--event.stopImmediatePropagation();-->
                        <!--console.log("eqweqweqwe");-->
                    <!--}-->
                <!--});-->
            <!--}-->
        <!--});-->
        <!--$( "#draggable" ).draggable({-->
            <!--connectToSortable: "#sortable",-->
            <!--helper: "clone",-->
            <!--revert: "invalid",-->

        <!--});-->
        <!--$( "ul, li" ).disableSelection();-->
        <!--$( "#draggable" ).resizable({-->
            <!--containment: "#container",-->
            <!--grid: 30,-->
            <!--maxHeight: 200,-->
            <!--maxWidth: 300,-->
            <!--minHeight: 200,-->
            <!--minWidth: 30-->
        <!--});-->
    <!--} );-->
<!--</script>-->

<!--<style>-->
    <!--ul { list-style-type: none; margin: 0px; padding: 0px;  }-->
    <!--#sortable{ list-style-type: none;padding: 10px; height: 220px; width: 100%;-->
        <!--background-color: #5cb85c; float: left}-->
    <!--#sortable li{ height: 200px;  width: 50px; float:left;}-->
    <!--#container { width: 310px; height: 220px; padding: 10px;margin: 10px;}-->
    <!--#draggable { background-position: top left;width: 50px; padding: 0px;margin: 0px;}-->


<!--</style>-->

<!--<div id="container" class="ui-widget-content">-->
    <!--<div >-->
        <!--<ul>-->
            <!--<li id="draggable" class="ui-state-highlight ui-state-active">-->
                <!--<div id="slider-vertical" class="ui-state-default "-->
                     <!--style="height:200px;margin: auto"-->
                     <!--ng-mousedown="playSound()"></div>-->
            <!--</li>-->
        <!--</ul>-->
    <!--</div>-->
<!--</div>-->


<!--<div class="col-sm-12" style="width:1210px;margin: 10px">-->
    <!--<ul id="sortable"></ul>-->
<!--</div>-->
<!--<div class="col-sm-6">-->
    <!--<a class="btn btn-outline-info btn-lg btn-block" href="#/studio">Save</a>-->
<!--</div>-->
