angular.module('wizard-sample', ['mgo-angular-wizard'])
    .controller('WizardCtrl', function($scope, $q, $timeout, WizardHandler) {

        $scope.canExit = true;
        $scope.stepActive = true;

        $scope.user = {
            username: '',
            password: ''
        };

        $scope.received = {
            patientsReceived: 100,
            studiesReceived: 320,
            seriesReceived: 1432,
            quarantinedSeries: 3
        };


        $scope.templateFileLocation;
        $scope.deIdentifiedFileLocation;


        $scope.loginValidation = function(){
            //TODO: Move into seperate service file
            return ($scope.user.username === 'tcia' && $scope.user.password === 'password')
        };


        $scope.finished = function() {
            alert("Wizard finished :)");
        };
        $scope.logStep = function() {
            console.log("Step continued");
        };
        $scope.goBack = function() {
            WizardHandler.wizard().goTo(0);
        };
        $scope.exitWithAPromise = function() {
            var d = $q.defer();
            $timeout(function() {
                d.resolve(true);
            }, 1000);
            return d.promise;
        };
        $scope.exitToggle = function() {
            $scope.canExit = !$scope.canExit;
        };
        $scope.stepToggle = function() {
            $scope.stepActive = !$scope.stepActive;
        };
        $scope.exitValidation = function() {
            return $scope.canExit;
        };
    });