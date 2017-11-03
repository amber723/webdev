// /**
//  * Created by xinshu on 11/12/16.
//  */
// (function () {
//     angular
//         .module("projectApp")
//         .config(function($mdIconProvider) {
//             $mdIconProvider
//                 .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
//         })
//         .controller("NewSongController", NewSongController)
//         .controller("ModalInstanceCtrl", ModalInstanceCtrl);
//
//     function NewSongController($uibModal) {
//         var vm = this;
//         vm.keys = ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g'];
//
//         vm.open = function () {
//             var modalInstance = $uibModal.open({
//                 animation: true,
//                 ariaLabelledBy: 'modal-title',
//                 ariaDescribedBy: 'modal-body',
//                 templateUrl: 'myModalContent.html',
//                 controller: 'ModalInstanceCtrl',
//                 controllerAs: 'model',
//                 resolve: {
//                     keys: function () {
//                         return vm.keys;
//                     }
//                 }
//             });
//
//         };
//     }
//
//     function ModalInstanceCtrl($uibModalInstance, keys, SongService,
//                                $routeParams, $location) {
//         var vm = this;
//         vm.userId = $routeParams.uid;
//         vm.keys = keys;
//         vm.song = {
//             mode: 'None',
//             key: vm.keys[2],
//             accidental: 'Natural'
//         };
//         vm.ok = function () {
//             if(vm.song.songName){
//                 SongService
//                     .createSong(vm.userId, vm.song)
//                     .then(function (response) {
//                         var newSong = response.data;
//                         if(newSong._id){
//                             $location.url("/user/"+ vm.userId +"/song/"+ newSong._id);
//                         }else{
//                             vm.error = "Failed to Create new Song";
//                         }
//                     });
//
//                 $uibModalInstance.close(vm.song);
//             }else{
//                 vm.error = "Song Name Required!";
//             }
//
//         };
//
//         vm.cancel = function () {
//             $uibModalInstance.dismiss('cancel');
//         };
//     }
//
// })();
//
//
//
//
//
