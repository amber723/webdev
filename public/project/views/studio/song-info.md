<div ng-controller="NewSongController as model" class="modal-demo"
style="margin-top: 40px; margin-left: 20px">
    <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">Song Info</h3>
        </div>
        <div class="modal-body container" id="modal-body" style="width: 598px">
            <div ng-show="model.error" class="alert alert-danger">
                {{model.error}}
            </div>
            <h5>Name</h5>
            <input ng-model="model.song.songName" type="text" required
                   class="form-control" style="width: 80%; margin: 0; margin-bottom: 10px"
                   placeholder="song name"/>

            <h5>Tonality</h5>
            <div class="btn-group" style="margin-right: 15px">
                <label class="btn btn-outline-success"
                       ng-model="model.song.mode"
                       uib-btn-radio="'Major'">Major Keys</label>
                <label class="btn btn-outline-success"
                       ng-model="model.song.mode"
                       uib-btn-radio="'None'">None</label>
                <label class="btn btn-outline-success"
                       ng-model="model.song.mode"
                       uib-btn-radio="'Minor'">Minor Keys</label>
            </div>

            <div class="btn-group" uib-dropdown >
                <button id="split-button" type="button"
                        class="btn btn-outline-warning">{{model.song.key}} Key</button>
                <button type="button" class="btn btn-outline-warning" uib-dropdown-toggle>
                </button>
                <ul class="dropdown-menu" uib-dropdown-menu role="menu"
                    aria-labelledby="split-button" >
                    <li ng-repeat="key in model.keys">
                        <a href="#" ng-click="$event.preventDefault(); model.song.key = key">{{ key }}</a>
                    </li>
                    <li class="divider"></li>
                    <li role="menuitem">
                        <a href="#" ng-click="$event.preventDefault(); model.song.key = 'None'">None</a>
                    </li>
                </ul>
            </div>

            <h5>Pitch</h5>
            <div class="btn-group">
                <label class="btn btn-outline-info"
                       ng-model="model.song.accidental"
                       uib-btn-radio="'Sharp'">Sharp #</label>
                <label class="btn btn-outline-info"
                       ng-model="model.song.accidental"
                       uib-btn-radio="'Natural'">Natural  Notes</label>
                <label class="btn btn-outline-info"
                       ng-model="model.song.accidental"
                       uib-btn-radio="'Flat'">Flat b</label>
            </div>

            <div class="sliderdemoBasicUsage">
                <md-content style="padding-top: 18px;">
                    <div layout="">
                        <div flex="10" layout="" layout-align="center center">
                            <span class="md-body-1">Tempo</span>
                        </div>
                        <md-slider flex="" md-discrete="" ng-model="model.song.tempo"
                                   step="1" min="40" max="200" aria-label="tempo">
                        </md-slider>
                    </div>
                </md-content>
            </div>


        </div>
        {{model.song}}

        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="model.ok()">Save</button>
            <button class="btn btn-warning" type="button" ng-click="model.cancel()">Cancel</button>
        </div>
    </script>

    <button type="button" class="btn btn-outline-info" ng-click="model.open()">New Song</button>
    <button type="button" class="btn btn-outline-success" >Save</button>
    <button type="button" class="btn btn-outline-danger" >
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
    </button>
</div>

