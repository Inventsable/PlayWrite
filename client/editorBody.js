var data = {
	text: "none"
};
var widgets = [];

var inputBox = document.getElementById('input');
var consoleText = document.getElementById('consoleText');
var consoleIcon = document.getElementById('consoleIcon');

// var panel = document.getElementsByClassName('panel');
// panel = [].slice.call(panel);
// var addedPanel = document.getElementsByClassName('add-panel');
// addedPanel = [].slice.call(addedPanel);
// var removedPanel = document.getElementsByClassName('remove-panel');
// removedPanel = [].slice.call(removedPanel);

CodeMirror.defineMode("mixedOverlay", function(config, parserConfig) {
  return CodeMirror.overlayMode(CodeMirror.getMode(config, "javascript"), CodeMirror.getMode(config, "adobe"));
});


CodeMirror.defineMode("adobe", function(config, parserConfig) {
  var aDOM = ["app", "documents", "document", "activeDocument", "layers"
              , "layer", "artboard", "artboards"];
  var aProp = ["name", "length", "selection", "color", "red", "green", "blue", "fill", "stroke", "linecap", "linejoin", "miterlimit", 'circle', 'svg ', '/svg', 'xmlns', 'viewBox', 'title', 'polyline', 'points', 'x1', 'x2', 'y1', 'y2', 'cx', 'cy', ' r', 'x=', ' y', 'width', 'height', 'path', ' d', 'rect', 'xmlns'];
  var aWindow = ["alert", "confirm", 'id=', 'class=', 'JSXEvent', 'resetPlay'];
  var aFunc = ["console"];

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
	matchBrackets: true,
  // viewportMargin: Infinity,
	// addModeClass: true,
	styleSelectedText: true,
	// keyMap: "sublime",
	extraKeys: {
			"Shift-Backspace": "delWordBefore",
      "Shift-Delete": "delWordAfter",
      "Tab": "defaultTab",
      "Ctrl-Enter": "toggleComment",
			"Ctrl-Shift-Backspace": "killLine",
			"Alt-Ctrl-ArrowLeft": "goWordLeft",
			"Alt-Ctrl-ArrowRight": "goWordRight",
			"Alt-Enter": function(cm) {
					runScript();
			},
	}
});

var pwDOC = cm.getDoc();

function getCurrentCode(){
	return cm.getDoc().value;
}


// pwDOC.markText({line: 1, ch: 0}, {line: 1, ch: 50}, {className: "highlighted"});
function highlightLine(lineNumber) {
    var actualLineNumber = lineNumber - 1;
    // console.log(doc);
    pwDOC.addLineClass(actualLineNumber, 'gutter', 'error');
}


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

cm.on("keyup", function (cm, event) {
			 if (event.key === 'Enter') {
				 if (event.shiftKey === true && event.ctrlKey === true) {
           addPanel("bottom");
				 }
			 } else if (event.key === 'Delete') {
 				 if (event.shiftKey === true && event.ctrlKey === true) {
            // event.preventDefault();
            cm.execCommand('delLineRight');
            console.log("Something");
 				 }
 			 }
		});

inputBox.addEventListener("keyup", function(event){
  if (event.key === 'Backspace') {
   if (event.ctrlKey === true && event.shiftKey === true) {
      console.log("deleted");
   }
 }
}, true);



// UI
var mirror = document.getElementsByClassName("CodeMirror-code");
var mirrorBody = document.getElementsByClassName('CodeMirror');
var gutterBody = document.getElementsByClassName('CodeMirror-gutters');

function reskinCodeMirror(){
	inputBox.style.borderRadius = "2px 2px 0px 0px";
	consoleText.style.color = appInfo.baseFontColor;
  consoleIcon.style.color = appInfo.baseFontColor;
	mirrorBody[0].style.backgroundColor = appInfo.inputBGColorIdle;
	gutterBody[0].style.borderColor = appInfo.borderColor;
	gutterBody[0].style.backgroundColor = appInfo.selectColor;
}

// LINEWIDGET
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
  addPanel("bottom");
}, false)


function insertText(data) {
	var cursor = pwDOC.getCursor();
	var line = pwDOC.getLine(cursor.line);
	var pos = {
		line: cursor.line
	};
	if (line.length === 0) {
		pwDOC.replaceRange(data, pos);
	} else {
		var result = insert(pwDOC.getValue(), pwDOC.getCursor().ch, data)
		pwDOC.setValue(result);
	}
	cm.execCommand('goLineDown');
	// cm.execCommand('newlineAndIndent');
}


function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}


// PANELS
var numPanels = 0;
var panels = {};
var editor;
var isWriting = true;
var lastText;

function makePanel(where) {
  var node = document.createElement("div");
  var id = ++numPanels;
  var widget, close, label, prefix, container;

  node.id = "panel-" + id;
  node.className = "panel " + where;
  container = node.appendChild(document.createElement("div"))
  container.setAttribute("class", "textWrap")
  edit = container.appendChild(document.createElement("a"));
  edit.setAttribute("title", "Edit");
  edit.id = id;
  edit.setAttribute("class", "panel-side edit-panel fa fa-edit");
  CodeMirror.on(edit, "click", function(e) {
    reloadNote(e.target.id);
    isWriting = !isWriting;
    if (isWriting) {
      // console.log(pwDOC);
      var result = window.cep.fs.writeFile(`${sandPath}${e.target.id}.jsx`, pwDOC.getValue());
      pwDOC.setValue("Testing off")
    } else {
      lastText = pwDOC.getValue();
      var result = window.cep.fs.readFile(`${sandPath}${e.target.id}.jsx`);
      pwDOC.setValue("Testing on")
    }
    // console.log(e.target.id);
		console.log(lastText);
    // console.log(`${result[0].data}`);
    // console.log(allFiles[needle]);
    //
    // console.log(`${isWriting}`);
    // console.log(pwDOC.getValue());
  });
  prefix = container.appendChild(document.createElement("span"));
  label = container.appendChild(document.createElement("span"));
  label.textContent = previewText();
  prefix.textContent = previewTextPrefix() + " ";
  prefix.classList.add("prefix");
  prefix.classList.add(prev.current);
  label.classList.add("data");

  close = node.appendChild(document.createElement("a"));
  close.setAttribute("title", "Remove");
  close.setAttribute("class", "panel-side remove-panel fa fa-trash");
  // close.textContent = "✖";
  close.id = id;
  CodeMirror.on(close, "click", function(e) {
    panels[node.id].clear();
    // console.log(e);
    // resetAndReloadScripts(numPanels, e.target.id);
    --numPanels;
    // console.log(numPanels);
  });

  return node;
}
function addPanel(where) {

  var node = makePanel(where);
  panels[node.id] = cm.addPanel(node, {position: where, stable: false});
  writeNewScript();
}

var bgVars = [];
var bgFuncs = [];
var hasVar = false;
var hasFuncs = false;

var prev = {
  data: "none",
  hasVar: false,
  hasFuncs: false,
  prefix: "none",
  suffix: "none",
  current: "none"
};

function previewPrefix(params){
  prev.current = params;
  prev.prefix = params;
}

function previewTextPrefix(){
  return prev.current;
}

function previewText(){
  var textPreview;
  var text = pwDOC.getValue().trim();
  if (text.includes("function")) {
    if (text.includes("()")){
      textPreview = text.replace("function","").split("()")[0] + "()";
    } else {
      var allParams = text.substring(
          text.indexOf("(") + 1,
          text.indexOf(")")
      );
      var param = allParams.split(",");
      console.log(allParams);
      console.log(param);
      textPreview = text.substring(text.indexOf(" "), text.indexOf("(") + 1) + allParams + ")";
    }
    console.log("Has function");
    previewPrefix("function");
  } else if (text.includes("var")) {
    if (text.lastIndexOf("var") < 3) {
      textPreview = text.split(" =")[0].replace("var", "");
      hasVar = true;
      previewPrefix("var");
    } else {
      hasVar = true;
      var split = text.split("\n");
      var index = 0;
      split.forEach(function(e){
        ++index;
        var head = e.replace("var", "").trim();
        head = head.split(" =")[0];
        if (e.length > 1) {
          if (index > 1) {
            bgVars.push(" " + head);
          } else {
            bgVars.push(head);
          }
        }
      });
      previewPrefix("vars");
      textPreview = bgVars.join();
    }

  }
  prev.data = textPreview;
  return textPreview;
}

function makeString() {
  var val = pwDOC.getValue().trim();
  console.log(val);
  // val.replace(/\r?\n?/g, '');
  // console.log(val);
  // val.trim();
  // console.log(val);
}




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
