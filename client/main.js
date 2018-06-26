var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var sandPath = sysPath + "/log/Sandbox/";
var strip = document.getElementById('strip');
var fileBtn = document.getElementById('fileBtn');
var pryBar = document.getElementById('getBar');

var syntaxColor = {
	default: appInfo.baseFontColor,
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




function setSyntaxColor(picker){
	var newColor  = '#' + picker.toString();
	console.log(newColor);
}

// console.log(CSScolor);

function logSyntaxColor(){
	console.log(syntaxColor);
	syntaxColor.default = appInfo.baseFontColor;
	var jsSheet = document.styleSheets[7];
	var jsRules = jsSheet.cssRules;
	console.log(jsSheet);
	console.log(jsRules);
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
	console.log(rules);
	// var CSScolor = rules[8].style.color;

	// sheet.cssRules[5].style.color = syntaxColor.selectedTextColor;
	// sheet.cssRules[5].style.background = syntaxColor.selectedTextBG;
	// sheet.cssRules[6].style.color = syntaxColor.adobe;
	sheet.cssRules[1].style.color = syntaxColor.app;
	sheet.cssRules[2].style.color = syntaxColor.property;
	sheet.cssRules[3].style.color = syntaxColor.dialogue;
	sheet.cssRules[4].style.color = syntaxColor.dialogue;
	sheet.cssRules[5].style.color = syntaxColor.comment;
	// console.log(rules);
	console.log(syntaxColor);
}

scribe('read');
cm.setValue(scribe("read"));
inputBox.style.borderColor = appInfo.borderColor;

callDoc();
buildUI();
logSkin(appSkin);
logSyntaxColor();
reskinCodeMirror();
loadBorderWidth();
loadJSX(`json2.jsx`);
loadJSX(`Console.jsx`);
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



var newText = "app";

fileBtn.addEventListener("click", function(){
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
}, false)

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

function runScript(){
	cs.evalScript(`runScript('${hostPath}scribe.jsx')`);
}

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
