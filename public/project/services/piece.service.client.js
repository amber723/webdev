/**
 * Created by xinshu on 11/15/16.
 */
(function () {
    angular
        .module("projectApp")
        .factory("PieceService", PieceService);

    function PieceService($http) {

        var api = {
            createPiece: createPiece,
            findPieceByInstrumentType: findPieceByInstrumentType,
            findPiecesBySongId: findPiecesBySongId,
            updatePiece: updatePiece,
            deletePiece: deletePiece
        };
        return api;

        function createPiece(songId, arr, instrumentType) {
            var newPiece = {
                songId: songId,
                instrumentType: instrumentType,
                arr: arr
            };
            return $http.post("/project/song/"+songId+"/piece", newPiece);
        }

        function findPieceByInstrumentType(songId, instrumentType) {
            var url = "/project/piece?songId=" + songId + "&instrumentType="+instrumentType;
            return $http.get(url);
        }

        function findPiecesBySongId(songId) {
            var url = "/project/piece/" + songId;
            return $http.get(url);
        }

        function updatePiece(songId, arr, instrumentType) {
            var url = "/project/piece?songId=" + songId + "&instrumentType="+instrumentType;
            return $http.put(url, arr);
        }

        function deletePiece(songId, instrumentType) {
            var url = "/project/piece?songId=" + songId + "&instrumentType="+instrumentType;
            return $http.delete(url);
        }
    }
})();