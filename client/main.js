var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/log/";
var hostPath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/";
var inputBox = document.getElementById('input');
var strip = document.getElementById('strip');

var syntaxColor = {
	default: "none",
	string1: "#d7d489",
	function: "#1092E2",
	variable: "#A9B7C6",
	keyword: "#B442BA",
	number: "#FFC66D",
	app: "#D65858",
	property: "#D65858",
	dialogue: "#3CA1D3",
	comment: "#808080",
	// selectedTextColor: "black !important",
	// selectedTextBG: "Navy !important",
};

var data = {
	text: "none"
};


function setSyntaxColor(picker){
	var newColor  = '#' + picker.toString();
	console.log(newColor);
}

// console.log(CSScolor);

function logSyntaxColor(){
	syntaxColor.default = appInfo.baseFontColor;

	var jsSheet = document.styleSheets[7];
	var jsRules = jsSheet.cssRules;
	// var jsCSScolor = jsRules[9].style.color;

	jsSheet.cssRules[1].style.color = syntaxColor.number;
	jsSheet.cssRules[2].style.color = syntaxColor.keyword;
	jsSheet.cssRules[3].style.color = syntaxColor.function;
	jsSheet.cssRules[4].style.color = syntaxColor.variable;
	jsSheet.cssRules[9].style.color = syntaxColor.string1;
	jsSheet.cssRules[11].style.color = syntaxColor.comment;
	// console.log(jsRules);

	var sheet = document.styleSheets[9];
	var rules = sheet.cssRules;
	// var CSScolor = rules[8].style.color;

	sheet.cssRules[5].style.color = syntaxColor.selectedTextColor;
	sheet.cssRules[5].style.background = syntaxColor.selectedTextBG;
	// sheet.cssRules[6].style.color = syntaxColor.adobe;
	sheet.cssRules[7].style.color = syntaxColor.app;
	sheet.cssRules[8].style.color = syntaxColor.property;
	sheet.cssRules[9].style.color = syntaxColor.dialogue;
	sheet.cssRules[10].style.color = syntaxColor.comment;
	console.log(rules);
}

scribe('read');

callDoc();
buildUI();
logSyntaxColor();
logSkin(appSkin);
loadBorderWidth();
loadJSX(`json2.jsx`);
console.log(`Loading for ${appInfo.name}`);


for (var index in syntaxColor) {
	var currColor = syntaxColor[index]
	// console.log(`${currColor}`);
	var newSwatch = document.createElement("div");
	newSwatch.classList.add("adobe-swatch");
	newSwatch.style.backgroundColor = currColor;
	newSwatch.addEventListener("click", function(e){
		csInterface.evalScript("colorFromApp()", function(a){
			e.target.style.backgroundColor = "#" + a;
			// recolorSyntax();
			console.log(a);
		});
	}, false)
	strip.appendChild(newSwatch);
}

function recolorSyntax(){
	for (var index in syntaxColor) {
		console.log(syntaxColor[index]);
		console.log(index);
	}
}

var swatches = document.getElementsByClassName('adobe-swatch');
swatches = [].slice.call(swatches);


swatches.forEach(function(v,i,a) {

});


function scribe(params){
	// var path = logPath + "scribe.js";
	var path = hostPath + "scribe.jsx";
	if (params === 'write') {
		data.text = cm.getValue();
		var result = window.cep.fs.writeFile(path, data.text);
		if (0 == result.err) {
				 // console.log("Success");
				 // console.log(result);
		} else {
				 console.log(`Error ${result.err}`);
		}
	} else if (params === 'read') {
		var result = window.cep.fs.readFile(path);
		data.text = result.data;
		return data.text;
	}
	// console.log(data);
}


CodeMirror.defineMode("mixedOverlay", function(config, parserConfig) {
  return CodeMirror.overlayMode(CodeMirror.getMode(config, "javascript"), CodeMirror.getMode(config, "adobe"));
});


var aDOM = ["app", "documents", "document", "activeDocument"];
var aProp = ["name", "length", "selection"];
var aWindow = ["alert", "confirm"];

CodeMirror.defineMode("adobe", function(config, parserConfig) {
  var adobeOverlay = {
    token: function(stream, state) {
      var ch;
			for (var e = 0; e < aDOM.length; e++) {
				if (stream.match(aDOM[e])) {
					return "DOM";
				}
			}
			// if (stream.match("app") || stream.match("document")) {
			// 		return "DOM";
			if (stream.match("alert") || stream.match("confirm") || stream.match("doScript") || stream.match("executeMenuCommand") ) {
					return "window";
			} else if (stream.match("name") || stream.match("length") || stream.match("selection")) {
					return "prop";
			} else {
					stream.next();
					return null;
			}
      while (stream.next() != null && !stream.match("{{", false)) {}
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
			"Ctrl-Shift-Backspace": "delLineLeft",
			"Ctrl-Alt-ArrowLeft": "goWordLeft",
			"Ctrl-Alt-ArrowRight": "goWordRight",
			"Alt-Enter": function(cm) {
					runScript();
			},
	}
});


var doc = cm.getDoc();
var value = cm.getValue();
console.log(doc);
console.log(value);

cm.setValue(scribe("read"));
inputBox.style.borderColor = appInfo.borderColor;

cm.on("change", function() {
	scribe('write');
	console.log(data.text);
});

cm.on("focus", function() {
  console.log("Focused");
	inputBox.style.borderColor = appInfo.activeColor;
});

cm.on("blur", function() {
  console.log("No focus");
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



var mirror = document.getElementsByClassName("CodeMirror-code");
var mirrorBody = document.getElementsByClassName('CodeMirror');
var gutterBody = document.getElementsByClassName('CodeMirror-gutters');
// var mirrorSizer = document.getElementsByClassName('CodeMirror-sizer');
// var lineSizer = document.getElementsByClassName('CodeMirror-linenumbers');
// mirrorSizer[0].style.marginLeft = "21px";
// lineSizer[0].style.width = "20px";

reskinCodeMirror();

function reskinCodeMirror(){
	mirrorBody[0].style.backgroundColor = appInfo.inputBGColorIdle;
	gutterBody[0].style.borderColor = appInfo.borderColor;
	gutterBody[0].style.backgroundColor = appInfo.selectColor;
	console.log(gutterBody);
}

mirror[0].addEventListener("keyup", function(event){
	console.log(event);
	if (event.key === 'ArrowLeft') {
		if (event.altKey === true) {
			cm.execCommand('goWordLeft');
		}
	}
}, false);


// console.log(cm.getScrollerElement());

// cm.triggerOnKeyDown(ev)

// cm.on("keyHandled", "ctrl-Enter", function(event){
// 	console.log("Test");
// });


function runScript(){
	cs.evalScript(`runScript('${hostPath}scribe.jsx')`);
}

// var bg = document.getElementsByClassName('.cm-s-ILST.CodeMirror');
// cm.style.backgroundColor = appInfo.inputBGColorIdle;
// cm.style.color = appInfo.baseFontColor;
