//Functions
function getFiles(){
  var fs = require('fs');
  var files = fs.readdirSync('../default-adventures/');
  var opt = $("#listFiles"); opt.empty();
  var i; for (i=0;i<files.length;i++){
    opt.append('<option value="'+files[i]+'">'+files[i]+'</option>\n');
  }
  opt.append('<option value="custom">Upload File</option>\n');
}

function systemImport(){

}

function goTo(prop){
  
}

//Runtime
$(document).ready(function() {
  getFiles();
});
