
// var app = angular.module('tciaSubmissionApp', ['mgo-angular-wizard']);

app.controller('WizardCtrl', function($scope, $q, $timeout, WizardHandler, tciaService) {

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
            return tciaService.checkCreds($scope.user.username, $scope.user.password);
        };

        $scope.getXML = function(){
            //Experiment with parsing XML in javascript
            var xmlDoc = tciaService.getDicomFilesXML();
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