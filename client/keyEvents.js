(function () {
  'use strict';

var testBtn = document.getElementById('testBtn');

testBtn.addEventListener("click", function(e){
  simulateKeyCode("a");
}, false)

function simulateEvent(thisKey){
  var e = new Event()
  e.type="keyup";
  e.key=thisKey;    // just enter the char you want to send
  e.keyCode=e.key.charCodeAt(0);
  e.which=e.keyCode;
  e.altKey=false;
  e.ctrlKey=true;
  e.shiftKey=false;
  e.metaKey=false;
  // e.bubbles=true;
  document.dispatchEvent(e);
  console.log(e);
}

function simulateKey(thisKey){
  var e = new KeyboardEvent("keydown");
  e.key=thisKey;
  e.keyCode=thisKey.charCodeAt(0);
  e.which=e.keyCode;
  e.altKey=false;
  e.ctrlKey=true;
  e.shiftKey=false;
  e.metaKey=false;
  // e.bubbles=true;
  document.dispatchEvent(e);
  console.log(e);
}

function simulateKeyEvent(character) {
  var evt = document.createEvent("KeyboardEvent");
  (evt.initKeyEvent)("keypress", true, true, window,
                    0, 0, 0, 0,
                    0, character.charCodeAt(0))
  var canceled = !body.dispatchEvent(evt);
  if(canceled) {
    // A handler called preventDefault
    alert("canceled");
  } else {
    // None of the handlers called preventDefault
    alert("not canceled");
  }
  console.log(evt);
}


function simulateKeyCode(char){
  var charCode = char.charCodeAt(0);
  // let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
  // let chr = String.fromCharCode((96 <= keyCode) ? chrCode: keyCode);
  var event = document.createEvent('KeyboardEvent');
  event.initEvent('keydown', true, true);
  delete event.keyCode;
  Object.defineProperty(event, "keyCode", {"value" : charCode})
  delete event.code;
  var thisCode = "Key" + char.toUpperCase();
  Object.defineProperty(event, "code", {"value" : thisCode })
  delete event.key;
  Object.defineProperty(event, "key", {"value" : char})
  delete event.isTrusted;
  // console.log(event.isTrusted);
  Object.defineProperty(event, "isTrusted", {"value" : true})
  document.dispatchEvent(event)
  console.log(event);
}

}());
