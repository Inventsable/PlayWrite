// function console(data){
//   var file = new File(pathTo.sand + "test.jsx");
//   file.open("e", "TEXT", "????");
//   file.write(data)
//   file.close();
// }

var pathTo = {
  sand: "none"
};

function logData(sandPath){
  pathTo.sand = sandPath;
  // alert(pathTo.sand)
}
//
// function logInfo(path, Txt){
// var file = new File(path + "result.jsx");
// file.open("e", "TEXT", "????");
// file.seek(0,2);
// $.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';
// file.writeln(Txt);
// file.close();
// };


// var testInfo = $.includePath;
// alert(testInfo);



// function console(data){
//   dispatchCustomJSXEvent(data, "toConsole");
// }

// var msg = {
//   payload: "none",
//   action: "secondAction()"
// };

// var somePayload = "Can also be a stringified JSON Object";
// var someOtherPayload = "secondAction()";

dispatchCustomJSXEvent("Hello to Javascript from JSX", "origin");

function buildEventData(p){
  msg.payload = p;
  // msg.action = a;
}

function dispatchCustomJSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
  } catch (e) {
    alert(e);
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
//     // if (Math.random() > 0.5) {
//       // payload is a regular string
//       dispatchCustomJSXEvent(msg.payload, "Console");
//     // } else {
//     //   // payload is a stringified function to be evaluated
//     //   dispatchCustomJSXEvent(someOtherPayload, "Custom Event 2");
//     // }
//   }
// }
