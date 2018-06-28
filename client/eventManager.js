(function () {
  'use strict';

  var csInterface = new CSInterface();
  var err = {
    name: "none",
    line: "none"
  };


  csInterface.addEventListener('com.playwrite.init', function(evt) {
    console.log("Initializing console");
  });

  csInterface.addEventListener("com.playwrite.console", function(evt) {
    console.log('Data from JSX: ' + evt.data);
    if (evt.data === 'EvalScript error.') {
      updateConsole('alert', evt.data);
    } else {
      updateConsole('read', evt.data);
      try {
          for (things in err) {
          err[things] = 0;
        }
      } catch(e){
        var err = {
          name: "none",
          line: "0",
          full: "no errors",
          data: "errors",
          ifIs: 0
        };
      }
    }
    console.log(evt.data);
    updateHints(err);
  });


  csInterface.addEventListener("com.playwrite.error", function(evt) {
      var sum = evt.data.split(",");
      err.name = sum[0];
      err.line = sum[1];
      err.full = sum[2];
      console.log(sum);
      try {
        err.data = sum[2].replace(err.name + ": ", "")
      } catch(e) {
        // console.log(evt);
        err.name = "TypeError";
        err.data = sum[0].replace(err.name + ": ", "");
        err.line = 1;
        err.full = evt.data;
        console.log(err);
      }
      err.ifIs = 1;
      updateConsole('alert', err.name);
      updateHints(err);
  });

  // csInterface.addEventListener("com.playwrite.clear", function(evt) {
  //
  //     // updateConsole('alert', err.name);
  //     updateHints(err);
  // });


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
