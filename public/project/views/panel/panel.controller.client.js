/**
 * Created by xinshu on 11/15/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("panelController", panelController);

    function panelController(ngAudio, $interval, $routeParams,
                             $location, PieceService) {
        var vm = this;
        vm.getAudio = getAudio;
        vm.playAllnotes = playAllnotes;
        vm.playSong = playSong;
        vm.updatePiece = updatePiece;
        vm.userId = $routeParams.uid;
        vm.songId = $routeParams.sid;
        vm.instrumentType = $routeParams.instrumentType;

        vm.sliders =  [ 0, 0, 49, 52, 54, 0, 61, 0, 59, 57, 56, 57, 0, 0, 0, 0 ];

        function init() {
            PieceService
                .findPieceByInstrumentType(vm.songId, vm.instrumentType)
                .then(function (response) {
                    if(response.data._id){
                        vm.piece = response.data;
                        vm.sliders = vm.piece.arr;
                    }
                });
            PieceService
                .findPiecesBySongId(vm.songId)
                .then(function (response) {
                    vm.pieces = response.data;
                });

        }
        init();

        function playSong() {
            for (var i = 0; i < vm.pieces.length; i++) {
                playAllnotes(vm.pieces[i].arr);
            }
        }

        function getAudio(val) {
            return vm.notes[val].audio;
        }

        function playAllnotes(arr) {
            var i = 0;
            $interval(function () {
                if(vm.getAudio(arr[i]) !== null){
                    vm.getAudio(arr[i]).play();
                    i++;
                }
            }, 1000, arr.length, i);

        }

        function updatePiece() {
            PieceService
                .findPieceByInstrumentType( vm.songId, vm.instrumentType)
                .then(function (response) {
                    if(response.data._id){
                        PieceService
                            .updatePiece(vm.songId, vm.sliders, vm.instrumentType)
                            .then(
                                function (response) {
                                    $location.url("/user/"+ vm.userId +"/song/"+ vm.songId);
                                },
                                function (error) {
                                    vm.error = "Failed to Save the music piece";
                                });
                    }else{
                        PieceService
                            .createPiece(vm.songId, vm.sliders, vm.instrumentType)
                            .then(
                                function (response) {
                                var newPiece = response.data;
                                if(newPiece._id){
                                    $location.url("/user/"+ vm.userId +"/song/"+ vm.songId);
                                }else{
                                    vm.error = "Failed to Create the music piece";
                                }
                            });
                    }
                });
        }

        function deletePiece() {
            PieceService
                .deleteSong(vm.songId, vm.instrumentType)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId +"/song/"+ vm.songId);
                    },
                    function (error) {
                        vm.error = "Failed to delete this piece";
                    });
        }

        vm.notes =
            [
                { "_id": "0", audio: null},
                { "_id": "1", audio: ngAudio.load("/project/sounds/piano_MP3/01.mp3")},
                { "_id": "2", audio: ngAudio.load("/project/sounds/piano_MP3/02.mp3")},
                { "_id": "3", audio: ngAudio.load("/project/sounds/piano_MP3/03.mp3")},
                { "_id": "4", audio: ngAudio.load("/project/sounds/piano_MP3/04.mp3")},
                { "_id": "5", audio: ngAudio.load("/project/sounds/piano_MP3/05.mp3")},
                { "_id": "6", audio: ngAudio.load("/project/sounds/piano_MP3/06.mp3")},
                { "_id": "7", audio: ngAudio.load("/project/sounds/piano_MP3/07.mp3")},
                { "_id": "8", audio: ngAudio.load("/project/sounds/piano_MP3/08.mp3")},
                { "_id": "9", audio: ngAudio.load("/project/sounds/piano_MP3/09.mp3")},
                { "_id": "10", audio: ngAudio.load("/project/sounds/piano_MP3/10.mp3")},
                { "_id": "11", audio: ngAudio.load("/project/sounds/piano_MP3/11.mp3")},
                { "_id": "12", audio: ngAudio.load("/project/sounds/piano_MP3/12.mp3")},
                { "_id": "13", audio: ngAudio.load("/project/sounds/piano_MP3/13.mp3")},
                { "_id": "14", audio: ngAudio.load("/project/sounds/piano_MP3/14.mp3")},
                { "_id": "15", audio: ngAudio.load("/project/sounds/piano_MP3/15.mp3")},
                { "_id": "16", audio: ngAudio.load("/project/sounds/piano_MP3/16.mp3")},
                { "_id": "17", audio: ngAudio.load("/project/sounds/piano_MP3/17.mp3")},
                { "_id": "18", audio: ngAudio.load("/project/sounds/piano_MP3/18.mp3")},
                { "_id": "19", audio: ngAudio.load("/project/sounds/piano_MP3/19.mp3")},
                { "_id": "20", audio: ngAudio.load("/project/sounds/piano_MP3/20.mp3")},
                { "_id": "21", audio: ngAudio.load("/project/sounds/piano_MP3/21.mp3")},
                { "_id": "22", audio: ngAudio.load("/project/sounds/piano_MP3/22.mp3")},
                { "_id": "23", audio: ngAudio.load("/project/sounds/piano_MP3/23.mp3")},
                { "_id": "24", audio: ngAudio.load("/project/sounds/piano_MP3/24.mp3")},
                { "_id": "25", audio: ngAudio.load("/project/sounds/piano_MP3/25.mp3")},
                { "_id": "26", audio: ngAudio.load("/project/sounds/piano_MP3/26.mp3")},
                { "_id": "27", audio: ngAudio.load("/project/sounds/piano_MP3/27.mp3")},
                { "_id": "28", audio: ngAudio.load("/project/sounds/piano_MP3/28.mp3")},
                { "_id": "29", audio: ngAudio.load("/project/sounds/piano_MP3/29.mp3")},
                { "_id": "30", audio: ngAudio.load("/project/sounds/piano_MP3/30.mp3")},
                { "_id": "31", audio: ngAudio.load("/project/sounds/piano_MP3/31.mp3")},
                { "_id": "32", audio: ngAudio.load("/project/sounds/piano_MP3/32.mp3")},
                { "_id": "33", audio: ngAudio.load("/project/sounds/piano_MP3/33.mp3")},
                { "_id": "34", audio: ngAudio.load("/project/sounds/piano_MP3/34.mp3")},
                { "_id": "35", audio: ngAudio.load("/project/sounds/piano_MP3/35.mp3")},
                { "_id": "36", audio: ngAudio.load("/project/sounds/piano_MP3/36.mp3")},
                { "_id": "37", audio: ngAudio.load("/project/sounds/piano_MP3/37.mp3")},
                { "_id": "38", audio: ngAudio.load("/project/sounds/piano_MP3/38.mp3")},
                { "_id": "39", audio: ngAudio.load("/project/sounds/piano_MP3/39.mp3")},
                { "_id": "40", audio: ngAudio.load("/project/sounds/piano_MP3/40.mp3")},
                { "_id": "41", audio: ngAudio.load("/project/sounds/piano_MP3/41.mp3")},
                { "_id": "42", audio: ngAudio.load("/project/sounds/piano_MP3/42.mp3")},
                { "_id": "43", audio: ngAudio.load("/project/sounds/piano_MP3/43.mp3")},
                { "_id": "44", audio: ngAudio.load("/project/sounds/piano_MP3/44.mp3")},
                { "_id": "45", audio: ngAudio.load("/project/sounds/piano_MP3/45.mp3")},
                { "_id": "46", audio: ngAudio.load("/project/sounds/piano_MP3/46.mp3")},
                { "_id": "47", audio: ngAudio.load("/project/sounds/piano_MP3/47.mp3")},
                { "_id": "48", audio: ngAudio.load("/project/sounds/piano_MP3/48.mp3")},
                { "_id": "49", audio: ngAudio.load("/project/sounds/piano_MP3/49.mp3")},
                { "_id": "50", audio: ngAudio.load("/project/sounds/piano_MP3/50.mp3")},
                { "_id": "51", audio: ngAudio.load("/project/sounds/piano_MP3/51.mp3")},
                { "_id": "52", audio: ngAudio.load("/project/sounds/piano_MP3/52.mp3")},
                { "_id": "53", audio: ngAudio.load("/project/sounds/piano_MP3/53.mp3")},
                { "_id": "54", audio: ngAudio.load("/project/sounds/piano_MP3/54.mp3")},
                { "_id": "55", audio: ngAudio.load("/project/sounds/piano_MP3/55.mp3")},
                { "_id": "56", audio: ngAudio.load("/project/sounds/piano_MP3/56.mp3")},
                { "_id": "57", audio: ngAudio.load("/project/sounds/piano_MP3/57.mp3")},
                { "_id": "58", audio: ngAudio.load("/project/sounds/piano_MP3/58.mp3")},
                { "_id": "59", audio: ngAudio.load("/project/sounds/piano_MP3/59.mp3")},
                { "_id": "60", audio: ngAudio.load("/project/sounds/piano_MP3/60.mp3")},
                { "_id": "61", audio: ngAudio.load("/project/sounds/piano_MP3/61.mp3")},
                { "_id": "62", audio: ngAudio.load("/project/sounds/piano_MP3/62.mp3")},
                { "_id": "63", audio: ngAudio.load("/project/sounds/piano_MP3/63.mp3")},
                { "_id": "64", audio: ngAudio.load("/project/sounds/piano_MP3/64.mp3")},
                { "_id": "65", audio: ngAudio.load("/project/sounds/piano_MP3/65.mp3")},
                { "_id": "66", audio: ngAudio.load("/project/sounds/piano_MP3/66.mp3")},
                { "_id": "67", audio: ngAudio.load("/project/sounds/piano_MP3/67.mp3")},
                { "_id": "68", audio: ngAudio.load("/project/sounds/piano_MP3/68.mp3")},
                { "_id": "69", audio: ngAudio.load("/project/sounds/piano_MP3/69.mp3")},
                { "_id": "70", audio: ngAudio.load("/project/sounds/piano_MP3/70.mp3")},
                { "_id": "71", audio: ngAudio.load("/project/sounds/piano_MP3/71.mp3")},
                { "_id": "72", audio: ngAudio.load("/project/sounds/piano_MP3/72.mp3")},
                { "_id": "73", audio: ngAudio.load("/project/sounds/piano_MP3/73.mp3")},
                { "_id": "74", audio: ngAudio.load("/project/sounds/piano_MP3/74.mp3")},
                { "_id": "75", audio: ngAudio.load("/project/sounds/piano_MP3/75.mp3")},
                { "_id": "76", audio: ngAudio.load("/project/sounds/piano_MP3/76.mp3")},
                { "_id": "77", audio: ngAudio.load("/project/sounds/piano_MP3/77.mp3")},
                { "_id": "78", audio: ngAudio.load("/project/sounds/piano_MP3/78.mp3")},
                { "_id": "79", audio: ngAudio.load("/project/sounds/piano_MP3/79.mp3")},
                { "_id": "80", audio: ngAudio.load("/project/sounds/piano_MP3/80.mp3")},
                { "_id": "81", audio: ngAudio.load("/project/sounds/piano_MP3/81.mp3")},
                { "_id": "82", audio: ngAudio.load("/project/sounds/piano_MP3/82.mp3")},
                { "_id": "83", audio: ngAudio.load("/project/sounds/piano_MP3/83.mp3")},
                { "_id": "84", audio: ngAudio.load("/project/sounds/piano_MP3/84.mp3")},
                { "_id": "85", audio: ngAudio.load("/project/sounds/piano_MP3/85.mp3")},
                { "_id": "86", audio: ngAudio.load("/project/sounds/piano_MP3/86.mp3")},
                { "_id": "87", audio: ngAudio.load("/project/sounds/piano_MP3/87.mp3")},
                { "_id": "88", audio: ngAudio.load("/project/sounds/piano_MP3/88.mp3")},
            ];

    }
})();