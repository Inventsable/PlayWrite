var data = {
	text: "none"
};

var inputBox = document.getElementById('input');
var consoleText = document.getElementById('consoleText');

CodeMirror.defineMode("mixedOverlay", function(config, parserConfig) {
  return CodeMirror.overlayMode(CodeMirror.getMode(config, "javascript"), CodeMirror.getMode(config, "adobe"));
});


var aDOM = ["app", "documents", "document", "activeDocument"];
var aProp = ["name", "length", "selection"];
var aWindow = ["alert", "confirm", "console"];
var aFunc = ["console", "test"];


CodeMirror.defineMode("adobe", function(config, parserConfig) {
  var adobeOverlay = {
    token: function(stream, state) {
      var ch;
			for (var e = 0; e < aDOM.length; e++) {
				if (stream.match(aDOM[e])) {
					return "DOM";
				}
			}
      for (var a = 0; a < aProp.length; a++) {
				if (stream.match(aProp[a])) {
					return "prop";
				}
			}
      for (var u = 0; u < aWindow.length; u++) {
				if (stream.match(aWindow[u])) {
					return "window";
				}
			}
      for (var f = 0; f < aFunc.length; f++) {
        if (stream.match(aFunc[f])) {
          return "func";
        }
      }
      stream.next();
      return null;
    }
  };
  return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), adobeOverlay);

});

var cm =
CodeMirror.fromTextArea(document.getElementById('cm'), {
  // value: "function myScript(){return 100;}\n",
	inputStyle: "contenteditable",
	value: data.text,
  mode:  "mixedOverlay",
	theme: "ILST",
	lineWrapping: true,
	lineNumbers: true,
	scrollbarStyle: "simple",
	autofocus: true,
	autoCloseBrackets: true,
	// addModeClass: true,
	styleSelectedText: true,
	// keyMap: "sublime",
	// extraKeys: {"Ctrl-Enter": "toggleComment"}
	extraKeys: {
			"Shift-Backspace": "delWordLeft",
			// "Ctrl-Shift-Backspace": "delLineLeft",
			// "Ctrl-Alt-ArrowLeft": "goWordLeft",
			// "Ctrl-Alt-ArrowRight": "goWordRight",
			"Alt-Enter": function(cm) {
					runScript();
			},
	}
});


cm.on("change", function() {
	scribe('write');
	// console.log(data.text);
});
cm.on("focus", function() {
	inputBox.style.borderColor = appInfo.activeColor;
});
cm.on("blur", function() {
	inputBox.style.borderColor = appInfo.borderColor;
});

// cm.on("keydown", function(event) {
// 	console.log(event);
// });

cm.on("keyup", function (cm, event) {
			 if (event.key === "Backspace") {
				 if (event.ctrlKey === true) {
	 				  console.log("Clear line");
						cm.execCommand('delWordBefore');
	 					}
					 // console.log(event);
				 }
			 if (event.key === '/') {
				 if (event.altKey === true) {
					 cm.execCommand('toggleComment');
				 }
			 }
		});



var mirror = document.getElementsByClassName("CodeMirror-code");
var mirrorBody = document.getElementsByClassName('CodeMirror');
var gutterBody = document.getElementsByClassName('CodeMirror-gutters');
// var mirrorSizer = document.getElementsByClassName('CodeMirror-sizer');
// var lineSizer = document.getElementsByClassName('CodeMirror-linenumbers');
// mirrorSizer[0].style.marginLeft = "21px";
// lineSizer[0].style.width = "20px";



function reskinCodeMirror(){
	inputBox.style.borderRadius = "2px 2px 0px 0px";
	// consoles[0].style.borderTopWidth = "0px";
	consoleText.style.color = appInfo.baseFontColor;
	mirrorBody[0].style.backgroundColor = appInfo.inputBGColorIdle;
	gutterBody[0].style.borderColor = appInfo.borderColor;
	gutterBody[0].style.backgroundColor = appInfo.selectColor;
}

mirror[0].addEventListener("keyup", function(event){
	if (event.key === 'ArrowLeft') {
		if (event.altKey === true) {
			cm.execCommand('goWordLeft');
		}
	}
}, false);


// cm.on("keyup", function (cm, event) {
// 		  event = {
// 		    type: "keydown",
// 		    keyCode: event.keyCode,
// 		    ctrlKey: event.ctrlKey,
// 		    shiftKey: event.shiftKey,
// 		    altKey: event.altKey,
// 		    metaKey: event.metaKey
// 		  };
//
// 		  console.log(event);
// 		});

// console.log(cm.getScrollerElement());
// cm.triggerOnKeyDown(ev)
// cm.on("keyHandled", "ctrl-Enter", function(event){
// 	console.log("Test");
// });


// var doc = cm.getDoc();
// var value = cm.getValue();
// console.log(doc);
// console.log(value);

//  MODE notes
// if (stream.match("app") || stream.match("document")) {
// 		return "DOM";
// if (stream.match("alert") || stream.match("confirm") || stream.match("doScript") || stream.match("executeMenuCommand") ) {
// 		return "window";
// } else if (stream.match("name") || stream.match("length") || stream.match("selection")) {
// 		return "prop";
// } else {
// }
// while (stream.next() != null && !stream.match("{{", false)) {}
// return null;
//
