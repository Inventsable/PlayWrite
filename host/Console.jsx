// var somePayload = "Can also be a stringified JSON Object";
// var someOtherPayload = "secondAction()";

function console(evalObj){
  dispatchCustomJSXEvent(evalObj, "ConsoleEvent")
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
//     if (Math.random() > 0.5) {
//       // payload is a regular string
//       dispatchCustomJSXEvent(somePayload, "ConsoleEvent");
//     } else {
//       // payload is a stringified function to be evaluated
//       dispatchCustomJSXEvent(someOtherPayload, "Custom Event 2");
//     }
//   }
// }
