angular
    .module("projectApp").directive('passwordDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length >= 6) {
                    mCtrl.$setValidity('validpassword', true);
                } else {
                    mCtrl.$setValidity('validpassword', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});