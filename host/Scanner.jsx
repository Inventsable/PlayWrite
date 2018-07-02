

// alert($.fullPath)

var pathTo = {
  ext: "none",
  sand: "none",
  host: "none"
};

function logScan(pathToExt){
  pathTo.ext = pathToExt;
  pathTo.sand = pathToExt + "/log/Sandbox/";
  return readFiles();
}


function readFiles(){
  var saveFolder = Folder(pathTo.sand);
  return saveFolder.getFiles().length;
}


function logFiles(){
  var saveFolder = Folder(pathTo.sand);
  for (var i = 1; i <= saveFolder.getFiles().length; i++){
    var thisFile = File(pathTo.sand + i + ".jsx");
    if (thisFile) {
      // alert("true")
      // continue;
    } else {
      break;
    }
  }
  return saveFolder.getFiles().length;
}


// dispatchCustomJSXEvent(err, "com.playwrite.init")


// function checkFiles(){
//   var file = new File(pathTo.sand + "test.jsx");
// }

/**
// var nameArray = new Array ();

// A hard coded path to a directory 'mac style'
var processFolder = Folder('~/Desktop/Process Images/');
// Use folder object get files function with mask 'a reg ex'
var fileList = processFolder.getFiles(/\.(jpg|tif|psd|eps|png)$/i);
// Loop through files
for (var i = 0; i < fileList.length; i++) {
     // Only process the returned file objects
     // The filter 'should' have missed out any folder objects
     if (fileList[i] instanceof File) {
          open(fileList[i]);
     }
}


var inFolder = Folder.selectDialog("Please select folder to process");
if(inFolder != null){
  var fileList = inFolder.getFiles(/\.(jsx)$/i);





  for(var a = 0 ;a < fileList.length; a++){

  var doc= open(fileList[a]);

}

**/
