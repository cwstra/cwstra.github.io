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
  var file = $("#listFiles").val();
  if (file=="custom"){
    file = $("#import").val();
  }
}

function goTo(prop){

}

function start(){

}

//Runtime
$(document).ready(function() {
  getFiles();
});
