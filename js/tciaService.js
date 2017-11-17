app.service('tciaService', function($http, $q){


    this.login = function(){
        var deffered = $q.defer();
        $http.get('/login/ajax?username=admin&password=tcia')
            .success(function(response){
                deffered.resolve(response);
            })
            .error(function(response){
                deffered.reject(response);
            });

        return deffered.promise;
    };

    this.sendCollectionInfo = function(file){

        var fileFormData = new FormData();
        fileFormData.append('file', file);

        var deffered = $q.defer();
        $http.post('/Collection', fileFormData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}

        }).success(function (response) {
            deffered.resolve(response);
        }).error(function (response) {
            deffered.reject(response);
        });

        return deffered.promise;
    };

    this.collectionList = function(){
        var deffered = $q.defer();
        $http.get('/Collection/listImport')
          .success(function(response){
              deffered.resolve(response);
          })
          .error(function(response){
              deffered.reject(response);
          });

        return deffered.promise;
    };

    this.anonymizeFiles = function(filepath){
        var deffered = $q.defer();
        $http.get('/Collection/anonymize?file=' + filepath)
            .success(function(response){
                deffered.resolve(response);
            })
            .error(function(response){
                deffered.reject(response);
            });

        return deffered.promise;

    };

    this.getAnonymizedFileList = function(){
        var deffered = $q.defer();
        $http.get('/Collection/listAnonymized')
            .success(function(response){
                deffered.resolve(response);
            })
            .error(function(response){
                deffered.reject(response);
            });

        return deffered.promise;
    };
});