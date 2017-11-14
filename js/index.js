
app.controller('WizardCtrl', function($scope, $q, $timeout, WizardHandler, tciaService) {

        $scope.canExit = true;
        $scope.stepActive = true;

        $scope.loggedIn = false;
        $scope.loaded = true;

        $scope.received = {
            patientsReceived: 100,
            studiesReceived: 320,
            seriesReceived: 1432,
            quarantinedSeries: 3
        };




        tryLogin();
        function tryLogin(){

            var promise = tciaService.login();

            promise.then(function (response){
                $scope.loggedIn = true;
            }, function() {
                $scope.loggedIn = false;
            });

        };

        $scope.importSubmissionTemplate = function(){
            var file = document.getElementById('templateFile').files[0];

            var promise = tciaService.sendCollectionInfo(file);

            promise.then(function (response) {
                //alert('success' + response);
            }, function () {
                alert('An error has occurred');
            });
        };

        $scope.dicomCollectionList = function(){
            var files = document.getElementById('dicomFiles');

            var promise = tciaService.collectionList(files);

            promise.then(function (response) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(response, "text/xml");
                //var json = JSON.stringify(xmlToJson(xml));
                var json = xmlToJson(xml);
                $scope.gridOptions.data = json.DicomFiles.dir.dir.dir.DicomObject;

            }, function () {
                alert('An error has occurred');
            });
        };


        $scope.deidentifyDICOMFiles = function () {
            var promise = tciaService.anonymizeFiles('DirectoryStorageService');

            promise.then(function (response) {
                //alert('success' + response);
            }, function () {
                alert('An error has occurred');
            });
        };

        $scope.getDeidentifiedList = function(){
          var promise = tciaService.getAnonymizedFileList();

            promise.then(function (response) {
                //alert('success' + response);
            }, function () {
                alert('An error has occurred');
            });
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


    function xmlToJson(xml) {

        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    });