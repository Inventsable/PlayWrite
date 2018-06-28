var doc;
var exist = app.documents.length > 0;

// function colorPicker(){
//   return $.colorPicker(-1);
// }

function docName() {
  var data = {
    name: "none",
    path: "none"
  };
  var newData = [];
  if (exist) {
    doc = app.activeDocument;
    newData.push(doc.name);
    newData.push(doc.path);
    return newData;
  }
}

function doesExist() {
  if (app.documents.length > 0) {
    doc = app.activeDocument;
    return true;
  } else {
    return false;
  }
}

function colorFromApp() {
  if (app.isFillActive()) {
    defaultColor = fillColorFromAI();
  } else {
    defaultColor = strokeColorFromAI();
  }
  return defaultColor;
}

function fillColorFromAI() {
  if (exist) {
    var convertColor = rgbToHex(doc.defaultFillColor.red, doc.defaultFillColor.green, doc.defaultFillColor.blue);
    return convertColor;
  } else {
    return "ffffff";
  }
}
function strokeColorFromAI() {
  if (exist) {
    var convertColor = rgbToHex(doc.defaultStrokeColor.red, doc.defaultStrokeColor.green, doc.defaultStrokeColor.blue);
    return convertColor;
  } else {
    return "231f20";
  }
}



/// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
