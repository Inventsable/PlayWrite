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

  csInterface.addEventListener('com.playwrite.write', function(evt){
    updateConsole('read', evt.data);
    insertText(evt.data)
  });

  csInterface.addEventListener('mighty.rollcall', function(evt) {
    dispatchEvent('mighty.rollanswer', extFolder())
  });


  csInterface.addEventListener('com.playwrite.answer', function(evt) {
    console.log(evt.data);
    // var parsed = JSON.parse(evt.data);
    // console.log(parsed);
  });

  function chainEvent(data, name) {
    csInterface.evalScript(`JSXEvent('${data}', '${name}')`)
  }

  csInterface.addEventListener('com.playwrite.code', function(evt){
    return currentCode();
  });

  csInterface.addEventListener('com.playwrite.call', function(evt){
    var data = currentCode();
    // console.log(data);
    var strData = JSON.stringify(data);
    // console.log('First event');
    // var data = 'Second event';
    chainEvent(strData, 'com.playwrite.answer')
  });

  var modeCount = 0;

  csInterface.addEventListener('com.playwrite.rewrite', function(evt){
    var modes = ['javascript', 'mixedOverlay', 'htmlmixed', 'css'];
    updateConsole('read', 'Rewriting...');
    console.log(evt);
    console.log(evt.data);

    // var thisMode = modes[modeCount];
    // if (modeCount > 3)
    //   modeCount = 0;
    // changeMode(thisMode);
    // modeCount++;
    rewriteAll(evt.data);
    // insertText(evt.data)
  });

  csInterface.addEventListener("com.playwrite.console", function(evt) {
    // console.log('Data from JSX: ' + evt.data);
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


  function dispatchEvent(name, data) {
    var event = new CSEvent(name, 'APPLICATION');
    event.data = data;
    csInterface.dispatchEvent(event);
  }

  function globalEvent(name, data) {
    var event = new CSEvent(name, 'GLOBAL');
    event.data = data;
    csInterface.dispatchEvent(event);
  }

  function removejsx(filename, filetype){
      var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
      var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
      var allsuspects=document.getElementsByTagName(targetelement)
      for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
          allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
      }
  }

  // removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
  // removejscssfile("somestyle.css", "css") //remove all occurences "somestyle.css" on page


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
