/**
 * Created by xinshu on 11/4/17.
 */
(function () {
    angular.module('projectApp')
        .controller('ModalDemoCtrl',
            function ($uibModal) {
        var vm = this;
        vm.animationsEnabled = true;

        vm.open = function () {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm'
            });
        };
    });

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
    angular.module('projectApp').controller('ModalInstanceCtrl', function ($uibModalInstance, $routeParams, SongService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.songId = $routeParams.sid;


        vm.keys = ['A a', 'B b', 'C c', 'D d', 'E e', 'F f', 'G g'];
        function init() {
            SongService
                .findSongById(vm.songId)
                .then(function (response) {
                    vm.song = response.data;
                    console.log("song: "+vm.song.songName);
                });
        }
        init();



        // var vm = this;
        vm.ok = function () {
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

// Please note that the close and dismiss bindings are from $uibModalInstance.
    angular.module('projectApp').component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            var vm = this;

            vm.ok = function () {
                vm.close();
            };

            vm.cancel = function () {
                vm.dismiss({$value: 'cancel'});
            };
        }
    });
})();