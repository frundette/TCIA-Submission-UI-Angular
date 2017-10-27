app.service('tciaService', function(){
    this.sayHello= function(text){
        return "Service says \"Hello " + text + "\"";
    };

    this.checkCreds = function(username, password){
        return (username === 'tcia' && password === 'password')
    };

    this.getDicomFilesXML = function(){

        //TODO: Replace example with call to CTP
        var dicomXML, parser, xmlDoc;

        dicomXML = '<DicomFiles>'+
            '<dir name="DirectoryStorageService">'+
            '<dir name="123-Bugs,Bunny">'+
            '<dir name="20010312">' +
            '<DicomObject Modality="CT" PatientID="1200824338" PatientName="Bunny,Bugs" StudyDate="20010312" name="999.1234567890"/>' +
            '<DicomObject Modality="CT" PatientID="1200824338" PatientName="Bunny,Bugs" StudyDate="20010312" name="999.1234567890"/>' +
            '</dir>' +
            '</dir>' +
            '</dir>' +
            '</DicomFiles>';

        parser = new DOMParser();
        return parser.parseFromString(dicomXML,"text/xml");
    };

});