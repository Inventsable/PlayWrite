var data = {
	text: "none"
};
var widgets = [];

var inputBox = document.getElementById('input');
var consoleText = document.getElementById('consoleText');
var consoleIcon = document.getElementById('consoleIcon');

CodeMirror.defineMode("mixedOverlay", function(config, parserConfig) {
  return CodeMirror.overlayMode(CodeMirror.getMode(config, "javascript"), CodeMirror.getMode(config, "adobe"));
});

function highlightLine(lineNumber) {
    var actualLineNumber = lineNumber - 1;
    console.log(doc);
    doc.addLineClass(actualLineNumber, 'gutter', 'error');
}



CodeMirror.defineMode("adobe", function(config, parserConfig) {
  var aDOM = ["app", "documents", "document", "activeDocument", "layers"
              , "layer", "artboard", "artboards"];
  var aProp = ["name", "length", "selection", "color", "red", "green", "blue"];
  var aWindow = ["alert", "confirm"];
  var aFunc = ["console", "test"];

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
  // viewportMargin: Infinity,
	// addModeClass: true,
	styleSelectedText: true,
	// keyMap: "sublime",
	// extraKeys: {"Ctrl-Enter": "toggleComment"}
	extraKeys: {
			"Shift-Backspace": "delGroupLeft",
      "Shift-Delete": "delWordRight",
      "Tab": "defaultTab",
			"Ctrl-Shift-Backspace": "delLineLeft",
			"Alt-Ctrl-ArrowLeft": "goWordLeft",
			"Alt-Ctrl-ArrowRight": "goWordRight",
			"Alt-Enter": function(cm) {
					runScript();
			},
	}
});

var doc = cm.getDoc();

// doc.markText({line: 1, ch: 0}, {line: 1, ch: 50}, {className: "highlighted"});

cm.setSize("100%", 200);
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
			 if (event.key === 'Enter') {
				 if (event.shiftKey === true && event.ctrlKey === true) {
           addPanel("top");
				 }
			 } else if (event.key === 'Delete') {
 				 if (event.shiftKey === true && event.ctrlKey === true) {
            // event.preventDefault();
            cm.execCommand('delLineRight');
            console.log("Something");
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
  consoleIcon.style.color = appInfo.baseFontColor;
	mirrorBody[0].style.backgroundColor = appInfo.inputBGColorIdle;
	gutterBody[0].style.borderColor = appInfo.borderColor;
	gutterBody[0].style.backgroundColor = appInfo.selectColor;
}

function updateHints(hint) {
  cm.operation(function(){
    for (var i = 0; i < widgets.length; ++i) {
      cm.removeLineWidget(widgets[i]);
      widgets.pop();
    }
      try {
        var isError = hint.ifIs;
        if (isError != 1) {
          return;
        }
      } catch(e) {
        return;
      }
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.classList.add("fa");
      icon.classList.add("fa-exclamation-circle");
      icon.classList.add("errorIcon");
      msg.appendChild(document.createTextNode(hint.data));
      msg.className = "errorLine";
      widgets.push(cm.addLineWidget(hint.line - 1, msg, {coverGutter: false, noHScroll: false}));
  });
  var info = cm.getScrollInfo();
  var after = cm.charCoords({line: cm.getCursor().line + 1, ch: 0}, "local").top;
  if (info.top + info.clientHeight < after)
    cm.scrollTo(null, after - info.clientHeight + 3);
}

function initError() {
  var hint = {
    if: "0",
  };
  // var sc = document.getElementById("script");
  // var content = sc.textContent || sc.innerText || sc.innerHTML;
  var waiting;
  cm.on("change", function() {
    clearTimeout(waiting);
    waiting = setTimeout(updateHints, 500);
  });
  setTimeout(updateHints(hint), 100);
};
//
//

var testBtn = document.getElementById('testBtn');
testBtn.addEventListener("click", function(e){
  addPanel("top");
}, false)


var numPanels = 0;
var panels = {};
var editor;

function makePanel(where) {
  var node = document.createElement("div");
  var id = ++numPanels;
  var widget, close, label;

  node.id = "panel-" + id;
  node.className = "panel " + where;
  close = node.appendChild(document.createElement("a"));
  close.setAttribute("title", "Remove me!");
  close.setAttribute("class", "remove-panel");
  close.textContent = "✖";
  CodeMirror.on(close, "click", function() {
    panels[node.id].clear();
    --numPanels;
    console.log(numPanels);
  });
  label = node.appendChild(document.createElement("span"));
  label.textContent = previewText();
  return node;
}
function addPanel(where) {
  makeString();
  var node = makePanel(where);
  panels[node.id] = cm.addPanel(node, {position: where, stable: false});
  writeNewScript();
}


function previewText(){
  var text = doc.getValue().trim();
  var textPreview = text.split("()")[0] + "()";
  return textPreview;
}

function makeString() {
  var val = doc.getValue().trim();
  console.log(val);
  // val.replace(/\r?\n?/g, '');
  // console.log(val);
  // val.trim();
  // console.log(val);
}

// mirror[0].addEventListener("keyup", function(event){
// 	if (event.key === 'ArrowLeft') {
// 		if (event.altKey === true) {
// 			cm.execCommand('goWordLeft');
// 		}
// 	}
// }, false);


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
