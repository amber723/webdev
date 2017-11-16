/**
 * Created by xinshu on 12/2/16.
 */
(function () {
    angular
        .module("projectApp")
        .controller("drumController", drumController);

    function drumController($location, $routeParams, PieceService) {
        var vm = this;
        vm.play = play;
        vm.drumPadAction = drumPadAction;
        vm.getAudio = getAudio;
        vm.updatePiece = updatePiece;

        vm.userId = $routeParams.uid;
        vm.songId = $routeParams.sid;
        vm.instrumentType = "drum";
        vm.playButton = "Play";

        var isPlaying = false;
        vm.tempo = 40.0;
        var audioContext = new AudioContext();
        var currentBeat = 1;
        var futureTickTime = audioContext.currentTime;
        var timerID = 0;

        vm.kick = audioFileLoader("/project/sounds/drum/KickDrum.mp3");
        vm.snare = audioFileLoader("/project/sounds/drum/snare1.mp3");
        vm.hihat = audioFileLoader("/project/sounds/drum/hihat1.mp3");
        vm.cowBell = audioFileLoader("/project/sounds/drum/cowBell.mp3");

        vm.track1 = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
        vm.track2 = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0];
        vm.track3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        vm.track4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        vm.track5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        vm.arr = [vm.track1, vm.track2, vm.track3, vm.track4];

        function futureTick() {
            var secondsPerBeat = 60.0/vm.tempo;
            futureTickTime += 0.25 * secondsPerBeat;
            currentBeat++;
            if(currentBeat > 16){
                currentBeat = 1;
            }
        }

        function checkIfRecordedAndPlay(trackArray, sndToPlay, gridBeat, timeVal) {
            if(1 === trackArray[gridBeat - 1]){
                sndToPlay.play(timeVal);
            }
        }

        function checkPianoAndPlay(trackArray, gridBeat, timeVal) {
            if(vm.getAudio(trackArray[gridBeat - 1]) !== null)
                vm.getAudio(trackArray[gridBeat - 1]).play(timeVal);
        }

        function scheduleNote(beatDivisionNumber, time) {
            $("#metro-ui-" + (beatDivisionNumber)).effect("pulsate",{
                times:1
            }, 10);

            checkIfRecordedAndPlay(vm.track1, vm.kick, beatDivisionNumber, time);
            checkIfRecordedAndPlay(vm.track2, vm.snare, beatDivisionNumber, time);
            checkIfRecordedAndPlay(vm.track3, vm.hihat, beatDivisionNumber, time);
            checkIfRecordedAndPlay(vm.track4, vm.cowBell, beatDivisionNumber, time);

            for (var i = 0; i < vm.pieces.length; i++) {
                if (vm.pieces[i].instrumentType != "drum")
                    checkPianoAndPlay(vm.pieces[i].arr, beatDivisionNumber, time);
            }
        }

        function scheduler() {
            while(futureTickTime < audioContext.currentTime + 0.1){
                scheduleNote(currentBeat, futureTickTime);
                futureTick();
            }
            timerID = window.setTimeout(scheduler, 50.0)
        }

        function play() {
            isPlaying = !isPlaying;
            if(isPlaying){
                currentBeat = 1;
                futureTickTime = audioContext.currentTime;
                scheduler();
                vm.playButton = "Stop";

                mediaRecorder.start();

            }else{
                window.clearTimeout(timerID);
                vm.playButton =  "Play!";

                mediaRecorder.stop();
            }
        }

        function drumPadAction(arrayTrack, sound) {
            if(!isPlaying){
                sound.play(audioContext.currentTime);
            }
            arrayTrack[currentBeat - 1] = 1;
        }

        function audioFileLoader(fileDirectory) {
            var soundObj = {};
            soundObj.fileDirectory = fileDirectory;

            var getSound = new XMLHttpRequest();
            getSound.open("GET", soundObj.fileDirectory, true);
            getSound.responseType = "arraybuffer";
            getSound.onload = function () {
                audioContext.decodeAudioData(getSound.response, function (buffer) {
                    soundObj.soundToPlay = buffer;
                })
            };

            getSound.send();

            soundObj.play = function () {
                var playSound = audioContext.createBufferSource();
                playSound.buffer = soundObj.soundToPlay;
                playSound.connect(audioContext.destination);
                playSound.connect(dest);
                playSound.start(audioContext.currentTime);
            };
            return soundObj;
        }

        var chunks = [];
        var dest = audioContext.createMediaStreamDestination();
        var mediaRecorder = new MediaRecorder(dest.stream);

        mediaRecorder.ondataavailable = function(evt) {
            // push each chunk (blobs) in an array
            chunks.push(evt.data);
        };

        mediaRecorder.onstop = function(evt) {
            // Make blob out of our blobs, and open it.
            var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            var url = URL.createObjectURL(blob);

            var li = document.createElement('li');
            var au = document.createElement('audio');
            var hf = document.createElement('a');

            au.controls = true;
            au.src = url;
            hf.href = url;
            hf.download = new Date().toISOString() + '.ogg';
            hf.innerHTML = hf.download;
            li.appendChild(au);
            li.appendChild(hf);
            recordingslist.appendChild(li);
        };

//===================================================================================

        function init() {
            PieceService
                .findPieceByInstrumentType(vm.songId, vm.instrumentType)
                .then(function (response) {
                    if(response.data._id){
                        console.log(vm.arr);
                        vm.piece = response.data;
                        vm.arr = vm.piece.arr;
                        vm.track1 = vm.arr[0];
                        vm.track2 = vm.arr[1];
                        vm.track3 = vm.arr[2];
                        vm.track4 = vm.arr[3];
                    }
                });
            PieceService
                .findPiecesBySongId(vm.songId)
                .then(function (response) {
                    vm.pieces = response.data;
                    vm.pieces.splice(0, 1);
                    console.log(vm.pieces);
                });
        }
        init();

        function getAudio(val) {
            return vm.notes[val].audio;
        }

        function updatePiece() {
            PieceService
                .findPieceByInstrumentType( vm.songId, vm.instrumentType)
                .then(function (response) {
                    if(response.data._id){
                        PieceService
                            .updatePiece(vm.songId, vm.arr, vm.instrumentType)
                            .then(
                                function (response) {
                                    $location.url("/user/"+ vm.userId +"/song/"+ vm.songId);
                                },
                                function (error) {
                                    vm.error = "Failed to Save the music piece";
                                });
                    }else{
                        PieceService
                            .createPiece(vm.songId, vm.arr, vm.instrumentType)
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

        vm.notes =
            [
                { "_id": "0", audio: null},
                { "_id": "1", audio: audioFileLoader("/project/sounds/piano_MP3/01.mp3")},
                { "_id": "2", audio: audioFileLoader("/project/sounds/piano_MP3/02.mp3")},
                { "_id": "3", audio: audioFileLoader("/project/sounds/piano_MP3/03.mp3")},
                { "_id": "4", audio: audioFileLoader("/project/sounds/piano_MP3/04.mp3")},
                { "_id": "5", audio: audioFileLoader("/project/sounds/piano_MP3/05.mp3")},
                { "_id": "6", audio: audioFileLoader("/project/sounds/piano_MP3/06.mp3")},
                { "_id": "7", audio: audioFileLoader("/project/sounds/piano_MP3/07.mp3")},
                { "_id": "8", audio: audioFileLoader("/project/sounds/piano_MP3/08.mp3")},
                { "_id": "9", audio: audioFileLoader("/project/sounds/piano_MP3/09.mp3")},
                { "_id": "10", audio: audioFileLoader("/project/sounds/piano_MP3/10.mp3")},
                { "_id": "11", audio: audioFileLoader("/project/sounds/piano_MP3/11.mp3")},
                { "_id": "12", audio: audioFileLoader("/project/sounds/piano_MP3/12.mp3")},
                { "_id": "13", audio: audioFileLoader("/project/sounds/piano_MP3/13.mp3")},
                { "_id": "14", audio: audioFileLoader("/project/sounds/piano_MP3/14.mp3")},
                { "_id": "15", audio: audioFileLoader("/project/sounds/piano_MP3/15.mp3")},
                { "_id": "16", audio: audioFileLoader("/project/sounds/piano_MP3/16.mp3")},
                { "_id": "17", audio: audioFileLoader("/project/sounds/piano_MP3/17.mp3")},
                { "_id": "18", audio: audioFileLoader("/project/sounds/piano_MP3/18.mp3")},
                { "_id": "19", audio: audioFileLoader("/project/sounds/piano_MP3/19.mp3")},
                { "_id": "20", audio: audioFileLoader("/project/sounds/piano_MP3/20.mp3")},
                { "_id": "21", audio: audioFileLoader("/project/sounds/piano_MP3/21.mp3")},
                { "_id": "22", audio: audioFileLoader("/project/sounds/piano_MP3/22.mp3")},
                { "_id": "23", audio: audioFileLoader("/project/sounds/piano_MP3/23.mp3")},
                { "_id": "24", audio: audioFileLoader("/project/sounds/piano_MP3/24.mp3")},
                { "_id": "25", audio: audioFileLoader("/project/sounds/piano_MP3/25.mp3")},
                { "_id": "26", audio: audioFileLoader("/project/sounds/piano_MP3/26.mp3")},
                { "_id": "27", audio: audioFileLoader("/project/sounds/piano_MP3/27.mp3")},
                { "_id": "28", audio: audioFileLoader("/project/sounds/piano_MP3/28.mp3")},
                { "_id": "29", audio: audioFileLoader("/project/sounds/piano_MP3/29.mp3")},
                { "_id": "30", audio: audioFileLoader("/project/sounds/piano_MP3/30.mp3")},
                { "_id": "31", audio: audioFileLoader("/project/sounds/piano_MP3/31.mp3")},
                { "_id": "32", audio: audioFileLoader("/project/sounds/piano_MP3/32.mp3")},
                { "_id": "33", audio: audioFileLoader("/project/sounds/piano_MP3/33.mp3")},
                { "_id": "34", audio: audioFileLoader("/project/sounds/piano_MP3/34.mp3")},
                { "_id": "35", audio: audioFileLoader("/project/sounds/piano_MP3/35.mp3")},
                { "_id": "36", audio: audioFileLoader("/project/sounds/piano_MP3/36.mp3")},
                { "_id": "37", audio: audioFileLoader("/project/sounds/piano_MP3/37.mp3")},
                { "_id": "38", audio: audioFileLoader("/project/sounds/piano_MP3/38.mp3")},
                { "_id": "39", audio: audioFileLoader("/project/sounds/piano_MP3/39.mp3")},
                { "_id": "40", audio: audioFileLoader("/project/sounds/piano_MP3/40.mp3")},
                { "_id": "41", audio: audioFileLoader("/project/sounds/piano_MP3/41.mp3")},
                { "_id": "42", audio: audioFileLoader("/project/sounds/piano_MP3/42.mp3")},
                { "_id": "43", audio: audioFileLoader("/project/sounds/piano_MP3/43.mp3")},
                { "_id": "44", audio: audioFileLoader("/project/sounds/piano_MP3/44.mp3")},
                { "_id": "45", audio: audioFileLoader("/project/sounds/piano_MP3/45.mp3")},
                { "_id": "46", audio: audioFileLoader("/project/sounds/piano_MP3/46.mp3")},
                { "_id": "47", audio: audioFileLoader("/project/sounds/piano_MP3/47.mp3")},
                { "_id": "48", audio: audioFileLoader("/project/sounds/piano_MP3/48.mp3")},
                { "_id": "49", audio: audioFileLoader("/project/sounds/piano_MP3/49.mp3")},
                { "_id": "50", audio: audioFileLoader("/project/sounds/piano_MP3/50.mp3")},
                { "_id": "51", audio: audioFileLoader("/project/sounds/piano_MP3/51.mp3")},
                { "_id": "52", audio: audioFileLoader("/project/sounds/piano_MP3/52.mp3")},
                { "_id": "53", audio: audioFileLoader("/project/sounds/piano_MP3/53.mp3")},
                { "_id": "54", audio: audioFileLoader("/project/sounds/piano_MP3/54.mp3")},
                { "_id": "55", audio: audioFileLoader("/project/sounds/piano_MP3/55.mp3")},
                { "_id": "56", audio: audioFileLoader("/project/sounds/piano_MP3/56.mp3")},
                { "_id": "57", audio: audioFileLoader("/project/sounds/piano_MP3/57.mp3")},
                { "_id": "58", audio: audioFileLoader("/project/sounds/piano_MP3/58.mp3")},
                { "_id": "59", audio: audioFileLoader("/project/sounds/piano_MP3/59.mp3")},
                { "_id": "60", audio: audioFileLoader("/project/sounds/piano_MP3/60.mp3")},
                { "_id": "61", audio: audioFileLoader("/project/sounds/piano_MP3/61.mp3")},
                { "_id": "62", audio: audioFileLoader("/project/sounds/piano_MP3/62.mp3")},
                { "_id": "63", audio: audioFileLoader("/project/sounds/piano_MP3/63.mp3")},
                { "_id": "64", audio: audioFileLoader("/project/sounds/piano_MP3/64.mp3")},
                { "_id": "65", audio: audioFileLoader("/project/sounds/piano_MP3/65.mp3")},
                { "_id": "66", audio: audioFileLoader("/project/sounds/piano_MP3/66.mp3")},
                { "_id": "67", audio: audioFileLoader("/project/sounds/piano_MP3/67.mp3")},
                { "_id": "68", audio: audioFileLoader("/project/sounds/piano_MP3/68.mp3")},
                { "_id": "69", audio: audioFileLoader("/project/sounds/piano_MP3/69.mp3")},
                { "_id": "70", audio: audioFileLoader("/project/sounds/piano_MP3/70.mp3")},
                { "_id": "71", audio: audioFileLoader("/project/sounds/piano_MP3/71.mp3")},
                { "_id": "72", audio: audioFileLoader("/project/sounds/piano_MP3/72.mp3")},
                { "_id": "73", audio: audioFileLoader("/project/sounds/piano_MP3/73.mp3")},
                { "_id": "74", audio: audioFileLoader("/project/sounds/piano_MP3/74.mp3")},
                { "_id": "75", audio: audioFileLoader("/project/sounds/piano_MP3/75.mp3")},
                { "_id": "76", audio: audioFileLoader("/project/sounds/piano_MP3/76.mp3")},
                { "_id": "77", audio: audioFileLoader("/project/sounds/piano_MP3/77.mp3")},
                { "_id": "78", audio: audioFileLoader("/project/sounds/piano_MP3/78.mp3")},
                { "_id": "79", audio: audioFileLoader("/project/sounds/piano_MP3/79.mp3")},
                { "_id": "80", audio: audioFileLoader("/project/sounds/piano_MP3/80.mp3")},
                { "_id": "81", audio: audioFileLoader("/project/sounds/piano_MP3/81.mp3")},
                { "_id": "82", audio: audioFileLoader("/project/sounds/piano_MP3/82.mp3")},
                { "_id": "83", audio: audioFileLoader("/project/sounds/piano_MP3/83.mp3")},
                { "_id": "84", audio: audioFileLoader("/project/sounds/piano_MP3/84.mp3")},
                { "_id": "85", audio: audioFileLoader("/project/sounds/piano_MP3/85.mp3")},
                { "_id": "86", audio: audioFileLoader("/project/sounds/piano_MP3/86.mp3")},
                { "_id": "87", audio: audioFileLoader("/project/sounds/piano_MP3/87.mp3")},
                { "_id": "88", audio: audioFileLoader("/project/sounds/piano_MP3/88.mp3")},
            ];
    }
})();





