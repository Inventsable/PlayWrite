(function () {
  'use strict';

  var csInterface = new CSInterface();
  var consoleText = document.getElementById('consoleText');

  // Button onClick handler
  // document.getElementById('btn_test').addEventListener('click', function () {
  //   csInterface.evalScript('triggerJSXFunction()');
  // });

  // Listener for first event
  csInterface.addEventListener("ConsoleEvent", function(evt) {
    console.log('Data from the JSX payload: ' + evt.data);
    consoleText.textContent = evt.data;
    console.log(consoleText.textContent);
    // do something because Custom Event 1 is fired
    // firstAction(evt.data);
  });

  // // Listener for second event
  // csInterface.addEventListener("Custom Event 2", function(evt) {
  //   console.log('Data from the JSX payload: ' + evt.data);
  //   // "runs" the code that is in the payload
  //   eval(evt.data);
  // });
  //
  // function firstAction(data) {
  //   // do something
  //   console.log(data);
  // }
  //
  // function secondAction() {
  //   // do something
  //   console.log("I'm running...");
  //   var retVal = "something to be returned from JS back to JSX";
  //   csInterface.evalScript("triggerJSXFunction('" + retVal + "')");
  // }

}());
