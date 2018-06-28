var pathTo = {
  sand: "none"
};

function logData(sandPath){
  pathTo.sand = sandPath;
  // alert(pathTo.sand)
}

var err = {
  name: "none",
  line: "0",
  full: "no errors",
  data: "errors",
  ifIs: 0
};

dispatchCustomJSXEvent(err, "com.playwrite.init")

function runScript(path) {
  try {
  $.evalFile(path)
  } catch (e) {
    dispatchCustomJSXEvent(e.name + "," + e.line + "," + e + "," + e.message, "com.playwrite.error")
  }
}

function console(evalObj){
  try {
    dispatchCustomJSXEvent(evalObj, "com.playwrite.console")

  } catch(e) {
    dispatchCustomJSXEvent(e, "com.playwrite.error")
  }
}


function dispatchCustomJSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
  } catch (e) {
    dispatchCustomJSXEvent(e, "com.playwrite.error")
  }
  if (xLib) {
  var eventObj = new CSXSEvent();
  eventObj.type = eventType;
  eventObj.data = payload;
  eventObj.dispatch();
  }
  return;
}

// function triggerJSXFunction(isOn) {
//   if (isOn) {
//     // there's a returning value from JS
//     alert("Returning value: " + isOn);
//   } else {
//     if (Math.random() > 0.5) {
//       // payload is a regular string
//       dispatchCustomJSXEvent(somePayload, "ConsoleEvent");
//     } else {
//       // payload is a stringified function to be evaluated
//       dispatchCustomJSXEvent(someOtherPayload, "Custom Event 2");
//     }
//   }
// }
