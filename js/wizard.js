

    //test controller
app.controller('myController', function($scope, WizardHandler, $q, $timeout, tciaService){

    $scope.canExit = true;
    $scope.stepActive = true;

    $scope.loggedIn = true;
    $scope.loaded = true;

    //tryLogin();
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

        var promise = tciaService.collectionList();

        promise.then(function (response) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(response, "text/xml");

            var json = xmlToJson(xml);

            var innerJson = json.DicomFiles.children;

            $scope.dirList = innerJson;

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

        //Wizard Methods
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

    function xmlToJson(xml){

        var obj = {};

        if (xml.attributes && xml.attributes.length > 0) {
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (nodeName == "dir" || nodeName == "DicomObject")
                    nodeName = "children";
                if (typeof(obj[nodeName]) == "undefined") {
                    if (nodeName == "children")
                        obj[nodeName] = [xmlToJson(item)];
                    else
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



/*
    angular.wizard.js
*/
(function(l){l.module("angularTreeview",[]).directive("treeModel",function($compile){return{restrict:"A",link:function(a,g,c){var e=c.treeModel,h=c.nodeLabel||"label",d=c.nodeChildren||"children",k='<ul><li data-ng-repeat="node in '+e+'"><i class="collapsed" data-ng-show="node.'+d+'.length && node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="expanded" data-ng-show="node.'+d+'.length && !node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="normal" data-ng-hide="node.'+
    d+'.length"></i> <span data-ng-class="node.selected" data-ng-click="selectNodeLabel(node, $event)">{{node.'+h+'}}</span><div data-ng-hide="node.collapsed" data-tree-model="node.'+d+'" data-node-id='+(c.nodeId||"id")+" data-node-label="+h+" data-node-children="+d+"></div></li></ul>";e&&e.length&&(c.angularTreeview?(a.$watch(e,function(m,b){g.empty().html($compile(k)(a))},!1),a.selectNodeHead=a.selectNodeHead||function(a,b){b.stopPropagation&&b.stopPropagation();b.preventDefault&&b.preventDefault();b.cancelBubble=
    !0;b.returnValue=!1;a.collapsed=!a.collapsed},a.selectNodeLabel=a.selectNodeLabel||function(c,b){b.stopPropagation&&b.stopPropagation();b.preventDefault&&b.preventDefault();b.cancelBubble=!0;b.returnValue=!1;a.currentNode&&a.currentNode.selected&&(a.currentNode.selected=void 0);c.selected="selected";a.currentNode=c}):g.html($compile(k)(a)))}}})})(angular);