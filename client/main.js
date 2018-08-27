dispatchEvent('mighty.start', extFolder())

var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var domPath = logPath + "/dom/";
var sandPath = logPath + "/Sandbox/";
var strip = document.getElementById('strip');
var fileBtn = document.getElementById('fileBtn');
var pryBar = document.getElementById('getBar');

var consoleText = document.getElementById('consoleText');
var consoleIcon = document.getElementById('consoleIcon');

var syntaxColor = {
	default: "b7b7b7",
	global: "#d7d489",
	string1: "#d7d489",
	function: "#3AC936",
	variable: "#B442BA",
	keyword: "#B442BA",
	number: "#FFC66D",
	app: "#D65858",
	property: "#D65858",
	dialogue: "#3AC936",
	comment: "#808080",
	// selectedTextColor: "black !important",
	// selectedTextBG: "Navy !important",
};



function logSyntaxColor(){
	syntaxColor.default = appInfo.baseFontColor;
	var jsSheet = document.styleSheets[7];
	var jsRules = jsSheet.cssRules;
	// console.log(jsRules);
	jsSheet.cssRules[1].style.color = syntaxColor.number;
	jsSheet.cssRules[2].style.color = syntaxColor.keyword;
	jsSheet.cssRules[3].style.color = syntaxColor.function;
	jsSheet.cssRules[4].style.color = syntaxColor.baseFontColor;
	jsSheet.cssRules[9].style.color = syntaxColor.string1;
	jsSheet.cssRules[11].style.color = syntaxColor.comment;

	jsSheet.cssRules[19].style.color = syntaxColor.baseFontColor;
	jsSheet.cssRules[26].style.color = syntaxColor.baseFontColor;
	jsSheet.cssRules[26].style.borderColor = appInfo.activeColor;

	var syntaxSheet = document.styleSheets[11];
	var syntaxRules = syntaxSheet.cssRules;
	syntaxSheet.cssRules[0].style.color = syntaxColor.global;
	syntaxSheet.cssRules[1].style.color = syntaxColor.app;
	syntaxSheet.cssRules[2].style.color = syntaxColor.property;
	syntaxSheet.cssRules[3].style.color = syntaxColor.dialogue;
	syntaxSheet.cssRules[4].style.color = syntaxColor.dialogue;
	syntaxSheet.cssRules[5].style.color = syntaxColor.comment;

	syntaxSheet.cssRules[9].style.color = appInfo.variable;
	syntaxSheet.cssRules[10].style.color = appInfo.function;

	syntaxSheet.cssRules[6].style.color = appInfo.baseFontColor;
	syntaxSheet.cssRules[6].style.background = appInfo.selectColor;
	syntaxSheet.cssRules[8].style.borderTopColor = appInfo.borderColor;
	// console.log(syntaxRules);

	var sheet = document.styleSheets[10];
	var rules = sheet.cssRules;
	// console.log(rules);
	// sheet.cssRules[5].style.color = syntaxColor.selectedTextColor;
	// sheet.cssRules[5].style.background = syntaxColor.selectedTextBG;

	// sheet.cssRules[8].style.borderColor = appInfo.borderColor;
	// sheet.cssRules[12].style.color = appInfo.baseFontColor;
	// sheet.cssRules[12].style.background = appInfo.selectColor;
	// sheet.cssRules[14].style.borderTopColor = appInfo.borderColor;

	// console.log(rules);
	// console.log(syntaxColor);
}

scribe('read');
cm.setValue(scribe("read"));
inputBox.style.borderColor = appInfo.borderColor;

callDoc();
buildUI();
logSkin(appSkin);
logSyntaxColor();
reskinCodeMirror();
initError();
loadBorderWidth();
loadJSX(`json2.jsx`);
loadJSX(`Console.jsx`);
loadJSX(`Scanner.jsx`);
csInterface.evalScript(`logScan('${sysPath}')`, catchFiles)


console.log(`Loading for ${appInfo.name}`);
console.log(appInfo);

for (var index in syntaxColor) {
	var currColor = syntaxColor[index]
	// console.log(`${currColor}`);
	var newSwatch = document.createElement("div");
	newSwatch.classList.add("adobe-swatch");
	newSwatch.style.backgroundColor = currColor;
	newSwatch.addEventListener("click", function(e){
		csInterface.evalScript("colorFromApp()", function(a){
			e.target.style.backgroundColor = "#" + a;
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


function catchFiles(msg){
	console.log(msg);
}

function updateConsole(type, data){
	consoleIcon.classList.remove("fa-terminal", "fa-exclamation-circle");
	if (type === 'read') {
		consoleIcon.classList.add("fa-terminal");
		consoleIcon.style.color = appInfo.baseFontColor;
		consoleText.style.color = appInfo.baseFontColor;
	} else if (type === 'alert') {
		consoleIcon.classList.add("fa-exclamation-circle");
		consoleIcon.style.color = "#D65858";
		consoleText.style.color = "#D65858";
	}
	consoleText.textContent = data;
}

function runScript(){
	try {
		cs.evalScript(`runScript('${hostPath}scribe.jsx')`);
	} catch(e){
		updateConsole('alert', e);
	}
}

function scribe(params){
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

// loadDOM(appInfo.name);
// console.log(ADOM.app.activeDocument);

function loadDOM(filename){
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", "../log/dom/" + filename + ".js")
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}




function getDOM(){
		var nScript = document.head.appendChild(document.createElement("script"));
		var path = domPath + appInfo.name + ".js";
		var result = window.cep.fs.readFile(path);
		// console.log(result.data);
		// return result
		result = result.data.toString();
		console.log(result);

		var theInstructions = "alert('Hello World'); var x = 100";
		var F=new Function(result);
		return(F());
}


var panelNumber;
var allFiles = [];
var needle;
var newText = "app";

fileBtn.addEventListener("click", function(e){
	writeNewScript();
}, false)

function writeNewScript(){
	try {
		var result = window.cep.fs.writeFile(`${sandPath}${numPanels}.jsx`, pwDOC.getValue().trim());
		loadNewNote(`${numPanels}.jsx`)
		cm.setValue("\r\r\r")
	} catch(e){
		console.log(e);
	}
}


function reloadNote(which){
	try {
		csInterface.evalScript(`readFiles()`, function(evt){			// console.log(evt);
			return window.cep.fs.readFile(`${sandPath}${i}.jsx`);
		})
	} catch(e){
		console.log(e);
	}
	// console.log(needle);
	// console.log(allFiles[needle].data);
}


function reloadNotes(which){
	try {
		while (allFiles.length > 0) {
			allFiles.pop();
		}
		csInterface.evalScript(`readFiles()`, function(evt){			// console.log(evt);
			for (var i = 1; i <= evt; i++) {
				// allFiles.push(window.cep.fs.readFile(`${sandPath}${i}.jsx`));
				if (i == which) {
					console.log(`matching ${i}`);
					return window.cep.fs.readFile(`${sandPath}${i}.jsx`);
				}
			}
			// console.log(allFiles[0].data);
		})
	} catch(e){
		console.log(e);
	}
	// console.log(needle);
	// console.log(allFiles[needle].data);
}


// csInterface.evalScript(`unScript('${allFiles[needle].data}')`);
// uneval(allFiles[needle].data);

// allFiles.pop()
// for (var i = 1; i <= evt; i++) {
// 	allFiles.push(window.cep.fs.readFile(`${sandPath}${i}.jsx`));
// 	if (i == which) {
// 		console.log(`matching ${i}`);
// 		var needle = i - 1;
// 	}
// }
// var result = window.cep.fs.writeFile(`${sandPath}${which}.jsx`, "");
// loadNewNote(`${numPanels}.jsx`)
// console.log(result);


function writeToSandbox(){
	try {
		var clear = "";
		var result = window.cep.fs.writeFile(`${sandPath}result.jsx`, clear);
		cs.evalScript(`logInfo('${sandPath}', '${newText}')`, function(params){
			var result = window.cep.fs.readFile(`${sandPath}result.jsx`);
			console.log(result.data);
			consoleText.textContent = result.data;
		});
	} catch(e) {
		console.log("Something went wrong");
	}
}

function rewriteAll(newText) {
	cm.setValue(newText);
}



// pryBar.addEventListener("mouseover", function(e){
// 	toggleCode(false);
// 	console.log(e);
// });
//
// pryBar.addEventListener("mouseout", function(e){
// 	toggleCode(true);
// 	console.log(e);
// });

// function toggleCode(params){
// 	// cm.style.display = "none";
// 	if (params) {
// 		input.style.display = "block";
// 		console.log("That was true");
// 	} else {
// 		input.style.display = "none";
// 		console.log("That was false");
// 	}
// }



// displayConsole();

// function displayConsole(){
// 	cs.evalScript(`console('Testing if this works')`, function(msg){
// 		console.log(msg);
// 	});
// }


// buildMirror();
//
// function buildMirror(){
// 	console.log(`${mirrorBody[0].style.height}`);
// 	// mirror.style.height = input.style.height;
// }

// csInterface.evalScript( "$.getMyArray()", function(array_string) {
//      var myArray;
//      try {
//           myArray = JSON.parse(array_string);
//      } catch (error) {
//           console.log(error);
//           myArray = [];
//      }
// });

// var bg = document.getElementsByClassName('.cm-s-ILST.CodeMirror');
// cm.style.backgroundColor = appInfo.inputBGColorIdle;
// cm.style.color = appInfo.baseFontColor;
